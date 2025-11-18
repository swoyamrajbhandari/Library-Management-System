import {getRefreshToken, refreshTokenStatus} from '../model/refreshTokenModel.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import logger from '../../loggers.js' 

export const generateAndRefreshToken = async (req, res) => {
    const {refreshToken} = req.body  // jwt refreshtoken from return response of a register or a login.

    if(!refreshToken){
        return res.status(401).send('no refresh token provided')
    }

    // if (revoke){
    //     return res.status(401).send('Refresh token is revoked, please log in again')
    // }

    let decodedRefreshToken;
    try {
        decodedRefreshToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET) //decode jwt
    } catch (err) {
        return res.status(403).json({ message: 'Refresh token invalid or malformed' })
    }

    const {id, role} = decodedRefreshToken  // get User id from decoding

    try {
        const tokenData = await getRefreshToken(id)  // get User corresponding Token id
        logger.info(tokenData)

        if (!tokenData){return res.status(401).json({ message: "Token not found"})}

        // logger.info(tokenData)
        // logger.info(tokenData.revoke)
        // if (tokenData.revoke === true){
        //     return res.send('Refresh token revoked')
        // } 

        const valid = await bcrypt.compare(refreshToken, tokenData.refreshToken)
        if(!valid) {return res.status(403).json({ message: "Invalid refresh token" })}
 

        // Generate a new access token
        const newAccessToken = jwt.sign({id, role},process.env.JWT_SECRET, { expiresIn: "15m" });

    res.json({ accessToken: newAccessToken });
  } catch (err) {
    res.status(403).json({ message: "Token invalid or expired" });
  }
}

export const revokeRefreshToken = async (req, res) => {
    const refreshState = req.body.refreshToken
    // const state = req.body.revoke
    const decodedRefreshToken = jwt.verify(refreshState, process.env.JWT_REFRESH_SECRET) // decode jwt
    const {id, role} = decodedRefreshToken
    try {

        const token = await getRefreshToken(id)
        if (!token) {
            return res.status(404).json({ message: "Token not found" })
        }

        const valid = await bcrypt.compare(refreshState, token.refreshToken)
        if(!valid) {
            return res.status(403).json({ message: "Invalid refresh token" })
        }

        const deleted = await refreshTokenStatus(id)
        logger.info(deleted)

        res.status(201).send('Token deleted')

    } catch (err) {
        console.log(err.message)
        return res.status(401).send('Token not revoked')
    }


}

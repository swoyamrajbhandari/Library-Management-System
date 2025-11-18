import path from 'path';
import { fileURLToPath } from 'url';
import {newEnforcer} from 'casbin'
// import logger from '../../loggers.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let enforcer

export async function getEnforcer () {
    if (!enforcer) {
        enforcer = await newEnforcer(
            path.join(__dirname, 'model.conf'),
            path.join(__dirname, 'policy.csv')
        )

    }
    return enforcer

}

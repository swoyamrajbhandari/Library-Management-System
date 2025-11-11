import prisma from '../src/prismaClient.js'
import bcrypt from 'bcryptjs'
import logger from '../loggers.js'  // for logging (replacing normal console.log)

async function main() {
  const existingAdmin = await prisma.user.findUnique({
    where: { username: 'admin' },
  })

  if (!existingAdmin) {
    const hashedPassword = bcrypt.hashSync(process.env.ADMIN_PASSWORD, 8)
    await prisma.user.create({
      data: {
        username: 'admin',
        password: hashedPassword,
        role: 'admin',
      },
    })
    //replacing console.log() with logger
    logger.info('Admin user created: admin/adminpass')
  } else {
    logger.info('Admin already exists.')
  }
}

export default main
  

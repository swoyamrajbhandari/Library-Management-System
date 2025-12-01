import prisma from '../src/prismaClient.js'
import bcrypt from 'bcryptjs'
import logger from '../loggers.js'  // for logging (replacing normal console.log)
import prisma2 from '../shared-middleware/prismaClient.js'
import fs from 'fs'
import csv from 'csv-parser'

export async function main() {
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

export async function seedCasbinRules() {
  const casbinRules = [
    { ptype: 'p', v0: 'admin', v1: 'permission.list', v2: 'read', v3: '*', v4: 'allow' },
    { ptype: 'p', v0: 'admin', v1: 'permission.info', v2: 'read', v3: '*', v4: 'allow' },
    { ptype: 'p', v0: 'admin', v1: 'permission', v2: 'write', v3: '*', v4: 'allow' },
    { ptype: 'p', v0: 'admin', v1: 'permission.info', v2: 'update', v3: '*', v4: 'allow' },
    { ptype: 'p', v0: 'admin', v1: 'permission', v2: 'delete', v3: '*', v4: 'allow' }
  ]

  for (const rule of casbinRules) {
    const exists = await prisma2.casbinRule.findFirst({
      where: {
        ptype: rule.ptype,
        v0: rule.v0,
        v1: rule.v1,
        v2: rule.v2,
        v3: rule.v3,
        v4: rule.v4,

      }
    })
    if (!exists) {
        await prisma2.casbinRule.create({
          data: rule}
        )
        logger.info(`Casbin rule created: ${rule.v0} -> ${rule.v1}/${rule.v2}`)
    }

  }
}

export async function seedCasbinFromCSV() {
  const filePath = './shared-middleware/casbin/policy.csv'  //fs resolves paths relative to the current working directory (i.e, /app (docker), auth-service (locally))

  if (!fs.existsSync(filePath)) {
    logger.info(`No policy.csv found - skipping Casbin csv import`)
    return
  }

  const records = []

  await new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv({headers: false}))  //pass row/stream to csv-parser(converts csv row to json)
                                    //headers: false => Treat the columns as numbers (0,1,2,3…) instead of names.
                                    //Example: { '0': 'p', '1': 'admin', '2': 'user.list', '3': 'read', '4': '*', '5': 'allow' }
      .on('data', (row) => {  //.on() is a function used to listen for events. Here: When the event called 'data' happens, run the handler function.
                              // Whatever the CSV-parser outputs for that row gets passed as the first argument into your function.
                              // it will do this internally: emit('data', {'0': 'p','1': 'admin','2': 'user.list','3': 'read','4': '*','5': 'allow'});
                              // Finally, we get row = { '0': 'p', '1': 'admin', '2': 'resource', ... }

      const ptype = row[0]
      const v0 = row[1]
      const v1 = row[2]
      const v2 = row[3]
      const v3 = row[4]
      const v4 = row[5]

      records.push({ptype, v0, v1, v2, v3, v4})
    })
    .on('end', resolve) //listens and runs callback after parsing through the whole csv
    .on('error', reject) //listens and runs callback if any error
  })

  for (const rule of records) {
    const exists = await prisma2.casbinRule.findFirst({
      where: rule
      
    })

    if (!exists) {
      await prisma2.casbinRule.create({data: rule})
      logger.info(`Imported rule:${rule.v0} -> ${rule.v1}/${rule.v2}`)
    }
  }

  logger.info(`policy.csv import complete`)
  
}

  

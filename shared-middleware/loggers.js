import winston from 'winston'

import {Logtail} from '@logtail/node'
import {LogtailTransport} from '@logtail/winston'

const logtail = new Logtail(process.env.LOGGERS_SECRET, {
    endpoint: process.env.LOGGERS_ENDPOINT
})

const {combine, timestamp, json, prettyPrint, errors} = winston.format

const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info': 'debug',
    format: combine(
        errors({stack:true}),
        timestamp(),
        json(),
        prettyPrint()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: 'logs/app.log'}),
        new LogtailTransport(logtail)
    ],
    defaultMeta: {service: 'Authentication Service'} // any custom key-value pair we want to add
})

export default logger
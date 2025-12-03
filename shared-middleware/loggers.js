import winston from 'winston'
import moment from 'moment-timezone'

import {Logtail} from '@logtail/node'
import {LogtailTransport} from '@logtail/winston'
import DailyRotateFile from 'winston-daily-rotate-file'

const logtail = new Logtail(process.env.LOGGERS_SECRET, {
    endpoint: process.env.LOGGERS_ENDPOINT
})

const {combine, timestamp, json, prettyPrint, errors} = winston.format

const fileRotateTransport = new DailyRotateFile({
    level: 'info',
    filename: 'logs/app-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d'
})

const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info': 'debug',
    format: combine(
        errors({stack:true}),
        timestamp({
            format: () => moment().tz(process.env.TIMEZONE || 'UTC').format(),
        }),
        json(),
        prettyPrint()
    ),
    transports: [
        new winston.transports.Console(),
        // new winston.transports.File({filename: 'logs/app.log'}),
        fileRotateTransport,
        new LogtailTransport(logtail)
    ],
    defaultMeta: {service: 'Casbin middleware'} // any custom key-value pair we want to add
})

export default logger
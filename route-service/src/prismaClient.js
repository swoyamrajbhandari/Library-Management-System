// import {PrismaClient} from '../src/generated/prisma'
// import { PrismaPg } from '@prisma/adapter-pg'

// const adapter = new PrismaPg(process.env.DATABASE_URL_ROUTES)
// const prisma = new PrismaClient({adapter})

// export default prisma
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default prisma;

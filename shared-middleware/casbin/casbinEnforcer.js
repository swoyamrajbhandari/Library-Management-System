import path from 'path';
import { fileURLToPath } from 'url';
import {newEnforcer} from 'casbin'
// import PGAdapter from 'casbin-prisma-adapter'
import {PrismaAdapter} from 'casbin-prisma-adapter'
import logger from '../loggers.js'
import prisma from '../prismaClient.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// const PrismaAdapter = PGAdapter.default

let enforcer

export async function getEnforcer () {

    if (!enforcer) {  // only helps create initial enforcer instance, later updates via db are not loaded,
                    // this is fixed/done via reloadPolicy.js
            
        const adapter = await PrismaAdapter.newAdapter(prisma)

        enforcer = await newEnforcer(
            path.join(__dirname, 'model.conf'),
            adapter
        )
        enforcer.enableLog(true);

        // if ((await enforcer.getPolicy()).length === 0) {
        //     await enforcer.addPolicy('admin', 'auth.role', 'update', '*', 'allow');
        //     await enforcer.addGroupingPolicy('admin', 'librarian');
        //     await enforcer.savePolicy();
        //     logger.info('Policies seeded automatically');
        // }

        await enforcer.loadPolicy()

    }
    return enforcer

}

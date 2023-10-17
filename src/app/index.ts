require('dotenv').config(); 

import {server} from './initializers/express/'; 
import {logger} from './libs/logger'; 

const name = process.env.NAME; 
const hostname: string = process.env.NODE_HOSTNAME; 
const port = process.env.NODE_PORT; 

try {
    logger.info(`[${name}] Bootstrapping micro service`)
    server({hostname, port})
} catch (error) {
    console.log(error)
}
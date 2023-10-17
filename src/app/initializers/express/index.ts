import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import * as helmet from 'helmet';
import createServer from './libs/express';
import { logger } from '../../libs/logger';
import { routes } from '../../components/controller';

const app = express();
const json = express.json;
const urlencoded = express.urlencoded;

const server = ({ hostname, port }) => {
    createServer({ json, urlencoded, app, cors, compression, helmet, logger }).server({ hostname, port, routes })
}

export { server }
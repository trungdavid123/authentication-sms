import * as dotenv from 'dotenv';
import * as http from 'http';
import * as express from 'express';
import * as cors from 'cors';
import * as compression from 'compression';
import helmet from 'helmet';
import { logger } from './libs/logger';
dotenv.config();

const app = express();
const hostname = process.env.NODE_HOSTNAME; // the name of the machine running the server 
const port = Number(process.env.NODE_PORT);


app.use(helmet())
app.options('*', cors({ credetials: true, origin: true })) // indikerar att webbläsaren ska skicka med användarkontext (till exempel: cookies, eller autentisering)

// CORS - står för Cross-orign- Resource Sharing och används för att hantera säkerheten när du gör HTTP-förfrågningar
app.use(cors())
app.use(compression()) // används för att komprimera eller gzipa http-svar innan de skickas till klienten
// Detta minskar storleken på data som skickas över nätverket och förbättra prestanda, särkilt för resurser som kan komprimeras effektivitet
// som textbaserade filer (tex: HTML, JS, CSS)
// genom att använda det aktiveras komprimering för alla svar som skickas av din Express-js-applikation, vilket hjälper till att minska överföringstiden och spara bandberedd
app.use(express.json()); // för att tolka application/json
app.use(express.urlencoded({ extended: true })); // för att tolka application/x-www-form-urlencoded

// application/x-www-form-urlencoded är MIME-typ används för att kodera data i en URL-kodad form, vilket är vanligt för att skicka data från
// webbformulär till en webbserver, tex: name=John+Doe&age=30&city=New+York



app.get('/books/:id', (req, res) => {
    res.status(200);
    console.dir(`Bok id är ${req.params.id}`)
    res.send('ok')
})

app.get('/', (req, res, next) => {
    logger.info(`EXPRESS PATH: ${req.path}, req: ${req.method}, ip: ${req.ip}`)
    res.status(200).send('ok'); 
})

app.use((req, res, next) => {
    res.set('Content-Type', 'text/html');
    res.send(Buffer.from('<h1>some text</h1>'));
    // att använda Buffer i det här fallet är främst användbart när du har binär data som inte är textbaserad. Exempel på binär data kan vara bilder, ljudfiler and andra icke-textbaserade resurser 
})


app.listen(port, hostname, () => {
    logger.info(`EXPRESS Server running at http://${hostname}:${port}`);
})
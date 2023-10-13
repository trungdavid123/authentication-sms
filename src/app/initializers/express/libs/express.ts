export default function createServer({
    json, urlencoded, app, handler, cors, compression, helmet, logger
}) {
    return Object.freeze({server})

    function server({hostname, port}) {
        const routes = handler.routes; 
        app.use(helmet()); 
        app.options('*', cors({credentials: true, origin: true})); 
        app.use(cors()); 
        app.use(compression());
        app.use(json()); 
        app.use(urlencoded({extended: true}))

        app.get('/', (req, res) => res.json({data: 'hello world'})); 

        app.listen(port, hostname, () => {
            logger.info(`[EXPRESS] server running at http://${hostname}:${port}/`);
            return 
        })
    }
}
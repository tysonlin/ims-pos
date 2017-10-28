const http = require('http');
const app = require('../app');
const logger = require('../server/log');

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => {
    logger.verbose(`express server started. Listening on port: ${port}...`);
});
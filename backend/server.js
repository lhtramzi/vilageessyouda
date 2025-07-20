require('dotenv').config();
const http = require('http');
const WebSocket = require('ws');
const { v4: uuidv4 } = require('uuid');
const { handleSocketConnection } = require('./rooms');
const logger = require('./logger');

const PORT = process.env.PORT || 3001;

const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Villaj Sayouda WebSocket server is running.');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  ws.id = uuidv4(); // Unique ID for each socket
  logger.info(`Client connected: ${ws.id}`);

  ws.on('close', () => {
    logger.info(`Client disconnected: ${ws.id}`);
  });

  handleSocketConnection(ws, wss);
});

server.listen(PORT, () => {
  logger.info(`Server listening on port ${PORT}`);
});

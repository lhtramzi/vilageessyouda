Require(‘dotenv’).config() ;
Const http = require(‘http’) ;
Const WebSocket = require(‘ws’) ;
Const { v4 : uuidv4 } = require(‘uuid’) ;
Const { handleSocketConnection } = require(‘./rooms’) ;
Const logger = require(‘./logger’) ;

Const PORT = process.env.PORT || 3001 ;

Const server = http.createServer((req, res) => {
  Res.writeHead(200) ;
  Res.end(« Villaj Sayouda WebSocket server is running. ») ;
}) ;

Const wss = new WebSocket.Server({ server }) ;

Wss.on(‘connection’, (ws) => {
  Ws.id = uuidv4() ; // Unique ID for each socket
  Logger.info(`Client connected : ${ws.id}`) ;

  Ws.on(‘close’, () => {
    Logger.info(`Client disconnected : ${ws.id}`) ;
  }) ;

  handleSocketConnection(ws, wss) ;
}) ;

Server.listen(PORT, () => {
  Logger.info(`Server listening on port ${PORT}`) ;
}) ;

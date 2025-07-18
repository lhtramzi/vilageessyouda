Const rolesData = require(‘./roles’) ;
Const { validateJoinRequest } = require(‘./validation’) ;
Const logger = require(‘./logger’) ;
Const { shuffleArray, generateRoomCode } = require(‘./utils’) ;

Const rooms = {} ;

Function handleSocketConnection(ws, wss) {
  Ws.on(‘message’, (message) => {
    Try {
      Const data = JSON.parse(message) ;
      Const { type, payload } = data ;

      Switch (type) {
        Case ‘CREATE_ROOM’ :
          handleCreateRoom(ws, payload) ;
          break ;
        case ‘JOIN_ROOM’ :
          handleJoinRoom(ws, payload) ;
          break ;
        case ‘ACCEPT_PLAYER’ :
          handleAcceptPlayer(ws, payload) ;
          break ;
        case ‘REJECT_PLAYER’ :
          handleRejectPlayer(ws, payload) ;
          break ;
        case ‘START_DRAW’ :
          handleStartDraw(ws, payload) ;
          break ;
        case ‘SEND_MESSAGE’ :
          handlePrivateMessage(ws, payload) ;
          break ;
        case ‘KICK_PLAYER’ :
          handleKickPlayer(ws, payload) ;
          break ;
        case ‘ASSIGN_ASSISTANT’ :
          handleAssignAssistant(ws, payload) ;
          break ;
        case ‘CHANGE_ROLE’ :
          handleChangePlayerRole(ws, payload) ;
          break ;
        default :
          logger.warn(`Unknown message type : ${type}`) ;
      }
    } catch (err) {
      Logger.error(`Message error : ${err.message}`) ;
    }
  }) ;
}

Function handleCreateRoom(ws, { roomCode, name }) {
  Const code = roomCode || generateRoomCode() ;
  Rooms[code] = {
    hostId : ws.id,
    assistantId : null,
    players : {},
    roles : [],
    drawn : false,
  } ;
  Rooms[code].players[ws.id] = { name, ws, isHost : true } ;
  Ws.send(JSON.stringify({ type : ‘ROOM_CREATED’, payload : { roomCode : code } })) ;
  Logger.info(`Room created : ${code}`) ;
}

Function handleJoinRoom(ws, { roomCode, name }) {
  Const room = rooms[roomCode] ;
  If ( !room) {
    Ws.send(JSON.stringify({ type : ‘ROOM_NOT_FOUND’ })) ;
    Return ;
  }
  Room.players[ws.id] = { name, ws, pending : true } ;
  Const host = Object.values(room.players).find(p => p.isHost) ;
  If (host) {
    Host.ws.send(JSON.stringify({
      Type : ‘JOIN_REQUEST’,
      Payload : { id : ws.id, name }
    })) ;
  }
}

Function handleAcceptPlayer(ws, { roomCode, playerId }) {
  Const room = rooms[roomCode] ;
  If ( !room || !room.players[playerId]) return ;
  Room.players[playerId].pending = false ;
  Room.players[playerId].ws.send(JSON.stringify({ type : ‘JOIN_ACCEPTED’, payload : { roomCode } })) ;
  broadcastRoomUpdate(room) ;
}

Function handleRejectPlayer(ws, { roomCode, playerId }) {
  Const room = rooms[roomCode] ;
  If (room ?.players[playerId]) {
    Room.players[playerId].ws.send(JSON.stringify({ type : ‘JOIN_REJECTED’ })) ;
    Delete room.players[playerId] ;
  }
}

Function handleStartDraw(ws, { roomCode, roles }) {
  Const room = rooms[roomCode] ;
  If ( !room) return ;

  Const validPlayers = Object.values(room.players).filter(p => !p.pending && !p.isHost && !p.isAssistant) ;
  Const totalPlayers = validPlayers.length ;

  Const fullRoleList = [] ;
  Roles.forEach(role => {
    For (let i = 0 ; i < role.count ; i++) {
      fullRoleList.push(role) ;
    }
  }) ;

  If (fullRoleList.length !== totalPlayers) {
    Ws.send(JSON.stringify({ type : ‘DRAW_FAILED’, reason : ‘Role count mismatch’ })) ;
    Return ;
  }

  shuffleArray(fullRoleList) ;

  validPlayers.forEach((player, idx) => {
    const role = fullRoleList[idx] ;
    player.role = role ;
    player.ws.send(JSON.stringify({
      type : ‘ROLE_ASSIGNED’,
      payload : {
        name : role.name,
        description : role.description,
        image : role.image
      }
    })) ;
  }) ;

  // Reveal roles to host and assistant
  Const revealed = validPlayers.map(p => ({
    Name : p.name,
    Role : p.role.name
  })) ;
  Object.values(room.players).forEach(p => {
    If (p.isHost || p.isAssistant) {
      p.ws.send(JSON.stringify({
        type : ‘ALL_ROLES’,
        payload : revealed
      })) ;
    }
  }) ;

  Room.drawn = true ;
}

Function handlePrivateMessage(ws, { roomCode, toId, message }) {
  Const room = rooms[roomCode] ;
  If ( !room || !room.players[toId]) return ;

  Const target = room.players[toId] ;
  Target.ws.send(JSON.stringify({
    Type : ‘PRIVATE_MESSAGE’,
    Payload : {
      From : ws.id,
      Message
    }
  })) ;
}

Function handleKickPlayer(ws, { roomCode, playerId }) {
  Const room = rooms[roomCode] ;
  If (room ?.players[playerId]) {
    Room.players[playerId].ws.send(JSON.stringify({ type : ‘KICKED’ })) ;
    Delete room.players[playerId] ;
    broadcastRoomUpdate(room) ;
  }
}

Function handleAssignAssistant(ws, { roomCode, playerId }) {
  Const room = rooms[roomCode] ;
  If (room ?.players[playerId]) {
    Room.assistantId = playerId ;
    Room.players[playerId].isAssistant = true ;
    Room.players[playerId].ws.send(JSON.stringify({ type : ‘ASSISTANT_ASSIGNED’ })) ;
  }
}

Function handleChangePlayerRole(ws, { roomCode, playerId, role }) {
  Const room = rooms[roomCode] ;
  If (room ?.players[playerId]) {
    Room.players[playerId].role = role ;
    Room.players[playerId].ws.send(JSON.stringify({
      Type : ‘ROLE_CHANGED’,
      Payload : role
    })) ;
  }
}

Function broadcastRoomUpdate(room) {
  Const playersList = Object.entries(room.players).map(([id, p]) => ({
    Id,
    Name : p.name,
    Pending : !!p.pending,
    isHost : !!p.isHost,
    isAssistant : !!p.isAssistant
  })) ;
  Object.values(room.players).forEach(p => {
    If (p.ws.readyState === 1) {
      p.ws.send(JSON.stringify({
        type : ‘ROOM_UPDATE’,
        payload : playersList
      })) ;
    }
  }) ;
}

Module.exports = {
  handleSocketConnection
} ;

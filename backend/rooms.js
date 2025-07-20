const rolesData = require('./roles');
const { validateJoinRequest } = require('./validation');
const logger = require('./logger');
const { shuffleArray, generateRoomCode } = require('./utils');

const rooms = {};

function handleSocketConnection(ws, wss) {
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      const { type, payload } = data;

      switch (type) {
        case 'CREATE_ROOM':
          handleCreateRoom(ws, payload);
          break;
        case 'JOIN_ROOM':
          handleJoinRoom(ws, payload);
          break;
        case 'ACCEPT_PLAYER':
          handleAcceptPlayer(ws, payload);
          break;
        case 'REJECT_PLAYER':
          handleRejectPlayer(ws, payload);
          break;
        case 'START_DRAW':
          handleStartDraw(ws, payload);
          break;
        case 'SEND_MESSAGE':
          handlePrivateMessage(ws, payload);
          break;
        case 'KICK_PLAYER':
          handleKickPlayer(ws, payload);
          break;
        case 'ASSIGN_ASSISTANT':
          handleAssignAssistant(ws, payload);
          break;
        case 'CHANGE_ROLE':
          handleChangePlayerRole(ws, payload);
          break;
        default:
          logger.warn(`Unknown message type: ${type}`);
      }
    } catch (err) {
      logger.error(`Message error: ${err.message}`);
    }
  });
}

function handleCreateRoom(ws, { roomCode, name }) {
  const code = roomCode || generateRoomCode();
  rooms[code] = {
    hostId: ws.id,
    assistantId: null,
    players: {},
    roles: [],
    drawn: false,
  };
  rooms[code].players[ws.id] = { name, ws, isHost: true };
  ws.send(JSON.stringify({ type: 'ROOM_CREATED', payload: { roomCode: code } }));
  logger.info(`Room created: ${code}`);
}

function handleJoinRoom(ws, { roomCode, name }) {
  const room = rooms[roomCode];
  if (!room) {
    ws.send(JSON.stringify({ type: 'ROOM_NOT_FOUND' }));
    return;
  }
  room.players[ws.id] = { name, ws, pending: true };
  const host = Object.values(room.players).find(p => p.isHost);
  if (host) {
    host.ws.send(JSON.stringify({
      type: 'JOIN_REQUEST',
      payload: { id: ws.id, name }
    }));
  }
}

function handleAcceptPlayer(ws, { roomCode, playerId }) {
  const room = rooms[roomCode];
  if (!room || !room.players[playerId]) return;
  room.players[playerId].pending = false;
  room.players[playerId].ws.send(JSON.stringify({ type: 'JOIN_ACCEPTED', payload: { roomCode } }));
  broadcastRoomUpdate(room);
}

function handleRejectPlayer(ws, { roomCode, playerId }) {
  const room = rooms[roomCode];
  if (room?.players[playerId]) {
    room.players[playerId].ws.send(JSON.stringify({ type: 'JOIN_REJECTED' }));
    delete room.players[playerId];
  }
}

function handleStartDraw(ws, { roomCode, roles }) {
  const room = rooms[roomCode];
  if (!room) return;

  const validPlayers = Object.values(room.players).filter(p => !p.pending && !p.isHost && !p.isAssistant);
  const totalPlayers = validPlayers.length;

  const fullRoleList = [];
  roles.forEach(role => {
    for (let i = 0; i < role.count; i++) {
      fullRoleList.push(role);
    }
  });

  if (fullRoleList.length !== totalPlayers) {
    ws.send(JSON.stringify({ type: 'DRAW_FAILED', reason: 'Role count mismatch' }));
    return;
  }

  shuffleArray(fullRoleList);

  validPlayers.forEach((player, idx) => {
    const role = fullRoleList[idx];
    player.role = role;
    player.ws.send(JSON.stringify({
      type: 'ROLE_ASSIGNED',
      payload: {
        name: role.name,
        description: role.description,
        image: role.image
      }
    }));
  });

  const revealed = validPlayers.map(p => ({
    name: p.name,
    role: p.role.name
  }));
  Object.values(room.players).forEach(p => {
    if (p.isHost || p.isAssistant) {
      p.ws.send(JSON.stringify({
        type: 'ALL_ROLES',
        payload: revealed
      }));
    }
  });

  room.drawn = true;
}

function handlePrivateMessage(ws, { roomCode, toId, message }) {
  const room = rooms[roomCode];
  if (!room || !room.players[toId]) return;

  const target = room.players[toId];
  target.ws.send(JSON.stringify({
    type: 'PRIVATE_MESSAGE',
    payload: {
      from: ws.id,
      message
    }
  }));
}

function handleKickPlayer(ws, { roomCode, playerId }) {
  const room = rooms[roomCode];
  if (room?.players[playerId]) {
    room.players[playerId].ws.send(JSON.stringify({ type: 'KICKED' }));
    delete room.players[playerId];
    broadcastRoomUpdate(room);
  }
}

function handleAssignAssistant(ws, { roomCode, playerId }) {
  const room = rooms[roomCode];
  if (room?.players[playerId]) {
    room.assistantId = playerId;
    room.players[playerId].isAssistant = true;
    room.players[playerId].ws.send(JSON.stringify({ type: 'ASSISTANT_ASSIGNED' }));
  }
}

function handleChangePlayerRole(ws, { roomCode, playerId, role }) {
  const room = rooms[roomCode];
  if (room?.players[playerId]) {
    room.players[playerId].role = role;
    room.players[playerId].ws.send(JSON.stringify({
      type: 'ROLE_CHANGED',
      payload: role
    }));
  }
}

function broadcastRoomUpdate(room) {
  const playersList = Object.entries(room.players).map(([id, p]) => ({
    id,
    name: p.name,
    pending: !!p.pending,
    isHost: !!p.isHost,
    isAssistant: !!p.isAssistant
  }));
  Object.values(room.players).forEach(p => {
    if (p.ws.readyState === 1) {
      p.ws.send(JSON.stringify({
        type: 'ROOM_UPDATE',
        payload: playersList
      }));
    }
  });
}

module.exports = {
  handleSocketConnection
};

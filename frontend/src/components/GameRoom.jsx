// src/components/GameRoom.jsx

import React, { useEffect, useState, useContext } from 'react';
import { socket } from '../services/socket';
import PlayerList from './PlayerList';
import ChatBox from './ChatBox';
import RoleSelector from './RoleSelector';
import ControlPanel from './ControlPanel';
import AssistantPanel from './AssistantPanel';
import RoleCardCustomizer from './RoleCardCustomizer';
import { ThemeContext } from '../contexts/ThemeContext';

const GameRoom = ({ roomId, playerName }) => {
  const { theme } = useContext(ThemeContext);
  const [players, setPlayers] = useState([]);
  const [isNarrator, setIsNarrator] = useState(false);
  const [isAssistant, setIsAssistant] = useState(false);
  const [roleList, setRoleList] = useState([]);
  const [messages, setMessages] = useState([]);
  const [roomLocked, setRoomLocked] = useState(false);

  useEffect(() => {
    socket.connect();
    socket.emit('joinRoom', { roomId, playerName });

    socket.on('updatePlayers', (data) => {
      setPlayers(data.players);
    });

    socket.on('narratorStatus', (status) => {
      setIsNarrator(status);
    });

    socket.on('assistantStatus', (status) => {
      setIsAssistant(status);
    });

    socket.on('updateRoles', (roles) => {
      setRoleList(roles);
    });

    socket.on('receiveMessage', (message) => {
      setMessages((prev) => [...prev, message]);
    });

    socket.on('roomLocked', (locked) => {
      setRoomLocked(locked);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId, playerName]);

  return (
    <div className={`game-room ${theme}`}>
      <h2 className="text-xl font-bold text-center mb-4">الغرفة: {roomId}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1">
          <PlayerList players={players} />
          {(isNarrator || isAssistant) && <AssistantPanel players={players} />}
        </div>

        <div className="col-span-1">
          <ChatBox messages={messages} />
        </div>

        <div className="col-span-1">
          {(isNarrator || isAssistant) && (
            <>
              <RoleSelector roles={roleList} />
              <RoleCardCustomizer />
              <ControlPanel
                roomId={roomId}
                players={players}
                roles={roleList}
                roomLocked={roomLocked}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameRoom;

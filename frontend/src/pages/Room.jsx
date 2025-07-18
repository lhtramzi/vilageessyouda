// src/pages/Room.jsx

import React, { useContext } from 'react';
import GameRoom from '../components/GameRoom';
import { ThemeContext } from '../contexts/ThemeContext';

const Room = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={darkMode ? 'dark bg-gray-900 text-white min-h-screen' : 'bg-gray-100 text-black min-h-screen'}>
      <GameRoom />
    </div>
  );
};

export default Room;


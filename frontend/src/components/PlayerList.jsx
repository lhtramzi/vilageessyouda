// src/components/PlayerList.jsx

import React from 'react';
import PlayerCard from './PlayerCard';

const PlayerList = ({ players }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">قائمة اللاعبين</h3>
      <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
        {players.map((player, index) => (
          <PlayerCard key={index} player={player} />
        ))}
      </div>
    </div>
  );
};

export default PlayerList;

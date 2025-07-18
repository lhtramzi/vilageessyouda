// src/components/PlayerCard.jsx

import React, { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';

const PlayerCard = ({ player, isNarrator, onMessage, onViewCard }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div
      className={`p-3 rounded-2xl shadow-md flex flex-col items-center justify-between w-40 h-40 ${
        isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
      }`}
    >
      <div className="text-lg font-semibold truncate">{player.name}</div>

      <div className="mt-2 text-sm text-gray-500 dark:text-gray-300">
        {player.roleAssigned ? '📜 لديه دور' : '❓ لم يُوزع بعد'}
      </div>

      <div className="mt-4 flex gap-2">
        {isNarrator && (
          <>
            <button
              className="px-2 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => onViewCard(player.id)}
            >
              عرض البطاقة
            </button>
            <button
              className="px-2 py-1 text-sm bg-purple-500 text-white rounded hover:bg-purple-600"
              onClick={() => onMessage(player.id)}
            >
              رسالة
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PlayerCard;

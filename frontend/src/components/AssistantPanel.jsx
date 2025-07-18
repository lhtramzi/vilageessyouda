// src/components/AssistantPanel.jsx

import React, { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';

const AssistantPanel = ({ players, onKick, onPromote, onAssignRole }) => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`p-4 rounded-xl shadow-md ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <h2 className="text-xl font-bold mb-4">لوحة تحكم المساعد</h2>
      {players.length === 0 ? (
        <p>لا يوجد لاعبين في الغرفة</p>
      ) : (
        <ul className="space-y-2">
          {players.map((player) => (
            <li key={player.id} className="flex items-center justify-between p-2 rounded bg-white dark:bg-gray-700">
              <span>{player.name}</span>
              <div className="flex gap-2">
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  onClick={() => onKick(player.id)}

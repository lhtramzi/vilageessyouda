// src/components/RoleCardCustomizer.jsx

import React, { useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';

const RoleCardCustomizer = ({ selectedRole, onChange }) => {
  const { isDarkMode } = useContext(ThemeContext);

  if (!selectedRole) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...selectedRole, [name]: value });
  };

  return (
    <div
      className={`rounded-xl p-4 shadow-md mt-4 space-y-3
        ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'}`}
    >
      <h3 className="text-lg font-semibold mb-2">تخصيص البطاقة للدور</h3>
      <div className="space-y-2">
        <input
          type="text"
          name="title"


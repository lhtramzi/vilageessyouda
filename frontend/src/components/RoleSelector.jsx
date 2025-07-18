// src/components/RoleSelector.jsx

import React from 'react';

const RoleSelector = ({ roles, selectedRole, onSelect }) => {
  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-xl shadow">
      <h3 className="text-lg font-bold mb-2 text-gray-800 dark:text-white">اختر دورًا:</h3>
      <select
        value={selectedRole}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full p-2 rounded-lg border dark:border-gray-600 dark:bg-gray-800 dark:text-white"
      >
        <option value="">-- اختر دورًا --</option>
        {roles.map((role, index) => (
          <option key={index} value={role.name}>
            {role.name} {role.count > 1 ? `(${role.count})` : ''}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RoleSelector;

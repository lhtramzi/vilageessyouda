// src/components/RoleManager.jsx

import React, { useContext, useState } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import RoleForm from './RoleForm';
import RoleCardCustomizer from './RoleCardCustomizer';

const RoleManager = ({ roles, setRoles }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(null);

  const handleAddRole = (newRole) => {
    setRoles([...roles, newRole]);
  };

  const handleDelete = (index) => {
    const updated = [...roles];
    updated.splice(index, 1);
    setRoles(updated);
    if (selectedRoleIndex === index) setSelectedRoleIndex(null);
  };

  const handleUpdate = (updatedRole) => {
    const updated = [...roles];
    updated[selectedRoleIndex] = updatedRole;
    setRoles(updated);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">إدارة الأدوار</h2>
      <RoleForm onAdd={handleAddRole} />
      <div className="grid grid-cols-2 gap-4 mt-4">
        {roles.map((role, index) => (
          <div
            key={index}
            onClick={() => setSelectedRoleIndex(index)}
            className={`cursor-pointer p-3 rounded-xl shadow-md border 
              ${selectedRoleIndex === index ? 'border-blue-500' : 'border-gray-300'}
              ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}
          >
            <h3 className="font-semibold">{role.title}</h3>
            <p className="text-sm">{role.description}</p>
            <button
              className="text-red-500 mt-2"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(index);
              }}
            >
              حذف
            </button>
          </div>
        ))}
      </div>

      {selectedRoleIndex !== null && roles[selectedRoleIndex] && (
        <RoleCardCustomizer
          selectedRole={roles[selectedRoleIndex]}
          onChange={handleUpdate}
        />
      )}
    </div>
  );
};

export default RoleManager;

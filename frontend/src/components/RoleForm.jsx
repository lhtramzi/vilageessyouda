// src/components/RoleForm.jsx

import React, { useState } from 'react';

const RoleForm = ({ onSubmit, initialData = {}, onCancel }) => {
  const [name, setName] = useState(initialData.name || '');
  const [description, setDescription] = useState(initialData.description || '');
  const [team, setTeam] = useState(initialData.team || 'villagers');
  const [count, setCount] = useState(initialData.count || 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, description, team, count });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 p-4 border rounded-xl bg-white dark:bg-gray-800 shadow-lg"
    >
      <h2 className="text-lg font-bold dark:text-white">إعداد دور</h2>

      <input
        type="text"
        placeholder="اسم الدور"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="input input-bordered"
      />

      <textarea
        placeholder="وصف الدور"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="textarea textarea-bordered"
      />

      <select
        value={team}
        onChange={(e) => setTeam(e.target.value)}
        className="select select-bordered"
      >
        <option value="villagers">القرويون</option>
        <option value="werewolves">المستذئبون</option>
        <option value="neutral">محايد</option>
      </select>

      <input
        type="number"
        min="1"
        value={count}
        onChange={(e) => setCount(parseInt(e.target.value))}
        className="input input-bordered"
        placeholder="عدد مرات التكرار"
      />

      <div className="flex justify-end gap-2 mt-2">
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn btn-outline">
            إلغاء
          </button>
        )}
        <button type="submit" className="btn btn-primary">
          حفظ الدور
        </button>
      </div>
    </form>
  );
};

export default RoleForm;

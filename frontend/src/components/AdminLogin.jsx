// src/components/AdminLogin.jsx

import React, { useState, useContext } from 'react';
import { ThemeContext } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { isDarkMode } = useContext(ThemeContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === import.meta.env.VITE_ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError('كلمة المرور غير صحيحة');
    }
  };

  return (
    <div className={`p-6 max-w-md mx-auto mt-12 rounded-xl shadow-md space-y-4
      ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
      <h2 className="text-xl font-bold">تسجيل دخول الأدمن</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="password"
          placeholder="كلمة المرور"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="w-full">دخول</Button>
      </form>
    </div>
  );
};

export default AdminLogin;

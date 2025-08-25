
import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@pm.com' && password === 'password') {
      setError('');
      onLogin();
    } else {
      setError('Credenciales incorrectas. Intente de nuevo.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-dark">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-gray-800 rounded-lg shadow-2xl">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-primary dark:text-blue-400">Sistema PM</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Gestión de Clientes y Capacitaciones</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 text-gray-900 bg-gray-200 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Email (admin@pm.com)"
            />
          </div>
          <div className="relative">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 text-gray-900 bg-gray-200 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Contraseña (password)"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}
          
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white transition-transform transform bg-primary rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary active:scale-95"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
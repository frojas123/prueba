
import React from 'react';
import { NavLink } from 'react-router-dom';
import DashboardIcon from './icons/DashboardIcon';
import ClientsIcon from './icons/ClientsIcon';
import TrainingsIcon from './icons/TrainingsIcon';

interface LayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

const Sidebar: React.FC = () => {
    const navLinkClasses = "flex items-center px-4 py-3 text-gray-200 transition-colors duration-200 transform rounded-md hover:bg-gray-700";
    const activeNavLinkClasses = "bg-gray-700 text-white";

    return (
        <div className="flex flex-col w-64 h-screen px-4 py-8 bg-gray-800 border-r dark:bg-gray-900 dark:border-gray-700">
            <h2 className="text-3xl font-semibold text-center text-white">Sistema PM</h2>
            <div className="flex flex-col justify-between flex-1 mt-6">
                <nav>
                    <NavLink to="/dashboard" className={({ isActive }) => isActive ? `${navLinkClasses} ${activeNavLinkClasses}` : navLinkClasses}>
                        <DashboardIcon className="w-5 h-5" />
                        <span className="mx-4 font-medium">Dashboard</span>
                    </NavLink>
                    <NavLink to="/clients" className={({ isActive }) => isActive ? `${navLinkClasses} ${activeNavLinkClasses}` : navLinkClasses}>
                        <ClientsIcon className="w-5 h-5" />
                        <span className="mx-4 font-medium">Clientes</span>
                    </NavLink>
                    <NavLink to="/trainings" className={({ isActive }) => isActive ? `${navLinkClasses} ${activeNavLinkClasses}` : navLinkClasses}>
                        <TrainingsIcon className="w-5 h-5" />
                        <span className="mx-4 font-medium">Capacitaciones</span>
                    </NavLink>
                </nav>
            </div>
        </div>
    );
};

const Header: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
    return (
        <header className="w-full h-16 bg-white shadow-md dark:bg-gray-800 flex items-center justify-end px-6">
             <div className="flex items-center">
                <span className="mr-4 text-gray-700 dark:text-gray-200">Admin</span>
                <button onClick={onLogout} className="px-4 py-2 text-sm font-medium text-white transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-50">
                    Cerrar Sesión
                </button>
             </div>
        </header>
    );
};


const Layout: React.FC<LayoutProps> = ({ children, onLogout }) => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-dark">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Header onLogout={onLogout} />
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
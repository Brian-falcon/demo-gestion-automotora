import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import PageTransition from './PageTransition';
import { 
  LayoutDashboard, 
  Car, 
  Users, 
  CreditCard, 
  FileText,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
  TrendingUp,
  History
} from 'lucide-react';
import { useState } from 'react';

const Layout = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleThemeToggle = () => {
    console.log('🎨 Cambiando tema de', theme, 'a', theme === 'light' ? 'dark' : 'light');
    toggleTheme();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Items del menú según el rol
  const navItems = user?.rol === 'admin' 
    ? [
        { to: '/dashboard', icon: LayoutDashboard, label: 'Escritorio' },
        { to: '/autos', icon: Car, label: 'Autos' },
        { to: '/clientes', icon: Users, label: 'Clientes' },
        { to: '/pagos', icon: CreditCard, label: 'Pagos' },
        { to: '/reportes', icon: FileText, label: 'Reportes' },
      ]
    : [
        { to: '/mi-dashboard', icon: TrendingUp, label: 'Mi Escritorio' },
        { to: '/pagos', icon: CreditCard, label: 'Mis Cuotas' },
      ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar para desktop */}
      <aside className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <div className="flex flex-col flex-grow bg-white dark:bg-dark-800 border-r border-gray-200 dark:border-dark-700 overflow-y-auto">
          {/* LOGO BRAVO */}
          <div className="flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 dark:from-primary-700 dark:via-primary-800 dark:to-dark-900 py-6 px-4 shadow-lg">
            <div className="text-center">
              {/* Logo SVG */}
              <svg className="w-32 h-auto mb-3" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                {/* Coche estilizado */}
                <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))">
                  <path d="M 80 180 Q 100 120 180 100 Q 260 120 280 180 Z" fill="none" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="120" cy="200" r="20" fill="white" opacity="0.9"/>
                  <circle cx="240" cy="200" r="20" fill="white" opacity="0.9"/>
                  <path d="M 110 180 L 270 180 L 260 160 L 120 160 Z" fill="white" opacity="0.7"/>
                </g>
              </svg>
              
              {/* Texto */}
              <h1 className="text-white text-2xl font-black tracking-wider mb-1" style={{textShadow: '0 4px 8px rgba(0,0,0,0.3)'}}>
                BRAVO
              </h1>
              <p className="text-blue-100 text-xs font-bold tracking-widest" style={{textShadow: '0 2px 4px rgba(0,0,0,0.3)'}}>
                AUTOMÓVILES
              </p>
            </div>
          </div>
          
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`
                }
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex-shrink-0 px-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg mb-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user?.cliente?.nombre || user?.email}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.rol === 'admin' ? 'Administrador' : 'Cliente'}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="ml-3 p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-500 transition-colors"
                title="Cerrar sesión"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
            
            {/* Theme Toggle */}
            <button
              onClick={handleThemeToggle}
              className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
              title={theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
            >
              <div className="relative w-4 h-4 mr-2">
                <Moon 
                  className={`h-4 w-4 absolute transition-all duration-300 ${
                    theme === 'light' 
                      ? 'opacity-100 rotate-0 scale-100' 
                      : 'opacity-0 rotate-90 scale-0'
                  }`} 
                />
                <Sun 
                  className={`h-4 w-4 absolute transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'opacity-100 rotate-0 scale-100' 
                      : 'opacity-0 -rotate-90 scale-0'
                  }`} 
                />
              </div>
              <span className="transition-all duration-300">
                {theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
              </span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-gray-600 dark:bg-black bg-opacity-75 dark:bg-opacity-80"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 flex flex-col w-64 bg-white dark:bg-dark-800">
            {/* LOGO MOBILE */}
            <div className="flex items-center justify-between bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 dark:from-primary-700 dark:via-primary-800 dark:to-dark-900 py-5 px-4 shadow-lg">
              <div className="flex items-center flex-1">
                <div className="text-center flex-1">
                  {/* Logo SVG Mobile */}
                  <svg className="w-24 h-auto mb-2 mx-auto" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                    <g filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))">
                      <path d="M 80 180 Q 100 120 180 100 Q 260 120 280 180 Z" fill="none" stroke="white" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="120" cy="200" r="20" fill="white" opacity="0.9"/>
                      <circle cx="240" cy="200" r="20" fill="white" opacity="0.9"/>
                      <path d="M 110 180 L 270 180 L 260 160 L 120 160 Z" fill="white" opacity="0.7"/>
                    </g>
                  </svg>
                  <h1 className="text-white text-lg font-black tracking-wider" style={{textShadow: '0 4px 8px rgba(0,0,0,0.3)'}}>
                    BRAVO
                  </h1>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`
                  }
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="flex-shrink-0 px-4 py-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg mb-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user?.nombre}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.email}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="ml-3 p-2 text-gray-400 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-500 transition-colors"
                  title="Cerrar sesión"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
              
              {/* Theme Toggle Mobile */}
              <button
                onClick={handleThemeToggle}
                className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                title={theme === 'light' ? 'Modo oscuro' : 'Modo claro'}
              >
                <div className="relative w-4 h-4 mr-2">
                  <Moon 
                    className={`h-4 w-4 absolute transition-all duration-300 ${
                      theme === 'light' 
                        ? 'opacity-100 rotate-0 scale-100' 
                        : 'opacity-0 rotate-90 scale-0'
                    }`} 
                  />
                  <Sun 
                    className={`h-4 w-4 absolute transition-all duration-300 ${
                      theme === 'dark' 
                        ? 'opacity-100 rotate-0 scale-100' 
                        : 'opacity-0 -rotate-90 scale-0'
                    }`} 
                  />
                </div>
                <span className="transition-all duration-300">
                  {theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="md:pl-64 flex flex-col flex-1">
        {/* Mobile header */}
        <div className="sticky top-0 z-10 md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="py-6 px-4 sm:px-6 lg:px-8">
            <PageTransition>
              <Outlet />
            </PageTransition>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;

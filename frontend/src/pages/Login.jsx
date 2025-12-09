import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Car, Lock, Mail, ArrowRight, Sparkles, ShieldCheck, CreditCard, IdCard, Moon, Sun } from 'lucide-react';

const Login = () => {
  const [loginMode, setLoginMode] = useState(''); // '' | 'admin' | 'cliente'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cedula, setCedula] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState('');
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (loginMode === 'admin') {
        const result = await login(email, password);
        // Asegurar que el login fue exitoso antes de navegar
        if (result && result.token && result.user) {
          // Navegar a la raíz para que RoleBasedRedirect haga su trabajo
          // Esto redirigirá a /dashboard para admin o /pagos para cliente
          navigate('/', { replace: true });
        } else {
          setError('Error al iniciar sesión: respuesta inválida del servidor');
          setLoading(false);
        }
      } else {
        // Login de cliente con cédula
        await loginCliente(cedula);
        // loginCliente hace su propia navegación, no necesitamos navigate aquí
      }
    } catch (err) {
      // Manejar diferentes formatos de error
      const errorMessage = err?.message || err?.response?.data?.error || err?.error || err?.data?.error || 'Error al iniciar sesión';
      setError(errorMessage);
      setLoading(false);
    }
  };

  const loginCliente = async (cedula) => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    const response = await fetch(`${API_URL}/auth/login-cliente`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cedula })
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error || 'Error al iniciar sesión como cliente');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    // Actualizar el contexto de autenticación
    // Forzamos la recarga para que el AuthContext detecte el nuevo token
    window.location.href = '/';
  };

  const resetForm = () => {
    setLoginMode('');
    setError('');
    setEmail('');
    setPassword('');
    setCedula('');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4 relative">
      {/* Botón de cambio de tema en la esquina superior derecha */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 sm:top-6 sm:right-6 p-2.5 sm:p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 z-50 group"
        title={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
        aria-label={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
      >
        <div className="relative w-5 h-5 sm:w-6 sm:h-6">
          <Moon 
            className={`w-5 h-5 sm:w-6 sm:h-6 absolute text-gray-700 dark:text-gray-300 ${
              theme === 'light' 
                ? 'opacity-100' 
                : 'opacity-0 hidden'
            }`} 
          />
          <Sun 
            className={`w-5 h-5 sm:w-6 sm:h-6 absolute text-amber-500 ${
              theme === 'dark' 
                ? 'opacity-100' 
                : 'opacity-0 hidden'
            }`} 
          />
        </div>
        {/* Tooltip en hover (solo desktop) */}
        <span className="absolute -bottom-10 right-0 bg-gray-800 dark:bg-gray-700 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 whitespace-nowrap pointer-events-none hidden sm:block">
          {theme === 'light' ? 'Modo Oscuro' : 'Modo Claro'}
        </span>
      </button>

      <div className="max-w-md w-full">
        {/* Logo BRAVO AUTOMOVILES - Simple */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
            Bravo
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm font-semibold tracking-wider">
            Automoviles
          </p>
        </div>

        {/* Formulario de login */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          {error && (
            <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-lg text-sm">
              {error}
            </div>
          )}

          {!loginMode ? (
            /* Selección de tipo de usuario */
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white text-center mb-6">¿Cómo deseas ingresar?</h2>
              
              <button
                type="button"
                onClick={() => setLoginMode('admin')}
                className="w-full flex items-center justify-center gap-3 bg-blue-600 dark:bg-blue-600 text-white py-4 px-6 rounded-lg font-medium text-base"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>Soy Administrador</span>
              </button>

              <button
                type="button"
                onClick={() => setLoginMode('cliente')}
                className="w-full flex items-center justify-center gap-3 bg-gray-400 dark:bg-gray-700 text-white dark:text-white py-4 px-6 rounded-lg font-medium text-base"
              >
                <CreditCard className="w-5 h-5" />
                <span>Soy Cliente (Ver mis cuotas)</span>
              </button>

              <p className="text-gray-600 dark:text-gray-400 text-xs text-center mt-4">
                Los clientes solo pueden acceder si tienen pagos pendientes
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Botón para volver */}
              <button
                type="button"
                onClick={resetForm}
                className="text-gray-700 dark:text-gray-400 text-sm flex items-center gap-2"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                <span>Volver</span>
              </button>

              <h3 className="text-lg font-semibold text-gray-800 dark:text-white text-center">
                {loginMode === 'admin' ? (
                  <span className="flex items-center justify-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-500" />
                    Acceso Administrativo
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <CreditCard className="w-5 h-5 text-gray-700 dark:text-gray-400" />
                    Acceso Cliente
                  </span>
                )}
              </h3>

              {loginMode === 'admin' ? (
                /* Formulario para admin */
                <>
                  {/* Credenciales de prueba para admin */}
                  <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Credenciales de Prueba
                    </h4>
                    <div className="space-y-1 text-xs text-blue-800 dark:text-blue-400">
                      <p><span className="font-medium">Email:</span> admin@demo.com</p>
                      <p><span className="font-medium">Contraseña:</span> admin123</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Correo Electrónico
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent"
                        placeholder="correo@ejemplo.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Contraseña
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>
                </>
              ) : (
                /* Formulario para cliente */
                <>
                  {/* Cédulas de prueba para clientes */}
                  <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-300 mb-2 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Cédulas de Prueba
                    </h4>
                    <div className="space-y-1 text-xs text-gray-800 dark:text-gray-400">
                      <p><span className="font-medium">Juan Pérez:</span> 12345678</p>
                      <p><span className="font-medium">María González:</span> 87654321</p>
                      <p><span className="font-medium">Carlos Rodríguez:</span> 11223344</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="cedula" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Número de Cédula
                    </label>
                    <div className="relative">
                      <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-gray-400" />
                      <input
                        id="cedula"
                        type="text"
                        value={cedula}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          if (value.length <= 8) {
                            setCedula(value);
                          }
                        }}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-600 dark:focus:ring-blue-500 focus:border-transparent"
                        placeholder="Ej: 12345678"
                        maxLength="8"
                        pattern="[0-9]{8}"
                        required
                      />
                    </div>
                    <p className="text-gray-700 dark:text-gray-400 text-xs mt-2">
                      Ingresa tu número de cédula (8 dígitos) para ver tus pagos pendientes
                    </p>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 dark:bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></div>
                    Iniciando sesión...
                  </span>
                ) : (
                  'Iniciar Sesión'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

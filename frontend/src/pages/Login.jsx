import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Car, Lock, Mail, ArrowRight, Sparkles, ShieldCheck, CreditCard, IdCard } from 'lucide-react';

const Login = () => {
  const [loginMode, setLoginMode] = useState(''); // '' | 'admin' | 'cliente'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cedula, setCedula] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [focusedInput, setFocusedInput] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (loginMode === 'admin') {
        await login(email, password);
        navigate('/dashboard');
      } else {
        // Login de cliente con cédula
        await loginCliente(cedula);
        // loginCliente hace su propia navegación, no necesitamos navigate aquí
      }
    } catch (err) {
      setError(err.response?.data?.error || err.error || 'Error al iniciar sesión');
      setLoading(false);
    }
  };

  const loginCliente = async (cedula) => {
    const response = await fetch('http://localhost:5000/api/auth/login-cliente', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cedula })
    });

    if (!response.ok) {
      const data = await response.json();
      throw { error: data.error };
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    
    // Los clientes van directo a ver sus cuotas
    window.location.href = '/pagos';
  };

  const resetForm = () => {
    setLoginMode('');
    setError('');
    setEmail('');
    setPassword('');
    setCedula('');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">

      <div className="max-w-md w-full">
        {/* Logo y título minimalista */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-black mb-2 tracking-tight">
            <span className="text-red-600">RV</span>
          </h1>
          <h2 className="text-2xl font-semibold text-gray-600 mb-3">
            Automoviles
          </h2>
          <p className="text-gray-500 text-sm">
            Gestión Automotora
          </p>
        </div>

        {/* Formulario de login minimalista */}
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
              {error}
            </div>
          )}

          {!loginMode ? (
            /* Selección de tipo de usuario */
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-800 text-center mb-6">¿Cómo deseas ingresar?</h2>
              
              <button
                type="button"
                onClick={() => setLoginMode('admin')}
                className="w-full flex items-center justify-center gap-3 bg-blue-400 hover:bg-blue-500 text-white py-4 px-6 rounded-lg font-medium text-base transition-all duration-200"
              >
                <ShieldCheck className="w-5 h-5" />
                <span>Soy Administrador</span>
              </button>

              <button
                type="button"
                onClick={() => setLoginMode('cliente')}
                className="w-full flex items-center justify-center gap-3 bg-gray-600 hover:bg-gray-700 text-white py-4 px-6 rounded-lg font-medium text-base transition-all duration-200"
              >
                <CreditCard className="w-5 h-5" />
                <span>Soy Cliente (Ver mis cuotas)</span>
              </button>

              <p className="text-gray-500 text-xs text-center mt-4">
                Los clientes solo pueden acceder si tienen pagos pendientes
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Botón para volver */}
              <button
                type="button"
                onClick={resetForm}
                className="text-gray-600 hover:text-gray-800 text-sm flex items-center gap-2 transition-all duration-200"
              >
                <ArrowRight className="w-4 h-4 rotate-180" />
                <span>Volver</span>
              </button>

              <h3 className="text-lg font-semibold text-gray-800 text-center">
                {loginMode === 'admin' ? (
                  <span className="flex items-center justify-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-blue-400" />
                    Acceso Administrativo
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    Acceso Cliente
                  </span>
                )}
              </h3>

              {loginMode === 'admin' ? (
                /* Formulario para admin */
                <>
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Correo Electrónico
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                        placeholder="admin@automanager.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Contraseña
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>
                </>
              ) : (
                /* Formulario para cliente */
                <div className="space-y-2">
                  <label htmlFor="cedula" className="block text-sm font-medium text-gray-700">
                    Número de Cédula
                  </label>
                  <div className="relative">
                    <IdCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="cedula"
                      type="text"
                      value={cedula}
                      onChange={(e) => setCedula(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                      placeholder="Ingresa tu cédula"
                      required
                    />
                  </div>
                  <p className="text-gray-500 text-xs mt-2">
                    Ingresa tu cédula para ver tus pagos pendientes
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-400 hover:bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Iniciando sesión...
                  </span>
                ) : (
                  'Iniciar Sesión'
                )}
              </button>

              {loginMode === 'admin' && (
                <div className="mt-5 pt-5 border-t border-gray-200">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-xs font-medium text-gray-700 mb-2">
                      Credenciales de Prueba
                    </p>
                    <div className="space-y-1.5 text-xs text-gray-600">
                      <div className="flex items-center justify-between">
                        <span>Admin:</span>
                        <code className="bg-white px-2 py-1 rounded border border-gray-200">admin@automanager.com</code>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Pass:</span>
                        <code className="bg-white px-2 py-1 rounded border border-gray-200">admin123</code>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {loginMode === 'cliente' && (
                <div className="mt-5 pt-5 border-t border-gray-200">
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <p className="text-xs font-medium text-gray-700 mb-2">
                      Cédulas de Prueba
                    </p>
                    <div className="space-y-1.5 text-xs text-gray-600">
                      <div className="flex items-center justify-between">
                        <span>Juan Pérez:</span>
                        <code className="bg-white px-2 py-1 rounded border border-gray-200">1234567890</code>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Ana Martínez:</span>
                        <code className="bg-white px-2 py-1 rounded border border-gray-200">5544332211</code>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;

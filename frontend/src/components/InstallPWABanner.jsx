// Componente de banner de instalación PWA
import { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';
import { usePWA } from '../hooks/usePWA';

const InstallPWABanner = () => {
  const { isInstallable, isInstalled, installApp, isiOS, isAndroid, deferredPrompt } = usePWA();
  const [showBanner, setShowBanner] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    console.log('[Banner] Estado:', { isInstallable, isInstalled, isiOS, isAndroid });
    
    // Verificar si el usuario ya rechazó el banner
    const bannerDismissedStr = localStorage.getItem('pwa-banner-dismissed');
    
    if (bannerDismissedStr) {
      const dismissedDate = new Date(bannerDismissedStr);
      const now = new Date();
      
      // Si pasaron los 7 días, limpiar el storage
      if (now > dismissedDate) {
        localStorage.removeItem('pwa-banner-dismissed');
      } else {
        console.log('[Banner] Banner fue rechazado, esperando hasta:', dismissedDate);
        return;
      }
    }
    
    if (isInstallable && !isInstalled) {
      // Mostrar banner después de 2 segundos (reducido para testing)
      const timer = setTimeout(() => {
        console.log('[Banner] Mostrando banner');
        setShowBanner(true);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isInstallable, isInstalled, isiOS, isAndroid]);

  const handleInstall = async () => {
    const installed = await installApp();
    if (installed) {
      setShowBanner(false);
    }
  };

  const handleDismiss = () => {
    setShowBanner(false);
    setDismissed(true);
    // Recordar que el usuario rechazó por 7 días
    const dismissedDate = new Date();
    dismissedDate.setDate(dismissedDate.getDate() + 7);
    localStorage.setItem('pwa-banner-dismissed', dismissedDate.toISOString());
  };

  if (!showBanner || dismissed || isInstalled) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-[9999] animate-fadeInUp">
      <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-2xl border-2 border-primary-500 dark:border-primary-600 p-5">
        <button
          onClick={handleDismiss}
          className="absolute top-2 right-2 p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-all hover:scale-110"
          aria-label="Cerrar"
        >
          <X className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </button>

        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
            <Smartphone className="w-7 h-7 text-white" />
          </div>

          <div className="flex-1 min-w-0 pr-6">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              📱 ¡Instala RV Autos!
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
              Accede más rápido desde tu pantalla de inicio.
            </p>

            {isiOS ? (
              <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3 text-xs text-gray-700 dark:text-gray-300 space-y-1">
                <p className="font-semibold text-blue-700 dark:text-blue-400 mb-2">📲 Instrucciones para iPhone:</p>
                <p>1. Toca el botón <strong>Compartir</strong> 📤</p>
                <p>2. Selecciona <strong>"Añadir a pantalla de inicio"</strong></p>
                <p>3. Toca <strong>"Añadir"</strong></p>
              </div>
            ) : deferredPrompt ? (
              <button
                onClick={handleInstall}
                className="w-full btn btn-primary flex items-center justify-center gap-2 text-sm py-2.5 shadow-lg hover:shadow-xl"
              >
                <Download className="w-4 h-4" />
                Instalar Aplicación
              </button>
            ) : (
              <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-3 text-xs text-gray-700 dark:text-gray-300 space-y-1">
                <p className="font-semibold text-green-700 dark:text-green-400 mb-2">📲 Para instalar:</p>
                <p>1. Toca el menú <strong>⋮</strong> del navegador</p>
                <p>2. Selecciona <strong>"Instalar app"</strong> o <strong>"Agregar a pantalla de inicio"</strong></p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstallPWABanner;

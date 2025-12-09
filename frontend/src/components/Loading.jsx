// Componente de Loading
import React from 'react';

const Loading = ({ message = 'Cargando...' }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="w-16 h-16 border-4 border-primary-200 dark:border-primary-900 border-t-primary-600 dark:border-t-primary-400 rounded-full"></div>
        </div>
      </div>
      <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">{message}</p>
    </div>
  );
};

export default Loading;

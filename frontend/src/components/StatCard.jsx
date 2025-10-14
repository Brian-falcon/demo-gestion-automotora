// Componente de tarjeta de estadística reutilizable
import React from 'react';

const StatCard = ({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  bgColor = 'bg-blue-100', 
  iconColor = 'text-blue-600',
  trend,
  trendValue 
}) => {
  return (
    <div className="card hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <div className="flex items-baseline gap-2 mt-2">
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            {trend && (
              <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {trend === 'up' ? '↑' : '↓'} {trendValue}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
        <div className={`p-3 ${bgColor} rounded-full`}>
          <Icon className={`w-8 h-8 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
};

export default StatCard;

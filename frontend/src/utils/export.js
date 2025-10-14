// Utilidades para exportación de datos
export const exportToCSV = (data, filename = 'export.csv') => {
  if (!data || data.length === 0) {
    alert('No hay datos para exportar');
    return;
  }

  // Obtener headers
  const headers = Object.keys(data[0]);
  
  // Crear contenido CSV
  let csv = headers.join(',') + '\n';
  
  data.forEach(row => {
    const values = headers.map(header => {
      const value = row[header];
      // Manejar valores con comas o saltos de línea
      if (typeof value === 'string' && (value.includes(',') || value.includes('\n'))) {
        return `"${value.replace(/"/g, '""')}"`;
      }
      return value;
    });
    csv += values.join(',') + '\n';
  });

  // Crear y descargar archivo
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportToJSON = (data, filename = 'export.json') => {
  if (!data) {
    alert('No hay datos para exportar');
    return;
  }

  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const generatePDFReport = async (title, data) => {
  // Esta función requeriría una librería como jsPDF
  // Por ahora, mostramos una alerta
  alert('Función de exportación a PDF: Instale jsPDF para habilitar esta funcionalidad');
  console.log('Datos para PDF:', { title, data });
};

// Formatear datos para exportación
export const formatDataForExport = (data, type) => {
  switch(type) {
    case 'autos':
      return data.map(auto => ({
        'Marca': auto.marca,
        'Modelo': auto.modelo,
        'Año': auto.año,
        'Matrícula': auto.matricula,
        'Precio': `$${auto.precio}`,
        'Estado': auto.estado,
        'Cliente': auto.cliente?.nombre || 'Sin asignar',
        'Fecha Registro': new Date(auto.createdAt).toLocaleDateString()
      }));
    
    case 'clientes':
      return data.map(cliente => ({
        'Nombre': cliente.nombre,
        'Cédula': cliente.cedula,
        'Teléfono': cliente.telefono,
        'Email': cliente.email || '',
        'Dirección': cliente.direccion || '',
        'Autos Asociados': cliente.autos?.length || 0,
        'Fecha Registro': new Date(cliente.createdAt).toLocaleDateString()
      }));
    
    case 'pagos':
      return data.map(pago => ({
        'Cliente': pago.auto?.cliente?.nombre || 'N/A',
        'Auto': `${pago.auto?.marca} ${pago.auto?.modelo}`,
        'Matrícula': pago.auto?.matricula,
        'Cuota #': pago.numeroCuota,
        'Monto': `$${pago.monto}`,
        'Vencimiento': new Date(pago.fechaVencimiento).toLocaleDateString(),
        'Fecha Pago': pago.fechaPago ? new Date(pago.fechaPago).toLocaleDateString() : 'Pendiente',
        'Estado': pago.estado
      }));
    
    default:
      return data;
  }
};

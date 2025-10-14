# Documentación de la API - AutoManager

## Base URL

```
http://localhost:5000/api
```

## Autenticación

La mayoría de los endpoints requieren autenticación mediante JWT.

### Header de Autenticación

```
Authorization: Bearer <token>
```

---

## 🔐 Autenticación

### POST /auth/register

Registrar un nuevo usuario administrador.

**Request Body:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
  "password": "password123"
}
```

**Response (201):**
```json
{
  "message": "Usuario registrado exitosamente",
  "user": {
    "id": 1,
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "createdAt": "2024-01-15T10:00:00.000Z"
  }
}
```

### POST /auth/login

Iniciar sesión y obtener token JWT.

**Request Body:**
```json
{
  "email": "admin@automanager.com",
  "password": "admin123"
}
```

**Response (200):**
```json
{
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "nombre": "Administrador",
    "email": "admin@automanager.com"
  }
}
```

### GET /auth/verify

Verificar si el token es válido.

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "valid": true,
  "user": {
    "id": 1,
    "nombre": "Administrador",
    "email": "admin@automanager.com"
  }
}
```

---

## 🚗 Autos

### GET /autos

Obtener todos los autos.

**Query Parameters:**
- `buscar` (opcional): Buscar por marca, modelo o matrícula
- `estado` (opcional): Filtrar por estado (disponible, vendido, reservado)

**Response (200):**
```json
[
  {
    "id": 1,
    "marca": "Toyota",
    "modelo": "Corolla",
    "año": 2022,
    "matricula": "ABC-1234",
    "precio": 25000,
    "estado": "vendido",
    "clienteId": 1,
    "cliente": {
      "id": 1,
      "nombre": "Juan Pérez",
      "cedula": "1234567890"
    },
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  }
]
```

### GET /autos/:id

Obtener un auto por ID con sus pagos.

**Response (200):**
```json
{
  "id": 1,
  "marca": "Toyota",
  "modelo": "Corolla",
  "año": 2022,
  "matricula": "ABC-1234",
  "precio": 25000,
  "estado": "vendido",
  "cliente": { ... },
  "pagos": [
    {
      "id": 1,
      "numeroCuota": 1,
      "monto": 1100,
      "fechaVencimiento": "2024-01-15T00:00:00.000Z",
      "fechaPago": "2024-01-13T00:00:00.000Z",
      "estado": "pagado"
    }
  ]
}
```

### POST /autos

Crear un nuevo auto.

**Request Body:**
```json
{
  "marca": "Toyota",
  "modelo": "Corolla",
  "año": 2022,
  "matricula": "ABC-1234",
  "precio": 25000,
  "estado": "disponible",
  "clienteId": 1  // opcional
}
```

**Response (201):**
```json
{
  "id": 1,
  "marca": "Toyota",
  "modelo": "Corolla",
  "año": 2022,
  "matricula": "ABC-1234",
  "precio": 25000,
  "estado": "disponible",
  "clienteId": 1,
  "cliente": { ... }
}
```

### PUT /autos/:id

Actualizar un auto.

**Request Body:** (Todos los campos son opcionales)
```json
{
  "marca": "Toyota",
  "modelo": "Corolla XLE",
  "año": 2023,
  "precio": 27000,
  "estado": "vendido",
  "clienteId": 2
}
```

### DELETE /autos/:id

Eliminar un auto.

**Response (200):**
```json
{
  "message": "Auto eliminado exitosamente"
}
```

---

## 👥 Clientes

### GET /clientes

Obtener todos los clientes.

**Query Parameters:**
- `buscar` (opcional): Buscar por nombre, cédula, teléfono o email

**Response (200):**
```json
[
  {
    "id": 1,
    "nombre": "Juan Pérez",
    "cedula": "1234567890",
    "telefono": "0999123456",
    "direccion": "Av. Principal 123",
    "email": "juan@example.com",
    "autos": [
      {
        "id": 1,
        "marca": "Toyota",
        "modelo": "Corolla",
        "matricula": "ABC-1234",
        "estado": "vendido"
      }
    ],
    "createdAt": "2024-01-15T10:00:00.000Z"
  }
]
```

### GET /clientes/:id

Obtener un cliente con todos sus autos y pagos.

### POST /clientes

Crear un nuevo cliente.

**Request Body:**
```json
{
  "nombre": "Juan Pérez",
  "cedula": "1234567890",
  "telefono": "0999123456",
  "direccion": "Av. Principal 123",  // opcional
  "email": "juan@example.com"       // opcional
}
```

### PUT /clientes/:id

Actualizar un cliente.

### DELETE /clientes/:id

Eliminar un cliente (solo si no tiene autos asociados).

---

## 💳 Pagos

### GET /pagos

Obtener todos los pagos.

**Query Parameters:**
- `autoId` (opcional): Filtrar por auto
- `estado` (opcional): Filtrar por estado (pendiente, pagado)
- `vencidos` (opcional): "true" para ver solo vencidos

**Response (200):**
```json
[
  {
    "id": 1,
    "autoId": 1,
    "numeroCuota": 1,
    "monto": 1100,
    "fechaVencimiento": "2024-01-15T00:00:00.000Z",
    "fechaPago": "2024-01-13T00:00:00.000Z",
    "estado": "pagado",
    "auto": {
      "id": 1,
      "marca": "Toyota",
      "modelo": "Corolla",
      "matricula": "ABC-1234",
      "cliente": {
        "id": 1,
        "nombre": "Juan Pérez",
        "cedula": "1234567890",
        "telefono": "0999123456"
      }
    }
  }
]
```

### GET /pagos/proximos-vencimientos

Obtener pagos que vencen en los próximos 7 días.

### POST /pagos

Crear una nueva cuota individual.

**Request Body:**
```json
{
  "autoId": 1,
  "numeroCuota": 1,
  "monto": 1100,
  "fechaVencimiento": "2024-02-15",
  "estado": "pendiente"  // opcional, default: "pendiente"
}
```

### POST /pagos/generar-cuotas

Generar múltiples cuotas automáticamente.

**Request Body:**
```json
{
  "autoId": 1,
  "numeroCuotas": 24,
  "montoCuota": 1100,
  "fechaInicio": "2024-01-15",
  "intervaloMeses": 1  // opcional, default: 1
}
```

**Response (201):**
```json
{
  "message": "24 cuotas generadas exitosamente",
  "count": 24
}
```

### PUT /pagos/:id

Actualizar un pago (marcar como pagado, cambiar monto, etc).

**Request Body:**
```json
{
  "estado": "pagado",
  "fechaPago": "2024-01-15",  // opcional
  "monto": 1100,              // opcional
  "fechaVencimiento": "2024-02-15"  // opcional
}
```

### DELETE /pagos/:id

Eliminar un pago.

---

## 📊 Dashboard

### GET /dashboard/stats

Obtener todas las estadísticas del dashboard.

**Response (200):**
```json
{
  "autos": {
    "total": 6,
    "disponibles": 3,
    "vendidos": 2,
    "reservados": 1
  },
  "clientes": {
    "total": 4
  },
  "pagos": {
    "pagados": 16,
    "pendientes": 46,
    "vencidos": 1,
    "totalRecaudado": 17600,
    "totalPendiente": 50600
  },
  "proximosVencimientos": [
    {
      "id": 17,
      "numeroCuota": 9,
      "monto": 1100,
      "fechaVencimiento": "2024-10-15T05:00:00.000Z",
      "auto": {
        "marca": "Toyota",
        "modelo": "Corolla",
        "cliente": {
          "nombre": "Juan Pérez",
          "telefono": "0999123456"
        }
      }
    }
  ],
  "pagosRecientes": [
    {
      "id": 8,
      "numeroCuota": 8,
      "monto": 1100,
      "fechaPago": "2024-08-11T05:00:00.000Z",
      "auto": {
        "marca": "Toyota",
        "modelo": "Corolla",
        "cliente": {
          "nombre": "Juan Pérez"
        }
      }
    }
  ]
}
```

---

## ⚠️ Códigos de Error

### 400 Bad Request
Datos inválidos o campos faltantes.

```json
{
  "error": "Todos los campos son obligatorios"
}
```

### 401 Unauthorized
Token inválido o faltante.

```json
{
  "error": "Token inválido o expirado"
}
```

### 404 Not Found
Recurso no encontrado.

```json
{
  "error": "Auto no encontrado"
}
```

### 500 Internal Server Error
Error del servidor.

```json
{
  "error": "Error al obtener datos"
}
```

---

## 🧪 Ejemplos con cURL

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@automanager.com","password":"admin123"}'
```

### Obtener Autos
```bash
curl http://localhost:5000/api/autos \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Crear Auto
```bash
curl -X POST http://localhost:5000/api/autos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "marca":"Toyota",
    "modelo":"Corolla",
    "año":2022,
    "matricula":"ABC-1234",
    "precio":25000,
    "estado":"disponible"
  }'
```

### Generar Cuotas
```bash
curl -X POST http://localhost:5000/api/pagos/generar-cuotas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "autoId":1,
    "numeroCuotas":24,
    "montoCuota":1100,
    "fechaInicio":"2024-01-15"
  }'
```

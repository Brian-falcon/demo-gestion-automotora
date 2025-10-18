-- ============================================
-- SCRIPT SQL PARA CREAR TABLAS EN NEON
-- RV Automóviles - Base de Datos PostgreSQL
-- ============================================

-- Tabla: Usuario
CREATE TABLE IF NOT EXISTS "Usuario" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "password" VARCHAR(255) NOT NULL,
    "rol" VARCHAR(50) NOT NULL DEFAULT 'admin',
    "clienteId" INTEGER UNIQUE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: Cliente
CREATE TABLE IF NOT EXISTS "Cliente" (
    "id" SERIAL PRIMARY KEY,
    "nombre" VARCHAR(255) NOT NULL,
    "cedula" VARCHAR(50) NOT NULL UNIQUE,
    "telefono" VARCHAR(50) NOT NULL,
    "direccion" TEXT,
    "email" VARCHAR(255) NOT NULL UNIQUE,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: Auto
CREATE TABLE IF NOT EXISTS "Auto" (
    "id" SERIAL PRIMARY KEY,
    "marca" VARCHAR(100) NOT NULL,
    "modelo" VARCHAR(100) NOT NULL,
    "anio" INTEGER NOT NULL,
    "matricula" VARCHAR(50) NOT NULL UNIQUE,
    "precio" DOUBLE PRECISION NOT NULL,
    "estado" VARCHAR(50) NOT NULL DEFAULT 'disponible',
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "clienteId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Auto_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- Tabla: Pago
CREATE TABLE IF NOT EXISTS "Pago" (
    "id" SERIAL PRIMARY KEY,
    "autoId" INTEGER NOT NULL,
    "numeroCuota" INTEGER NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,
    "fechaVencimiento" TIMESTAMP(3) NOT NULL,
    "fechaPago" TIMESTAMP(3),
    "estado" VARCHAR(50) NOT NULL DEFAULT 'pendiente',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Pago_autoId_fkey" FOREIGN KEY ("autoId") REFERENCES "Auto" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Relación Usuario -> Cliente (Foreign Key)
ALTER TABLE "Usuario"
ADD CONSTRAINT "Usuario_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente" ("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- Índices para mejorar rendimiento
CREATE INDEX IF NOT EXISTS "Usuario_email_idx" ON "Usuario" ("email");

CREATE INDEX IF NOT EXISTS "Usuario_clienteId_idx" ON "Usuario" ("clienteId");

CREATE INDEX IF NOT EXISTS "Cliente_cedula_idx" ON "Cliente" ("cedula");

CREATE INDEX IF NOT EXISTS "Cliente_email_idx" ON "Cliente" ("email");

CREATE INDEX IF NOT EXISTS "Cliente_activo_idx" ON "Cliente" ("activo");

CREATE INDEX IF NOT EXISTS "Auto_clienteId_idx" ON "Auto" ("clienteId");

CREATE INDEX IF NOT EXISTS "Auto_matricula_idx" ON "Auto" ("matricula");

CREATE INDEX IF NOT EXISTS "Auto_activo_idx" ON "Auto" ("activo");

CREATE INDEX IF NOT EXISTS "Pago_autoId_idx" ON "Pago" ("autoId");

CREATE INDEX IF NOT EXISTS "Pago_estado_idx" ON "Pago" ("estado");

-- Trigger para actualizar updatedAt automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Aplicar trigger a todas las tablas
DROP TRIGGER IF EXISTS update_usuario_updated_at ON "Usuario";

CREATE TRIGGER update_usuario_updated_at 
    BEFORE UPDATE ON "Usuario" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_cliente_updated_at ON "Cliente";

CREATE TRIGGER update_cliente_updated_at 
    BEFORE UPDATE ON "Cliente" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_auto_updated_at ON "Auto";

CREATE TRIGGER update_auto_updated_at 
    BEFORE UPDATE ON "Auto" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_pago_updated_at ON "Pago";

CREATE TRIGGER update_pago_updated_at 
    BEFORE UPDATE ON "Pago" 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insertar usuario administrador por defecto
-- Contraseña: admin123 (hasheada con bcrypt)
INSERT INTO
    "Usuario" (
        "email",
        "password",
        "rol",
        "createdAt",
        "updatedAt"
    )
VALUES (
        'admin@rv.com',
        '$2a$10$t.ZsVB5kPwi1FErdH/QacerkOByj.dZPKgX2ZzJg5.BE9jJ71b8su',
        'admin',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    ) ON CONFLICT ("email") DO NOTHING;

-- Verificar que las tablas se crearon correctamente
SELECT tablename as "Tabla Creada", schemaname as "Schema"
FROM pg_tables
WHERE
    schemaname = 'public'
ORDER BY tablename;

-- ============================================
-- FIN DEL SCRIPT
-- ============================================
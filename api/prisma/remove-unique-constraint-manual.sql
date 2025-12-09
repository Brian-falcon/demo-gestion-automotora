-- Script SQL para ejecutar MANUALMENTE en Neon Database
-- Este script remueve el índice único de la columna matricula
-- Permitiendo múltiples autos con matrícula "0km"

-- IMPORTANTE: Ejecutar esto en la consola SQL de Neon:
-- https://console.neon.tech → Tu proyecto → SQL Editor

-- Paso 1: Verificar si el índice existe
SELECT indexname, tablename, indexdef
FROM pg_indexes
WHERE
    schemaname = 'public'
    AND tablename = 'Auto'
    AND indexname LIKE '%matricula%';

-- Paso 2: Remover el índice único si existe
DROP INDEX IF EXISTS "Auto_matricula_key";

-- Paso 3: Verificar que se removió
SELECT indexname, tablename, indexdef
FROM pg_indexes
WHERE
    schemaname = 'public'
    AND tablename = 'Auto'
    AND indexname LIKE '%matricula%';

-- Si el resultado del Paso 3 está vacío, el índice fue removido exitosamente

-- Paso 4 (Opcional): Verificar autos existentes con "0km"
SELECT id, marca, modelo, matricula, anio
FROM "Auto"
WHERE
    matricula = '0km';

-- Paso 5 (Opcional): Actualizar autos sin matrícula a "0km"
-- Solo si tienes autos con matrícula NULL o vacía
UPDATE "Auto"
SET
    matricula = '0km'
WHERE
    matricula IS NULL
    OR matricula = ''
    OR matricula = '-';
# 🚨 Solución Urgente: Remover Constraint Único de Matrícula

## ⚠️ Problema Actual

Al intentar crear autos sin matrícula (0km), obtienes el error:
```
"Ya existe un auto con esta matrícula"
```

**Causa**: La base de datos en Neon aún tiene el índice único `Auto_matricula_key` activo.

## ✅ Solución Manual (Más Rápida)

### Opción 1: Ejecutar SQL Directo en Neon (RECOMENDADO)

1. **Ir a Neon Console**:
   - Abre https://console.neon.tech
   - Selecciona tu proyecto
   - Ve a "SQL Editor"

2. **Ejecutar este comando**:
   ```sql
   DROP INDEX IF EXISTS "Auto_matricula_key";
   ```

3. **Verificar**:
   ```sql
   SELECT indexname FROM pg_indexes 
   WHERE tablename = 'Auto' AND indexname LIKE '%matricula%';
   ```
   
   Si no retorna resultados = ✅ Índice removido correctamente

4. **Probar en la App**:
   - Crear un auto sin matrícula
   - Debería funcionar inmediatamente

### Opción 2: Usar el Script Incluido

Si prefieres copiar y pegar, usa el archivo:
```
api/prisma/remove-unique-constraint-manual.sql
```

Contiene los comandos SQL con explicaciones paso a paso.

## 🔍 Verificar que Funcionó

Después de ejecutar el SQL:

1. **En Neon SQL Editor**:
   ```sql
   -- Debería retornar 0 filas
   SELECT indexname FROM pg_indexes 
   WHERE tablename = 'Auto' AND indexname = 'Auto_matricula_key';
   ```

2. **En tu App**:
   - Intenta crear un auto sin matrícula
   - Debe guardarse como "0km"
   - Puedes crear varios autos "0km"

## 🐛 Si Aún No Funciona

### Debug en Runtime Logs (Vercel)

1. Ve a Vercel Dashboard → Tu proyecto → Deployments
2. Click en el deployment activo → "Runtime Logs"
3. Busca los logs cuando intentas crear un auto:
   ```
   🚗 Creando auto: ...
   🔄 Matrícula procesada: ...
   ✅ Auto 0km - permitiendo múltiples
   ```

4. Si ves error `P2002`:
   ```
   ❌ Error code: P2002
   ❌ Constraint violation en: ['matricula']
   ```
   = El índice aún existe en la base de datos

### Forzar Rebuild de Prisma Client

Si el SQL no funcionó, intenta:

1. En Vercel, ve a Settings → Environment Variables
2. Agrega una variable temporal:
   ```
   FORCE_REBUILD=true
   ```
3. Redeploy la aplicación
4. Luego puedes remover la variable

## 📝 Scripts Automáticos (Ya Incluidos)

Los siguientes scripts se ejecutan automáticamente en cada deploy:

- ✅ `api/sync-schema.js` - Sincroniza schema con DB
- ✅ `build:vercel` ejecuta `prisma:sync`
- ⚠️ Pueden fallar si hay problemas de permisos

## 🔄 Estado de la Migración

### En el Código:
- ✅ Schema actualizado (sin `@unique`)
- ✅ Backend valida correctamente
- ✅ Frontend permite campo vacío
- ✅ Conversión a "0km" implementada

### En la Base de Datos:
- ❌ Índice único aún existe (necesita SQL manual)
- ⚠️ `prisma db push` no lo removió automáticamente

## 💡 Por Qué No Se Aplicó Automáticamente

Prisma tiene limitaciones con bases de datos en producción:
- `prisma migrate` requiere baseline
- `prisma db push` a veces no remueve constraints existentes
- Solución más segura: SQL directo

## ✉️ Comando SQL Final

Copia y pega esto en Neon SQL Editor:

```sql
-- 1. Verificar índice actual
SELECT indexname, indexdef 
FROM pg_indexes 
WHERE tablename = 'Auto' AND indexname LIKE '%matricula%';

-- 2. Remover índice
DROP INDEX IF EXISTS "Auto_matricula_key";

-- 3. Confirmar que se removió
SELECT indexname 
FROM pg_indexes 
WHERE tablename = 'Auto' AND indexname = 'Auto_matricula_key';
-- Debe retornar 0 filas

-- 4. (Opcional) Actualizar autos existentes
UPDATE "Auto" SET matricula = '0km' 
WHERE matricula = '-' OR matricula = '';
```

## 🎉 Después de Aplicar

Una vez ejecutado el SQL:

1. ✅ Podrás crear autos sin matrícula
2. ✅ Se guardarán como "0km"
3. ✅ Múltiples autos "0km" permitidos
4. ✅ Matrículas reales siguen siendo únicas

---

**Tiempo estimado**: 2 minutos  
**Dificultad**: Fácil (copiar y pegar SQL)  
**Reversible**: Sí (se puede volver a crear el índice)

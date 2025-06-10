# 🗺️ Roadmap: API de Finanzas Personales

Este proyecto consiste en construir una API REST para gestionar finanzas personales utilizando Node.js, Express y MongoDB.

---

## ✅ PASOS PARA DESARROLLAR EL PROYECTO

### 1. Setup del Proyecto
- [x] Crear repositorio en GitHub
- [x] Inicializar proyecto con `npm init -y`
- [x] Crear archivo `.gitignore`
- [x] Instalar dependencias principales (`express`, `mongoose`, `dotenv`, etc.)
- [x] Configurar `package.json` con scripts (`start`, `dev`)
- [x] Crear estructura base de carpetas

### 2. Configuración inicial
- [x] Crear archivo `.env` y cargar variables de entorno
- [x] Configurar conexión a MongoDB (`/config/db.js`)
- [x] Crear archivo principal `app.js` y levantar el servidor
- [x] Testear que el servidor y Mongo funcionan

### 3. Modelo de Usuario
- [ ] Crear el modelo de usuario (`/models/User.js`)
- [ ] Implementar registro con hash de contraseña
- [ ] Implementar login y generación de JWT
- [ ] Middleware de autenticación (`authMiddleware`)

### 4. Modelo de Transacción
- [ ] Crear el modelo de transacción (ingresos/gastos)
- [ ] Relacionar transacciones con el usuario

### 5. Rutas de la API
- [ ] Crear rutas públicas: `/api/register`, `/api/login`
- [ ] Crear rutas protegidas: `/api/transactions`
- [ ] CRUD de transacciones

### 6. Validaciones y Seguridad
- [ ] Validar datos con middleware o librerías (`express-validator` o custom)
- [ ] Proteger rutas con JWT
- [ ] Manejo de errores centralizado

### 7. Extras
- [ ] Agregar logs con `morgan`
- [ ] Agregar CORS si hay frontend separado
- [ ] Documentar endpoints (puede ser con Postman o Swagger)

### 8. Despliegue
- [ ] Crear cuenta en MongoDB Atlas (si aplica)
- [ ] Subir el backend a Render / Railway / Vercel
- [ ] Configurar variables de entorno en producción

---










































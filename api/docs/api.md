
# 📘 Documentación de la API - Finanzas Personales

## 🔐 Autenticación

### POST `/api/auth/register`
Registra un nuevo usuario.

- **Body**:
```json
{
  "name": "Nombre",
  "email": "email@example.com",
  "password": "password123"
}
```
- **Respuestas**:
  - `201 Created`: Usuario creado exitosamente.
  - `400 Bad Request`: Datos inválidos o usuario ya existe.

---

### POST `/api/auth/login`
Inicia sesión y devuelve un token JWT.

- **Body**:
```json
{
  "email": "email@example.com",
  "password": "password123"
}
```
- **Respuestas**:
  - `200 OK`: Devuelve token y datos del usuario.
  - `401 Unauthorized`: Credenciales incorrectas.

---

## 💰 Accounts

> Todas estas rutas requieren autenticación (JWT en encabezado `Authorization`)

### POST `/api/accounts`
Crea una nueva cuenta.

- **Body**:
```json
{
  "name": "Cuenta Bancaria",
  "balance": 1000
}
```
- **Respuestas**:
  - `201 Created`: Cuenta creada.
  - `400 Bad Request`: Datos inválidos.

---

### GET `/api/accounts`
Obtiene todas las cuentas del usuario autenticado.

- **Respuestas**:
  - `200 OK`: Devuelve arreglo de cuentas.

---

### GET `/api/accounts/:id`
Obtiene una cuenta específica por su ID.

- **Respuestas**:
  - `200 OK`: Cuenta encontrada.
  - `404 Not Found`: Cuenta no encontrada.

---

### PUT `/api/accounts/:id`
Actualiza una cuenta existente.

- **Body** (puede contener `name` o `balance` o ambos):
```json
{
  "name": "Caja Ahorro",
  "balance": 1500
}
```
- **Respuestas**:
  - `200 OK`: Cuenta actualizada.
  - `404 Not Found`: No se encontró la cuenta.

---

### DELETE `/api/accounts/:id`
Elimina una cuenta.

- **Respuestas**:
  - `200 OK`: Cuenta eliminada.
  - `404 Not Found`: Cuenta no encontrada.

---

## 🗂️ Categorías

### POST `/api/categories`
Crea una nueva categoría.

- **Body**:
```json
{
  "name": "Alquiler",
  "type": "expense"  // o "income"
}
```
- **Respuestas**:
  - `201 Created`: Categoría creada.
  - `400 Bad Request`: Datos inválidos o ya existe.

---

### GET `/api/categories`
Devuelve todas las categorías del usuario.

---

### GET `/api/categories/:id`
Devuelve una categoría por su ID.

---

### PUT `/api/categories/:id`
Actualiza una categoría.

- **Body**:
```json
{
  "name": "Transporte",
  "type": "expense"
}
```

---

### DELETE `/api/categories/:id`
Elimina una categoría por ID.

---

## 💸 Transacciones

### POST `/api/transactions`
Crea una nueva transacción.

- **Body**:
```json
{
  "amount": 100,
  "description": "Pago de luz",
  "account": "id_cuenta",
  "category": "id_categoria",
  "date": "2025-05-20"
}
```

---

### GET `/api/transactions`
Lista todas las transacciones del usuario.

---

### GET `/api/transactions/:id`
Obtiene una transacción por ID.

---

### PUT `/api/transactions/:id`
Edita una transacción existente.

---

### DELETE `/api/transactions/:id`
Elimina una transacción.

---

## ✅ Autenticación requerida

Recordá que todas las rutas (excepto `/auth`) requieren que se envíe el token JWT en el header:

```
Authorization: Bearer <tu_token>
```

---

### 🔧 Errores comunes

- `401 Unauthorized`: Token faltante o inválido.
- `404 Not Found`: Recurso no encontrado.
- `400 Bad Request`: Datos incorrectos.

---

## 🧪 Estado del proyecto

✅ Auth  
✅ Accounts  
✅ Categories  
✅ Transactions  

---

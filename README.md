## Semana 5 - Autenticación

En esta semana se implementó autenticación de usuarios con JWT.

 Funcionalidades agregadas
- Registro de usuarios
- Login de usuarios
- Middleware de autorización en backend
- Envío de token JWT desde frontend al backend
- Protección de la creación de hábitos
- Páginas de frontend para registro y login

Rutas del frontend
- `/register` → registro de usuario
- `/login` → inicio de sesión

Rutas del backend
- `POST /api/users/register` → registrar usuario
- `POST /api/users/login` → iniciar sesión
- `POST /habits` → crear hábito protegido con token

 Uso del token
Después de iniciar sesión, el backend devuelve un token JWT.

Ese token se envía en el header:

Authorization: Bearer TU_TOKEN

### Flujo de uso
1. Registrar usuario en `/register`
2. Iniciar sesión en `/login`
3. El token se guarda en el frontend
4. Crear hábitos desde la página principal
5. El frontend envía el token al backend para autorizar la acción
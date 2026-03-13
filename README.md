# backend_user_base
Documentación del Proyecto: Backend Profesional con Node.js & Sequelize
Este proyecto implementa una arquitectura de capas (Routing -> Controller -> Model) utilizando ES Modules, garantizando un código limpio, seguro y fácil de escalar.

🛠️ Tecnologías Principales
Express: Framework para el servidor web.

Sequelize (ORM): Gestión de base de datos PostgreSQL sin escribir SQL manual.

JWT (JSON Web Token): Autenticación basada en tokens.

Bcrypt: Encriptación de contraseñas.

Helmet & CORS: Seguridad de cabeceras y control de acceso.

🏗️ Estructura del Proyecto
Plaintext
/src
├── /config        # Configuración de base de datos (Sequelize)
├── /controllers   # Lógica de negocio (procesamiento de datos)
├── /middlewares   # Filtros de seguridad (verificación de JWT)
├── /models        # Definición de tablas y esquemas
├── /routes        # Definición de rutas y endpoints
└── index.js       # Punto de arranque del servidor

📝 Detalle de los Archivos
1. Conexión a la DB (src/config/database.js)
Centraliza la conexión con PostgreSQL. Detecta automáticamente si debe usar SSL (necesario para la nube como Render o AWS).
![alt text](image-2.png)

npm install express pg pg-hstore sequelize dotenv cors helmet jsonwebtoken bcrypt

2. El Modelo de Usuario (src/models/userModel.js)
Define la estructura de la tabla usuarios. Sequelize crea la tabla automáticamente si no existe en la base de datos.
![alt text](image-1.png)

PORT=3000
POSTGRES_URL=postgres://postgres:root@localhost:5432/tu_base_de_datos
JWT_SECRET=tu_palabra_secreta_aqui
NODE_ENV=development

3. El Controlador (src/controllers/userController.js)
Contiene las funciones de Register (encripta con Bcrypt) y Login (genera el JWT). Separa la lógica de la respuesta HTTP.

![D](image.png)

4. Middleware de Seguridad (src/middlewares/authMiddleware.js)
Interecta las peticiones a rutas protegidas. Si el token enviado en el header Authorization no es válido, bloquea el acceso.

🚀 Instalación y Uso
Instalar dependencias:

Bash
npm install express pg pg-hstore sequelize dotenv cors helmet jsonwebtoken bcrypt
Configurar el archivo .env:
Crea un archivo llamado .env en la raíz con el siguiente contenido:

Fragmento de código
PORT=3000
POSTGRES_URL=postgres://postgres:root@localhost:5432/tu_base_de_datos
JWT_SECRET=tu_palabra_secreta_aqui
NODE_ENV=development
Ejecutar el servidor:

Bash
node src/index.js
🔒 Seguridad Implementada
Passwords: Nunca se guardan en texto plano. Se usa un hash mediante bcrypt.hash().

Headers: helmet oculta información del servidor que los hackers podrían usar.

Rutas: El acceso a /api/users/profile requiere un token válido obtenido tras el login.

¿Cómo probarlo?
Registro: Envía un POST a /api/users/register con nombre, email y password.

Login: Envía un POST a /api/users/login. Recibirás un token.

Rutas Protegidas: Envía un GET incluyendo el header Authorization: Bearer <tu_token>.
# Proyecto de Gestión de Usuarios BackEnd

Este es el backend para el proyecto de gestión de usuarios, desarrollado con Node.js, Express y Sequelize. 
  Permite la autenticación de usuarios, la gestión de perfiles, y la creación de publicaciones.


## Características

- Registro y autenticación de usuarios utilizando JSON Web Tokens (JWT).
- Encriptación de contraseñas con bcrypt.
- API RESTful para la gestión de usuarios y publicaciones.
- Soporte para operaciones CRUD en usuarios.

## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución de JavaScript.
- **Express**: Framework para aplicaciones web en Node.js.
- **Sequelize**: ORM para bases de datos SQL.
- **MySQL**: Sistema de gestión de bases de datos.
- **Bcrypt**: Librería para encriptar contraseñas.
- **JSON Web Tokens (JWT)**: Para la autenticación de usuarios.

## Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/laloooxx/ProyectUsersBackend.git
   cd ProyectUsersBackend
   npm install
   npm run start

## Uso
La API está disponible en http://localhost:3000. Puedes utilizar herramientas como Postman o Insomnia para probar las diferentes rutas de la API, incluyendo:

POST /api/auth/login: Inicia sesión y devuelve un token.
POST /api/auth/register: Registra un nuevo usuario.
GET /api/users: Obtiene la lista de usuarios.
GET /api/users/
: Obtiene un usuario por ID.
PUT /api/users/
: Actualiza un usuario existente.
DELETE /api/users/
: Elimina un usuario.


## Estructura del proyecto
ProyectUsersBackend/
├── config/            # Configuraciones del entorno y de la base de datos
├── controllers/       # Controladores para manejar las solicitudes
├── middleware/        # Middleware para autenticación
├── models/            # Modelos de datos utilizando Sequelize
├── routes/            # Definición de rutas de la API
├── .env               # Archivo de configuración de variables de entorno
├── package.json       # Dependencias y scripts del proyecto
└── server.js          # Archivo principal para iniciar el servidor


## Contribución
Las contribuciones son bienvenidas. Si deseas contribuir, por favor abre un issue o envía un pull request.


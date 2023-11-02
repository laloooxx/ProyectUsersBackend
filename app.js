const Server = require('./models/server');
const sequelize = require('./config/database');

const server = new Server();

sequelize.authenticate()
    .then(() =>{
        console.log('Conexion a la base de datos correctamente')

        server.listen();
    })
    .catch((error) => {
        console.error('Error al conectarse a la base de datos: ',error);
    })

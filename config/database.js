//aca va la conexion a la base de datos
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    //los valores de la base de datos va a ir aca
    process.env.DB_DATABASE,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        port: process.env.DB_PORT
    }
); 

//siempre exportar la base de datos para poder usarla en el proyecto!!!!!!!
module.exports = sequelize;
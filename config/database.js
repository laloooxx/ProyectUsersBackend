//aca va la conexion a la base de datos
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    //los valores de la base de datos va a ir aca
    'tpFinal',
    'root',
    '',
    {
        host: 'localhost',
        dialect: 'mysql',
        port: 3306
    }
); 

//siempre exportar la base de datos para poder usarla en el proyecto!!!!!!!
module.exports = sequelize;
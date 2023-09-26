
const { Model, DataTypes } = require('sequelize');
const sequelize  = require('../config/database');


class Publicaciones extends Model{}


Publicaciones.init({
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,

    },
    fecha:{
        type: DataTypes.DATE,

    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull: true
    },
    ubicacion:{
        type: DataTypes.STRING,
        allowNull: false
    },
    horas:{
        type: DataTypes.TIME,
        allowNull: true
    },
    imagen: {
        type: DataTypes.STRING
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User',
            key: 'id'
        }
    }
    },
    {
        sequelize,
        modelName: 'Publicaciones'
    },
);



// Publicaciones.sync()
//     .then( ()=> {
//         console.log("Tabla publicaciones creada correctamente")})
//     .catch((error) => {
//         console.log("Error en crear la tabla publicaciones", error)
//     });

module.exports = Publicaciones;
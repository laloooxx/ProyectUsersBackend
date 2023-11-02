
const { Model, DataTypes } = require('sequelize');
const sequelize  = require('../config/database');

/**
 * Creamos tablas con sequelize extendiendo de Model, con sus campos de las tablas
 */
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
        allowNull: false,
        foreignKey: 'userId'
    }
    },
    {
        sequelize,
        modelName: 'Publicaciones'
    },
);

//Sincronizamos la tabla creada con la base de datos q creamos y ya sincronizamos con el proyecto

Publicaciones.sync();


module.exports = Publicaciones;
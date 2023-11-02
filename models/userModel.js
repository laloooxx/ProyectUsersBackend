//el model depende de la documentacion si lo traemos o no, aplicamos lo q es herencia de sequelize la ventaja de trbajar asi es q podemos crear clases y el datatypes es para defniir q tipo son los campos
const { Model, DataTypes } = require('sequelize');
const sequelize  = require('../config/database');
const Publicaciones = require('./publicacionesModel');


/**
 * Creamos tablas con sequelize extendiendo de Model, con sus campos de las tablas
 */

class User extends Model{}

User.init({
    //indicamos los valores de los campos
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
    },
    {
        sequelize, 
        modelName: 'User'
    });


    /**
     * Creamos las relaciones con la tabla publicaciones con las funciones de sequelize
     *  Y sincronizamos la tabla creada con la base de datos q creamos con la funcion Sync y ya sincronizada con el proyecto 
     */
Publicaciones.belongsTo(User, {
    foreignKey: 'userId',
});
User.hasMany(Publicaciones, {
    foreignKey: 'userId',
});


User.sync();

module.exports = User;
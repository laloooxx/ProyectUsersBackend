//el model depende de la documentacion si lo traemos o no, aplicamos lo q es herencia de sequelize la ventaja de trbajar asi es q podemos crear clases y el datatypes es para defniir q tipo son los campos
const { Model, DataTypes } = require('sequelize');
const sequelize  = require('../config/database');
const Publicaciones = require('./publicacionesModel');

class User extends Model{}

User.init({
    //indicamos los valores de los campos
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    } ,
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

    User.hasMany(Publicaciones, {foreignKey: 'userId'});
    Publicaciones.belongsTo(User);

User.sync()
    .then(() =>{
        console.log('Tabla usuarios creada correctamente')})
    .catch((error) =>{
        console.log('Error al crear la tabla usuarios', error)
    });

module.exports = { User, Publicaciones };
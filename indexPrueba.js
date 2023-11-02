/**
 * importamos los respectivos middlewares y cosas q vamos a utilizar en nuestro componente principal de nuestra API
 */
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const responseTime = require('response-time');
const redis = ('redis')
const redisClient = require('./services/cache');


const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const publicacionesRoutes = require('./routes/publicacionesRoutes');
const User = require('./models/userModel');
const Publicaciones = require('./models/publicacionesModel')




//configuracion de la base de datos:

sequelize.authenticate()
//auntenticamos la conexion, con el then q es una promesa mostramos en consola 
.then(() => {
    console.log('conexion exitosa a la base de datos')
})
.catch((error) => {
    console.error('Conexion a la base de datos erronea: ', error)
});



//llamamos a los middlewares
app.use(cors());
app.use(morgan());
app.use(express.json());
app.use(responseTime());



//configuramos la ruta
app.use('/api', userRoutes);
app.use('/api', publicacionesRoutes);

//iniciamos el servidor
const PORT = 3000;
app.listen(PORT, () =>console.log('Servidor corriendo en puerto 3000'))
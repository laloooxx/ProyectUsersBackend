const User = require('../models/userModel');
const sequelize  = require('../config/database');
const redisClient = require('../services/cache');
const bcrypt = require('bcrypt');



exports.getAllUsers = async (req, res) => {

    try {
        //aca recibimos todos los usuarios como un objeto json para poder hacer lo q queramos
        const users = await User.findAll();

        res.status(200).json({
            ok: true,
            users
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error del servidor'
        })
    }
};


exports.getUserById = async (req, res) => {
    /**
     * creamos una constante para almacenar el id q requerimos del parametro par luego filtrar x ese id y devolverlo
     */
    
    const id = req.params.id;

    try {
        const user = await User.findByPk(id);
        
        if (user) {
        res.status(200).json({
            ok: true,
            user
        });
    } else {
        res.status(404).json({
            ok: false,
            msg: 'Usuario no encontrado'
        });
    }
    } catch (error) {
        console.log(error);

        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        });
    }
};


exports.createUser = async (req, res) => {

    /**
     * almacenamos en un objeto de valores lo q requerimos del body para crear un usuario con el comando create de sequelize y devolvemos la respectiva respuesta
     */
    try {

        const {username, password, email} = req.body;
        //encriptamos la contraseña
        // const passwordHash = await bcrypt.hash(password, 10);

        userExiste = await User.findOne({where: {username: username}});
        if (userExiste) {
            console.error(`El usuario ${username} ya existe`)
            return res.status(403).json({
                msg: 'El usuario ya existe'
            })
        };


        emailExiste = await User.findOne({where: {email: email}})
        if (emailExiste) {
            console.error(`El email ${email} ya existe`);
            return res.status(403).json({
                msg: 'El email ya existe'
            })
        };
        const user = await User.create({
            username, 
            password,
            // password: passwordHash, 
            email
        });

        res.status(201).json({
            ok: true,
            id: user.id,
            username: user.username,
            email: user.email
        });
        console.log(user);
    } catch (error) {
        console.error('error al procesar la solicitud', error);
        res.status(500).json({
            msg: 'Error del servidor',
            error: error.message
        })
    }
};




exports.deleteUserById = async (req, res) => {
    /**
     * creamos una constante para almacenar el id q requerimos del parametro par luego filtrar x ese id
     */
    const id = req.params.id;

    try {
        const userId = await User.findByPk(id);

        // Verificamos si el usuario existe
        if (!userId) {
            res.status(404).json({
                success: false,
                msg: `No se encontró el usuario con el id: ${id}`
            });
            return;
        }

        // Intentamos eliminar el usuario

        await userId.destroy();
        // Eliminamos el usuario correctamente
        res.status(200).json({
            success: true,
            msg: 'Usuario eliminado correctamente'
        });
    } catch (error) {
        // Manejamos el error
        res.status(500).json({
            ok: false,
            msg: 'Error del servidor',
            error
        });
    }
};


exports.updateUserById = async (req, res) => {
    /**
     * creamos una constante para almacenar el id q requerimos del parametro
     * almacenamos lo q requerimos del body q son el username,password y email para actualizar el usuario
     */
    const userId = req.params.id;

    const { username, password, email} = req.body;


    existeUsuario = await User.findOne({where: {username: username}});
    existeEmail = await User.findOne({where: {email: email}})

    if (existeUsuario) {
        console.error(`El usuario ${username} ya existe`)
        return res.status(408).json({
            msg: 'El usuario ya existe'
        })
    };
    if (existeEmail) {
        console.error(`El email ${email} ya existe`);
        return res.status(403).json({msg: 'El email ya existe'})
    };
    /**
     * creamos un trycatch para ir a la base de datos a buscar x el id q requerimos anteriomente y almacenamos en una variable user.
     * Preguntamos si ese user esta vacio para devolver un error si es asi, guardamos los valores q trajimos en la bd y mandamos la respuesta.
     */
    try {
    const user = await User.findByPk(userId);
    

    if(!user) return res.status(404).json({ msg: 'Usuario no encontrado' });


    user.username = username;
    user.password = password;
    user.email = email;

    await user.save();

    res.status(200).json({
        ok: true,
        user})
    } catch (error) {
        res.status(501).json({
            msg: 'Error del servidor'
         })
    }
};


exports.getWithRedis = async (req, res) => {
    console.log('ingresamos a la funcion');
    
    try {
        //voy a buscar a la cache si tiene el valor cursos y devuelvo (si existe en la cache) todo lo q tenga
        const getResultRedis = await redisClient.get('juanUser');
        console.log('ingresamos al try');
        if (getResultRedis) {
            return res.status(200).json({ 
                data: JSON.parse(getResultRedis)
            })
            console.log('Usuarios almacenados en cache correctamente')
        };
        console.log('fallo de cache');

        //si no obtenemos nada del cache, buscamos en nuestra base de datos los usuarios y los almacenamos en el cache ahora si, para cuando vuelva a hacer la peticion ya quede almcenada en el cache
        const response = await User.findAll();
        const saveResultRedis = await redisClient.set('juanUser', JSON.stringify(response));
        console.log('nueva data de cache');
        return res.status(200).json({
            data: response
        })
    } catch (error) {
        console.error('error accediendo a los datos');
        res.status(500).json({
            error,
            msg: 'error accediendo a los datos'
        });
    }
};

const User = require('../models/userModel');
const sequelize  = require('../config/database');


exports.getAllUsers = async (req, res) => {

    try {
        //aca recibimos todos los usuarios como un objeto json para poder hacer lo q queramos
        const users = await User.User.findAll()

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


exports.createUser = async (req, res) => {
    try {
        const {username, password, email} = req.body;
        const user = await User.User.create({username, password, email});

        res.status(201).json({
            ok: true,
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error del servidor'
        })
    }
};

// exports.deleteUserById = async (req, res) => {
    
//     const id = req.params.id;

//     try {
//         const userId = await User.findByPk(id);
        
        
//         if (!userId) {
//             res.status(402).json({
//                 success: false,
//                 msg: `No se encontró el usuario con el id: ${id} o no ha ingresado correctamente los campos`
//             })
//         } else {
//             await User.destroy({
//                 where: { id: userId }
//             });
//             res.status(200).json ({
//                 success: true,
//                 msg: 'Usuario eliminado correctamente'
//             })
//         }
           
//     } catch (error) {
//         res.status(500).json({
//             ok: false,
//             msg: 'Error del servidor', 
//             error
//         });
//     }
// };



exports.deleteUserById = async (req, res) => {
    const id = req.params.id;

    try {
        const userId = await User.User.findByPk(id);

        // Verificamos si el usuario existe
        if (!userId) {
            res.status(404).json({
                success: false,
                msg: `No se encontró el usuario con el id: ${id}`
            });
            return;
        }

        // Intentamos eliminar el usuario
        try {
            await User.User.destroy({
                where: { id: userId }
            });
        } catch (error) {
            // El usuario tiene relaciones con otras tablas
            res.status(500).json({
                ok: false,
                msg: 'Error al eliminar el usuario',
                error
            });
            return;
        }

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
    const userId = req.params.id;


    const { username, password, email} = req.body;
    console.log(username, password, email);
    try {
    const user = await User.User.findByPk(userId);
    console.log(user);
    
    if(!user) return res.status(404).json({ msg: 'Usuario no encontrado' });

    user.username = username;
    user.password = password;
    user.email = email;

    await user.save();

    res.status(200).json({
        ok: true,
        user})
    } catch (error) {
        res.status(500).json({
            msg: 'Error del servidor'
         })
    }
};
const User = require('../models/userModel');
const Post = require('../models/publicacionesModel');
const sequelize = require('../config/database');
const Publicaciones = require('../models/publicacionesModel');

exports.getPosts = async(req, res) => {

    const idUser = req.params.id;

    try {
        const user = await User.findByPk(idUser);
        if (!user) return res.status(404).json({ msg: `No existe el usuario con el id: ${idUser}`})


        const posts = await Publicaciones.findAll({
            where: {
                userId: idUser
            }
        });

        res.status(200).json({
            succes: true,
            msg: `El usuario ${user.username} tiene estas publicaciones`,
            posts
        });
    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: 'Ocurrió un error inesperado al obtener los datos'
        })
        console.log(error);
    }
};
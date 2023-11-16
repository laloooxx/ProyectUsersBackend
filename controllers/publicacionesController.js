const Publicaciones = require('../models/publicacionesModel');

exports.getPublicaciones = async (req, res) => {

    try {
        const publicaciones = await Publicaciones.findAll();

        res.status(200).json({
            succes: true,
            publicaciones
        })
    } catch (error) {
        res.status(500).json({
            msg: 'Error del servidor'
        })
    }
};


exports.getPublicacionesById = async (req, res) => {
    const postId = req.params.id;

    try {
        const posts = await Publicaciones.findByPk(postId);

        res.status(200).json({
            success: true,
            posts
        })
    } catch (error) {
        res.status(500).json({
            succes: false,
            error: error.message
        });
    }
};


exports.createPublicacion = async(req, res) => {

    /**
     * almacenamos en un objeto de valores lo q requerimos del body para crear un usuario con el comando create de sequelize y devolvemos la respectiva respuesta
     */
    
    try {
        
        const { fecha, descripcion, ubicacion, horas, imagen, userId } = req.body;
        const publicaciones = await Publicaciones.create({ fecha, descripcion, ubicacion, horas, imagen, userId })

        res.status(200).json({
            success: true,
            publicaciones
        });
    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: 'Error del servidor'
        })
        console.log(error);
    }
};



exports.UpdatePublicacion = async(req, res) => {

    /**
     * creamos una constante para almacenar el id q requerimos del parametro
     * almacenamos lo q requerimos del body q son el fecha, descripcion, ubicacion, horas, imagen, userId para actualizar el post
     */

    const idPublic = req.params.id;

    const { fecha, descripcion, ubicacion, horas, imagen, userId } = req.body;

    /**
     * creamos un trycatch para ir a la base de datos a buscar x el id q requerimos anteriomente y almacenamos en una variable publicaciones.
     * Preguntamos si ese user esta vacio para devolver un error si es asi, guardamos los valores q traimos en la bd y mandamos la respectiva respuesta.
     */

    try {
        const publicaciones = await Publicaciones.findByPk(idPublic);

    if(!publicaciones) return res.status(404).json({ msg: 'Publicacion no encontrada' });

    publicaciones.fecha = fecha;
    publicaciones.descripcion = descripcion;
    publicaciones.ubicacion = ubicacion;
    publicaciones.horas = horas;
    publicaciones.imagen = imagen;
    publicaciones.userId = userId;

    await publicaciones.save();
    
    res.status(200).json({
        success: true,
        publicaciones
    });

    } catch (error) {
       res.status(500).json({
        succes: false,
        msg: 'Error del servidor'
       }); 
    }
};



exports.deletePublicaciones = async(req, res) => {

    /**
     * creamos una variable q requerimos x el id del parametro para despues filtrar x ese id q obtuvimos y consultar si
     * el id existe devolviendo su respectivo error.
     * Luego si encontro algo cuando filtramos eliminamos la publicacion con el metodo destroy de sequelize y devolvemos
     * la respuesta
     */
    const idPublic = req.params.id;

    try {
        const publicacionesid = await Publicaciones.findByPk(idPublic);
        
        if (!idPublic) {
            res.status(404).json({
                succes: false,
                msg: `No se encontró la publicacion con el id: ${idPublic}`
            })
            return;
        }

        await publicacionesid.destroy();
        res.status(200).json({
                succes: true,
                msg: 'Publicacion eliminada correctamente'
            });
 
    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: 'Error del servidor',
        });
        console.log(error);
    }
};
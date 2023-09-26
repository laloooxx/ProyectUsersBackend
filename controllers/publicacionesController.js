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


exports.createPublicacion = async(req, res) => {

    try {
        
        const { fecha, descripcion, ubicacion, horas, imagen } = req.body;
        const publicaciones = await Publicaciones.create({ fecha, descripcion, ubicacion, horas, imagen })

        res.status(200).json({
            success: true,
            publicaciones
        });
    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: 'Error del servidor'
        })
    }
};



exports.UpdatePublicacion = async(req, res) => {

    const idPublic = req.params.id;

    const { fecha, descripcion, ubicacion, horas, imagen } = req.body;

    try {
        const publicaciones = await Publicaciones.findByPk(idPublic);

    if(!publicaciones) return res.status(404).json({ msg: 'Publicacion no encontrada' });

    publicaciones.fecha = fecha;
    publicaciones.descripcion = descripcion;
    publicaciones.ubicacion = ubicacion;
    publicaciones.horas = horas;
    publicaciones.imagen = imagen;

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

    const idPublic = req.params.id;

    try {
        const publicaciones = await Publicaciones.findByPk(idPublic);
        
        if (!idPublic) {
            res.status(404).json({
                succes: false,
                msg: `No se encontró la publicacion con el id: ${idPublic}`
            })
            return;
        }

        try {
            await Publicaciones.destroy({
                where: {id: idPublic }
            })
        } catch (error) {
            console.error(error);
            res.status(404).json({
                msg: 'Error del cliente al intentar eliminar la publicacion'
            })
        };
    } catch (error) {
        res.status(500).json({
            succes: false,
            msg: 'Error del servidor'
        });
    }
};
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({msg: 'Todos los campos son requeridos'})
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) { return res.status(401).json({ msg: 'Credenciales incorrectas' }) };
        

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ msg: 'Contraseña incorrecta' })


        const token =
            jwt.sign({
                id: user.id, email
            },
                process.env.JWT_SEED, {
                expiresIn: '5h'
            });


        return res.status(200).json({
            ok: true,
            name: user.username,
            email: user.email,
            token
        })


    } catch (error) {
        console.error('Error al iniciar sesión', error);
        res.status(500).json({
            ok: false,
            msg: 'Error del servidor',
            error: error.message
        })
        console.error(error);
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

        userExiste = await User.findOne({where: { username }});
        if (userExiste) {
            return res.status(400).json({
                msg: 'El usuario ya existe'
            })
        };


        emailExiste = await User.findOne({where: { email }})
        if (emailExiste) {
            return res.status(403).json({
                msg: 'El email ya existe'
            })
        };

        if (!username || !password || !email) {
            return res.status(400).json({ msg: 'Todos los campos son requeridos' });
          }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        const user = await User.create({
            username, 
            password: passwordHash,
            email
        });

        res.status(201).json({
            ok: true,
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
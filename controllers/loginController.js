const User = require('../models/userModel');
const sequelize = require('../config/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await User.findOne({
            where: {
                email: email
            }
        });


        if (!result) return res.status(401).json({msg: 'Credenciales incorrectas'})
        
        const isPasswordValid = await bcrypt.compare(password, User.password);
        if (!isPasswordValid) return res.status(401).json({msg: 'Credenciales incorrectas'})

        
        const token = jwt.sign({email}, 'secretito_secretin', {
            expiresIn: '3m'
        });
            console.log(token);
            res.json({ token });        
    } catch (error) {
        res.status(505).json({
            ok:false,
            msg: 'Error del servidor'
        })
        console.error(error);
    }
};
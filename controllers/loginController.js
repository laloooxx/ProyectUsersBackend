const User = require('../models/userModel');
const sequelize = require('../config/database');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await User.findOne({ where: { email: email }});

        if (!result) {return res.status(401).json({msg: 'Credenciales incorrectas'})};
        
        
        // const isPasswordValid = await bcrypt.compare(password, result.password);
        // if (!isPasswordValid) return res.status(401).json({msg: 'Contraseña incorrecta'})
        

        if (password != result.password) return res.status(300).json({msg: 'Las contraseñas son distintas'})
        console.log(password+'/' + result.password);
    


        if (result){
            const token = jwt.sign({id: result.id, email}, 'secretito_secretin', {
                expiresIn: '3m'
            });

            console.log(token);
            return res.status(200).json({
                ok:true,
                token
            })

        } else {
            return res.status(401).json({msg: 'Credenciales incorrectas'})
        }
        

        } catch (error) {
        res.status(505).json({
            ok:false,
            msg: 'Error del servidor'+error.message
        })
        console.error(error);
    }
};
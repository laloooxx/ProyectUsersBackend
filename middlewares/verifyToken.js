const jwt = require('jsonwebtoken');

function verifyToken (req, res, next) {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ msg: 'Token no proporcionado'});

    jwt.verify(token, 'secretito_secretin', (err, decoded) => {
        if (err) return res.status(401).json({ msg:'Token no valido'})
    
        req.id = decoded.id;
        next();
    });
};

module.exports = verifyToken;
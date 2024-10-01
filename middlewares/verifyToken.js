const jwt = require('jsonwebtoken');

async function verifyToken (req, res, next) {
    const token = await req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ msg: 'Token no proporcionado'});

    jwt.verify(token, process.env.JWT_SEED, (err, decoded) => {

        if (err) return res.status(401).json({ msg:'Token no valido'})
    
        req.id = decoded.id;
        next();
    });
};

module.exports = verifyToken;
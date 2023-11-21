const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const responseTime = require('response-time');
const login = require('../routes/loginRoutes');
const verifyToken = require('../middlewares/verifyToken');

class Server {
    constructor() {
        this.app = express();
        this.port = 3000;
        this.middlewares();
        this.routes();
    };

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(morgan());
        this.app.use(responseTime());
    };

    routes() {
        const userRoutes = require('../routes/userRoutes');
        const publicacionesRoutes = require('../routes/publicacionesRoutes');
        const userPostsRoutes = require('../routes/userPostRoutes');

        this.app.use('/users', userRoutes);
        this.app.use('/publicaciones', publicacionesRoutes);
        this.app.use('/login', login);
        this.app.use('/users-publicaciones', userPostsRoutes);
        this.app.use('/protected', verifyToken)
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        });
    }
}
module.exports = Server;
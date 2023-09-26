const  { User } = require('../models/userModel');
const   {Publicaciones}  = require('../models/userModel');


User.hasMany(Publicaciones, {foreignKey: 'user_id'});
Publicaciones.belongsTo(User, {foreignKey: "user_id"});


module.exports = {
    User,
    Publicaciones
}

const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    name:{
        type     : String,
        required : [true, 'El nombre es obligatorio']
    },

    email:{
        type     : String,
        required : [true, 'El correo es obligotorio'],
        unique   : true
    },

    password:{
        type     : String,
        required : [true, 'La contrasena es obligatoria'],
    },

    img:{
        type: String
    },

    role: {
        type     : String,
        required : true,
        enum     : ['ADMIN_ROLE', 'USER_ROLE']
    },

    state:{
        type    : Boolean,
        default : true
    },

    google:{
        type    : Boolean,
        default : false,
    }

});


module.exports = model('User', UsuarioSchema);
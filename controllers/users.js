const { response } = require('express');
const bcryptjs     = require('bcryptjs');
const User         = require('../models/user');

const usersGet = (req = request, res = response) => {

    const { q, nombre="no name", apiKey, page=1, limit } = req.query;

    res.json({
        "msg":"get API - controller",
        q, 
        nombre,
        apiKey
    });
}


const usersPost = async(req, res = response) => {

    const { name, email, password, role } = req.body;
    const usuario = new User({ name, email, password, role });

    //verificar si el correo existe
    const existeEmail = await User.findOne({ email });
    if( existeEmail ) {
        return res.status(400).json({
            msg: 'Ese correo ya esta registrado'
        });
    }

    //encriptar la contrasena
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    //guardar en bd
    await usuario.save();

    res.json({
        usuario
    });
}


const usersPut = (req, res = response) => {

    const { id } = req.params;

    res.json({
        "msg":"put API - controller",
        id
    });
}


const userPatch = (req, res = response) => {
    res.json({
        "msg":"patch API - controller"
    });
}


const usersDelete = (req, res = response) => {
    res.json({
        "msg":"delete API - controller"
    });
}


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    userPatch,
    usersDelete
}
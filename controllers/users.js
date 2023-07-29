const { response } = require('express');
const bcryptjs     = require('bcryptjs');
const User         = require('../models/user');

const usersGet = async(req, res = response) => {

    const { limit=10, from=0 } = req.query;
    const query = { state: true }

    // const total = users.length;

    const [total, users ] = await Promise.all([
        User.count(query),
        User.find(query)
        .skip(Number(from))
        .limit(Number(limit))
    ]);

    res.json({ total, users });
}


const usersPost = async(req, res = response) => {

    const { name, email, password, role } = req.body;
    const usuario = new User({ name, email, password, role });

    //encriptar la contrasena
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    //guardar en bd
    await usuario.save();

    res.json({
        usuario
    });
}


const usersPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, ...resto } = req.body;

    if( password ){
        //encriptar la contrasena
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );
    }

    const usuario = await User.findByIdAndUpdate( id, resto );

    res.json({ usuario });
}


const userPatch = (req, res = response) => {
    res.json({
        "msg":"patch API - controller"
    });
}


const usersDelete = async(req, res = response) => {

    const { id } = req.params;

    //borrado fisico
    // const usuario = await User.findByIdAndDelete( id );

    //borrado logico
    const usuario = await User.findByIdAndUpdate( id, { state:false });

    res.json(usuario);
}


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    userPatch,
    usersDelete
}

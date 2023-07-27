const { response } = require('express');

const usersGet = (req = request, res = response) => {

    const { q, nombre="no name", apiKey, page=1, limit } = req.query;

    res.json({
        "msg":"get API - controller",
        q, 
        nombre,
        apiKey
    });
}

const usersPost = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.json({
        "msg":"post API - controller",
        nombre, edad
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
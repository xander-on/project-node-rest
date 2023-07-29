const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async( role='' ) => {
    const existsRole = await Role.findOne({ role });
    if( !existsRole )
        throw new Error(`El rol ${ role } no esta registrado en la BD`);
}


const emailExiste = async( email = '' ) => {
    const existeEmail = await User.findOne({ email });
    if( existeEmail )
        throw new Error(`El eamil: ${ email }, ya esta registrado`);
}


const existsUserById = async( id ) => {
    const existsUser = await User.findById(id);
    if( !existsUser )
        throw new Error(`El id: ${ id }, no existe`);
}

module.exports = {
    isValidRole,
    emailExiste,
    existsUserById
}
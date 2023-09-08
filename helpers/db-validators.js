const { User, Role, Category, Product } = require('../models');


const isValidRole = async( role='' ) => {
    const existsRole = await Role.findOne({ role });
    if( !existsRole )
        throw new Error(`El rol '${ role }' no esta registrado en la BD`);
}


const isValidRolePost= async( role='' ) => {
    if(role !== '') {
        const existsRole = await Role.findOne({ role });
        if( !existsRole )
            throw new Error(`El rol '${ role }' no esta registrado en la BD`);
    };
    if( role === 'ADMIN_ROLE' )
        throw new Error(`No se puede registrar con el rol: 'ADMIN_ROLE'`);
}


const emailExiste = async( email = '' ) => {
    const existeEmail = await User.findOne({ email });
    if( existeEmail )
        throw new Error(`El eamil: ${ email }, ya esta registrado`);
}


const existsUserById = async( id ) => {
    const existsUser = await User.findById(id);
    if( !existsUser ) throw new Error(`El id: ${ id }, no existe`);
}


/**
 * Validadores de categoria
*/

const existsCategoryById = async( id ) => {
    //verificar si el correo existe
    const existsCategory = await Category.findById( id );
    if( !existsCategory ) throw new Error(`El id no existe ${ id }`);
}


/**
 * Validadores de productos
 */
const existsProductById = async( id ) => {
    const existsProduct = await Product.findById( id );
    if( !existsProduct ) throw new Error(`El id no existe ${ id }`);
}


const existsProductName = async( name='' ) => {
    const existsName = await Product.findOne({ name:name.toUpperCase() });
    if( existsName )
        throw new Error(`El nombre: ${ name }, ya esta registrado`);
}



const collectionsAllowed = ( collection ='', collections=[] ) => {

    const includesCollection = collections.includes( collection );
    if( !includesCollection ){
        throw new Error( `La colección ${ collection } no es permitida, ${ collections}`);
    }

    return true;
}

module.exports = {
    isValidRole,
    emailExiste,
    existsUserById,
    isValidRolePost,
    existsCategoryById,
    existsProductById,
    existsProductName,
    collectionsAllowed
}

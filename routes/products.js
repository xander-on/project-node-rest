const { Router } = require('express');
const { check }  = require('express-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares/');
const {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct} = require('../controllers/products');

const {
    existsCategoryById,
    existsProductById,
    existsProductName } = require('../helpers/db-validators');


const router = Router();


const validatePostProduct = [
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('name').custom( existsProductName ),
    check('category', 'No es un id de mongo').isMongoId(),
    check('category').custom(existsCategoryById),
    validarCampos
];


const validateGetProductById = [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existsProductById ),
    validarCampos
];


const validatePutProduct = [
    validarJWT,
    check('id', 'No es un id de Mongo').isMongoId(),
    check('id').custom( existsProductById ),
    validarCampos
];


const validateDeleteProduct = [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existsProductById ),
    validarCampos
]

/**
 * {{url}}/api/categorias
 */

//obtener todas las categorias - publico
router.get('/', getProducts);

//obtener una category por id -publico
router.get('/:id', validateGetProductById, getProductById);

//crear categoria - privado - cualquier persona con un token valido
router.post('/', validatePostProduct, createProduct);

//Actualizar - privado - cualquiera con token valido
router.put('/:id', validatePutProduct, updateProduct);

// Borrar una categoria - Admin
router.delete('/:id', validateDeleteProduct, deleteProduct);

module.exports = router;

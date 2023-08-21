const { Router } = require('express');
const { check }  = require('express-validator');
const { validarJWT, validarCampos, esAdminRole } = require('../middlewares/');
const {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory} = require('../controllers/categories');
const { existsCategoryById } = require('../helpers/db-validators');


const router = Router();


const validatePostCategories = [
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
];


const validateGetCategory = [
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existsCategoryById ),
    validarCampos
];


const validatePutCategory = [
    validarJWT,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom( existsCategoryById ),
    validarCampos
];


const validateDeleteCategory = [
    validarJWT,
    esAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( existsCategoryById ),
    validarCampos
]

/**
 * {{url}}/api/categorias
 */

//obtener todas las categorias - publico
router.get('/', getCategories);


//obtener una category por id -publico
router.get('/:id', validateGetCategory, getCategoryById);


//crear categoria - privado - cualquier persona con un token valido
router.post('/', validatePostCategories, createCategory);


//Actualizar - privado - cualquiera con token valido
router.put('/:id', validatePutCategory, updateCategory);


// Borrar una categoria - Admin
router.delete('/:id', validateDeleteCategory, deleteCategory);



module.exports = router;

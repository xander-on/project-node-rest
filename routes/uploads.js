const { Router }        = require('express');
const { check }         = require('express-validator');
const { loadFile, showImage, updateImageCloudinary } = require('../controllers/uploads');
const { collectionsAllowed }    = require('../helpers/db-validators');
const { validarCampos, validateFile } = require('../middlewares');


const router = Router();

const validatorsPutUploads = [
    validateFile,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('collection').custom( c => collectionsAllowed( c, ['users', 'products']) ),
    validarCampos
];


const validatorsGetUploads = [
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('collection').custom( c => collectionsAllowed( c, ['users', 'products']) ),
    validarCampos
];

router.post('/',               validateFile, loadFile );
router.put('/:collection/:id', validatorsPutUploads, updateImageCloudinary );
router.get('/:collection/:id', validatorsGetUploads, showImage);

module.exports = router;

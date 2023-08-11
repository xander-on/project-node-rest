const { Router } = require('express');
const { login, googleSignIn } = require('../controllers/auth');
const { check }               = require('express-validator');
const { validarCampos }       = require('../middlewares/validar-campos');


const router = Router();

const loginValidators = [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contrasena es obligatoria').not().isEmpty(),
    validarCampos
]

router.post('/login',loginValidators, login);

router.post('/google', [
    check('id_token','id_token es necesario').not().isEmpty(),
    validarCampos
],googleSignIn);


module.exports = router;

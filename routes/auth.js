const { Router }        = require('express');
const { login }         = require('../controllers/auth');
const { check }         = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

const loginValidators = [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contrasena es obligatoria').not().isEmpty(),
    validarCampos
]

router.post('/login',loginValidators, login);


module.exports = router;

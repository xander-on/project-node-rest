const { Router }        = require('express');
const { check }         = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { 
    usersGet, 
    usersPost, 
    usersPut, 
    userPatch, 
    usersDelete 
    } = require('../controllers/users');

const router = Router();

router.get   ('/', usersGet);

router.post  ('/', [
    check('name',     'El nombre es obligatorio').not().isEmpty(),
    check('email',    'El correo no es valido').isEmail(),
    check('password', 'El password debe de ser mayor a 6 letras').isLength({ min:6 }),
    check('role',     'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validarCampos
], usersPost);

router.put   ('/:id', usersPut);

router.delete('/', usersDelete);
router.patch ('/', userPatch);


module.exports = router;
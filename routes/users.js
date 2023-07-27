
const { Router }   = require('express');
const { 
    usersGet, 
    usersPost, 
    usersPut, 
    userPatch, 
    usersDelete 
    } = require('../controllers/users');

const router = Router();

router.get   ('/', usersGet);
router.post  ('/', usersPost);
router.put   ('/:id', usersPut);
router.delete('/', usersDelete);
router.patch ('/', userPatch);


module.exports = router;
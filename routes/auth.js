const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { check } =  require('express-validator');
const { Router } = require('express');

const router = Router();    

router.post(
    '/registro',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('a_paterno', 'El apellido paterno es obligatorio').not().isEmpty(),
        check('a_materno', 'El apellido materno es obligatorio').not().isEmpty(),
        check('username', 'El usuario es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio, debe contener al menos 6 caracteres').isLength({min: 6}),
        validarCampos
    ],
    crearUsuario
);
    
router.post(
    '/login',
    [
        check('username', 'El usuario es obligatorio').not().isEmpty(),
        check('password', 'El password es obligatorio, debe contener al menos 6 caracteres').isLength({min: 6}),
        validarCampos
    ],
    loginUsuario
);

router.get('/renew', validarJWT, revalidarToken);

module.exports = router
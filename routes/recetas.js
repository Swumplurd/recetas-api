const { getMisRecetas, postNuevaReceta, putReceta, delReceta } = require("../controllers/recetas");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const { check } = require("express-validator");
const { Router } = require("express");

const router = Router();

router.use(validarJWT)

router.get('/', getMisRecetas);

router.post(
    '/',
    [
        check('titulo', 'El titulo de la receta es obligatorio').not().isEmpty(),
        check('dificultad', 'La dificultad de la receta es obligatoria').not().isEmpty(),
        check('descripcion', 'La descripccion de la receta es obligatoria').not().isEmpty(),
        check('porciones', 'Las porciones de la receta son obligatorias').not().isEmpty(),
        check('tiempo_ejecucion', 'El tiempo de ejecucion de la receta es obligatorio').not().isEmpty(),
        check('ingredientes', 'Los ingredientes son obligatorios').not().isEmpty(),
        check('instrucciones', 'Las instrucciones son obligatorias').not().isEmpty(),
        check('tips', 'Agregar uno o varios tips no estaria mal').not().isEmpty(),
        validarCampos
    ],
    postNuevaReceta
);

router.put(
    '/:id',
    [
        check('titulo', 'El titulo de la receta es obligatorio').not().isEmpty(),
        check('dificultad', 'La dificultad de la receta es obligatoria').not().isEmpty(),
        check('descripcion', 'La descripccion de la receta es obligatoria').not().isEmpty(),
        check('porciones', 'Las porciones de la receta son obligatorias').not().isEmpty(),
        check('tiempo_ejecucion', 'El tiempo de ejecucion de la receta es obligatorio').not().isEmpty(),
        check('ingredientes', 'Los ingredientes son obligatorios').not().isEmpty(),
        check('instrucciones', 'Las instrucciones son obligatorias').not().isEmpty(),
        check('tips', 'Agregar uno o varios tips no estaria mal').not().isEmpty(),
        validarCampos
    ],
    putReceta
);

router.delete('/:id', delReceta);

module.exports = router;
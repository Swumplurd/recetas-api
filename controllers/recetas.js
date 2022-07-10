const { response } = require("express");
const Recipe = require('../models/Recipe');

const getMisRecetas = async(req, res = response) => {
    const recetas = await Recipe.find().populate('usuario', 'username');
     
    if (recetas.length === 0) {
        return res.status(404).json({
            ok: false,
            msg: 'No hay recetas que mostrar'
        });
    }

    res.json({
        ok: true,
        recetas: recetas
    });
}

const postNuevaReceta = async(req, res = response) => {
    const receta = new Recipe(req.body);
    console.log(req.body);

    try {
        receta.usuario = req.uid;
        const recetaGuardada = await receta.save();

        res.status(201).json({
            ok: true,
            receta: recetaGuardada
        });

    } catch (error) {
        console.log('ERROR:', error);

        res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador'
        });
    }
}

const putReceta = async(req, res = response) => {
    const recetaID = req.params.id;
    const uid = req.uid;

    try {
        const receta = await Recipe.findById(recetaID);

        if (!receta) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe la receta'
            });
        }
        
        if (receta.usuario.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tienes permisos para editar esta receta'
            });
        }

        const nuevaReceta = {
            ...req.body,
            usuario: uid,
        };

        const recetaActualizada = await Recipe.findByIdAndUpdate(recetaID, nuevaReceta, {new: true});

        res.json({
            ok: true,
            receta: recetaActualizada
        });

    } catch (error) {
        console.log('ERROR:', error);

        res.status(500).json({
            ok: false,
            msg: 'Contacte con el administrador'
        });
    }
}

const delReceta = async(req, res = response) => {
    const recetaID = req.params.id;
    const uid = req.uid;

    try {
        const receta = await Recipe.findById(recetaID);

        if (!receta) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe la receta'
            });
        }

        if (receta.usuario.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'No tienes permisos para eliminar esta receta'
            });
        }

        const recursoEliminado = await Recipe.findByIdAndDelete(recetaID);

        res.json({
            ok: true,
            receta: recursoEliminado
        });

    } catch (error) {
        console.log('ERROR:', error);
        
        res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador'
        });
    }
}

module.exports = {
    getMisRecetas,
    postNuevaReceta,
    putReceta,
    delReceta
}
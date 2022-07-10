const { generarJWT } = require('../helpers/jwt');
const User = require("../models/User");
const { response } = require("express");
const bcrypt = require('bcryptjs');

const crearUsuario = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        let usuario = await User.findOne({email});

        if (usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Un usuario ya existe con ese email'
            });
        }

        usuario = new User(req.body);

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        const token = await generarJWT(usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });
    } catch (error) {
        console.log('ERROR:', error);
        res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador'
        });
    }
}

const loginUsuario = async(req, res = response) => {
    const { username, password } = req.body;

    try {
        const usuario = await User.findOne({username})

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'El nombre de usuario es incorrecto'
            });
        }

        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        const token = await generarJWT(usuario.id, usuario.name);

        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log('ERROR:', error);
        res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador'
        })
    }
}

const revalidarToken = async(req, res = express.response) => {
    const uid = req.uid;
    const name = req.name;

    const token = await generarJWT(uid, name)

    res.json({
        ok: true,
        token,
        uid,
        name
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}
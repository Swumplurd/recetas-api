const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    a_paterno: {
        type: String,
        required: true
    },
    a_materno: {
        type: String,
        required: true
    },
    mis_recetas: {
        type: Array,
        default: []
    },
    me_gusta_recetas: {
        type: Array,
        default: []
    },
    favoritas_recetas: {
        type: Array,
        default: []
    }
})

module.exports = model('User', UserSchema);
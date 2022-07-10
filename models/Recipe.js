const { Schema, model } = require("mongoose");

const RecipeSchema = Schema({
    titulo: {
        type: String,
        required: true
    },
    dificultad: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    porciones: {
        type: String,
        required: true
    },
    tiempo_ejecucion: {
        type: String,
        required: true
    },
    ingredientes: {
        type: String,
        required: true
    },
    instrucciones: {
        type: String,
        required: true
    },
    tips: {
        type: String,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    en_me_gusta: {
        type: Number,
        default: 0
    }
})

module.exports = model('Recipe', RecipeSchema);
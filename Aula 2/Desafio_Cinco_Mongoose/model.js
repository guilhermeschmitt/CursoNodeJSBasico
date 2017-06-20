var mongoose = require('mongoose');

module.exports = function () {
    var contatoSchema = new mongoose.Schema({
        id: { type: Number },
        nome: String,
        email: String
    });

    return mongoose.model('Contato', contatoSchema);
}
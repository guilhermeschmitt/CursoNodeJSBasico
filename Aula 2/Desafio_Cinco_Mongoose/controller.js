var mongo = require('./model')()

module.exports = function () {
    controller = {};

    // Buscando todos os contatos, preciso fazer ele retornar um JSON ou alguma coisa pro meu index
    controller.findAll = function () {
        mongo.find(function (err, contacts) {
            if (err) return console.error(err);
            console.log(contacts);

            var a = JSON.parse(JSON.stringify(contacts));
            console.log(typeof (a));
            return a;
        });
    };

    // Buscando um unico contato pelo id
    controller.findOne = function (v_id) {
        mongo.findOne({ id: v_id }, function (err, id) {
            if (err) return console.error(err);
            console.log(id);
        });
    };

    // salva contato, função ta funcionando.
    controller.save = function (v_id, v_nome, v_email) {
        var contact = new mongo({
            id: v_id,
            nome: v_nome,
            email: v_email
        });

        contact.save(function (err, element) {
            if (err) return console.error(err);
        });
    }

    // remove contato
    controller.removeContact = function (_id) {
        console.log(_id);

        mongo.remove({ "id": _id }, function (err, element) {
            if (err) return console.error(err);
            console.log("deletou id: " + _id);
        });
    }

    //atualiza contato
    controller.updateContact = function (_id, objeto) {
        if (_id) {
            mongo.findOneAndUpdate({ id: _id }, objeto, function (err, element) {
                if (err) return console.error(err);
                console.log("Atualizou objeto: " + element + " para " + objeto);
            });

        }
    };
    return controller;
}
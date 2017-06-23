var mongo = require('./model')()

module.exports = function () {
    controller = {};

    // Buscando todos os contatos
    controller.findAll = function (res) {
        mongo.find(function (err, contacts) {
            if (err) return console.error(err);
            res.send(JSON.parse(JSON.stringify(contacts)));
        });
    };

    // Buscando um unico contato pelo id
    controller.findOne = function (req, res) {
        mongo.findOne({ id: req.params.id}, function (err, contact) {
            if (err) return console.error(err);
            res.send(JSON.parse(JSON.stringify(contact)));
        });
    };

    // salva contato
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
    controller.removeContact = function (req, res) {
        mongo.remove({ "id": req.params.id}, function (err, element) {
            if (err) return console.error(err);
            res.send("deletou id: " + req.params.id)
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
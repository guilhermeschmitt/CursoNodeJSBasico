var mongo = require('./model')()

module.exports = function () {
    controller = {};

    controller.findAll = function (req, res) {
        mongo.find(function (err, devices) {
            if (err) return console.error(err);
            res.json(devices);
        });
    };

    controller.save = function (v_id, v_device) {
        var device = new mongo({
            id: v_id,
            device: v_device,
        });

        device.save(function (err, element) {
            if (err) return console.error(err);
        });
    }

    return controller;
}
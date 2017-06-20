var express = require('express');
var app = express();
var carros = require('../../Utils/Data/carros');

app.get('/', function (req, res) {
	res.send("Hello World!");
})

app.get('/carros/:modelo', function (req, res) {
	carros.forEach(function (element) {
		if (element.modelo === req.params.modelo) {
			res.json(element);
		}
	})
})

app.get('/carros', function (req, res) {
	res.json(carros);
});

module.exports = app;
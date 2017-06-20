var xmldoc = require('xmldoc');
var fs = require("fs");
var Contato = require('./contato.js');
var contatos = [];
var porta;
var data = fs.readFileSync('./file.xml');
var XMLContatos = new xmldoc.XmlDocument(data);

XMLContatos.childNamed("contatos").eachChild(function (child, index, array) {
    contatos.push(new Contato(child.valueWithPath("nome"), child.valueWithPath("telefone")));
})

porta = XMLContatos.valueWithPath("porta");

module.exports = {
    contatos,
    porta
};
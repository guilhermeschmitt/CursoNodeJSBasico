module.exports = function percorreListaDeCarros(array) {
    array.forEach(function (carro) {
        console.log("As informa��es dos carros s�o: "+ 
            "\n marca: " + carro.marca + "," +
            "\n modelo: " + carro.modelo + "," +
            "\n ano: " + carro.ano + "," +
            "\n cor: " + carro.cor + "," +
            "\n versao: " + carro.versao + "," +
            "\n pre�o: " + carro.preco + ", \n");
    });
}
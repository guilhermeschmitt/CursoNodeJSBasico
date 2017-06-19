module.exports = function percorreListaDeCarros(array) {
    array.forEach(function (carro) {
        console.log("As informações dos carros são: "+ 
            "\n marca: " + carro.marca + "," +
            "\n modelo: " + carro.modelo + "," +
            "\n ano: " + carro.ano + "," +
            "\n cor: " + carro.cor + "," +
            "\n versao: " + carro.versao + "," +
            "\n preço: " + carro.preco + ", \n");
    });
}
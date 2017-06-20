var request = require('request');

var requestLoop = setInterval(function () {
    request.post('http://127.0.0.1:3000/name', {
        form:{ nome:'Guilherme'}

    })
        .on('response', function (response) {
            console.log(response.statusCode);
        })
        .on('error', function (err) {
            console.error(err);
        })
}, 3000);
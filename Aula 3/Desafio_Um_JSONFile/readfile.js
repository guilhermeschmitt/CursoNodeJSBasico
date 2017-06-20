var jsonfile = require('jsonfile');

module.exports = function (file) {
    return jsonfile.readFileSync(file);
}
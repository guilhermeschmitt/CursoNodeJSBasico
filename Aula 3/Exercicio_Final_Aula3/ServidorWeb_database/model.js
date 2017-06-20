var mongoose = require('mongoose');
module.exports = function(){
	var deviceSchema = new mongoose.Schema({
  		id: { type: Number },
  		device: {type: Number}
	});

	return mongoose.model('Device', deviceSchema);
}
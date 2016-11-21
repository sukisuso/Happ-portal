module.exports = function (mongoose) {
    
	var Schema = mongoose.Schema; 

	var Agenda = new Schema({
		gestorId: { type: String, required: true },
	    desc: { type: String, required: true },
	    date: { type: Date, required: true },
	});

    return mongoose.model('Agenda', Agenda);
};
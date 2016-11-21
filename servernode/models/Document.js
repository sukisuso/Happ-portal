
module.exports = function (mongoose) {
    
	var Schema = mongoose.Schema; 

	var Document = new Schema({
		gestorId: { type: String, required: false },
	    clientId: { type: String, required: false },
	    filename: { type: String, required: false },
	    size: { type: Number, required: false },
	    date: { type: Date, required: false },
	    file: { data: Buffer, contentType: String } 
	});

    return mongoose.model('Document', Document);
};
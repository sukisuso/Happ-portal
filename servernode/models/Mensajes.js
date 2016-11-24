module.exports = function (mongoose) {
    
	var Schema = mongoose.Schema; 

	var Mensajes = new Schema({
		gestorId: { type: String, required: true },
	    clientId: { type: String, required: true, ref: 'Client'},
	    date: { type: Date, required: true },
	    asunto: { type: String, required: true },
	    msg: { type: String, required: true },
	    estado: { type: Boolean, required: false }
	});

    return mongoose.model('Mensajes', Mensajes);
};
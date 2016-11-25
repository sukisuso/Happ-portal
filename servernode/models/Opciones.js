module.exports = function (mongoose) {
    
	var Schema = mongoose.Schema; 

	var Opciones = new Schema({
		gestorId: { type: String, required: true },
	    portales: {
	    	info:{ type: Boolean, required: false },
	    	transacciones:{ type: Boolean, required: false },
	    	mensajes:{ type: Boolean, required: false },
	    	documentos:{ type: Boolean, required: false }
	    }
	});

    return mongoose.model('Opciones', Opciones);
};
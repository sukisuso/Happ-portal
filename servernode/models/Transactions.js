
module.exports = function (mongoose) {
    
	var Schema = mongoose.Schema; 

	var Transactions = new Schema({
		gestorId: { type: String, required: true },
	    clientId: { type: String, required: true, ref: 'Client'},
	    date: { type: Date, required: true },
	    cant: { type: Number, required: true },
	    type: { type: String, required: true },
	    desc: { type: String, required: true },
	    validation: { type: Boolean, required: false }
	});

    return mongoose.model('Transactions', Transactions);
};
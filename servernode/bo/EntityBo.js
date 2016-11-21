/*
{
    "_id" : ObjectId("56911dcf79f4175c0adbc19a"),
    "start" : "2016-02-05",
    "title" : "Dentista 17:00",
    "cita" : true
}
*/

var Client = null;
var Transaction = null;
var ObjectId = null;

function StartPaths(app, mongoose){
	Client = require('../models/Client')(mongoose);
	Transaction = require ('../models/Transactions')(mongoose);
	ObjectId = mongoose.Types.ObjectId;
	
	app.get('/entity/:id', getEntity);
	app.post('/entity/:id/transacctions', getTransactions);
	//app.post('/entity/:id/documents', getDocuments);
}

function getEntity (req, res){
	var entity = {};
	Client.findOne({entity: req.params.id},function (err, docs) {
		if (!err) {
			entity['personalInfo'] = docs;
			getAllTransacctionValid (res, entity);
		} else {
			res.status(500).send({ error: '[Error: Servers Mongo] Fallo recuperando datos.'});
		}
	});
}

function getAllTransacctionValid (res, entity){

   Transaction.find({"clientId" : entity.personalInfo._id, validation:true},{} ,{sort:{date:-1}}) 
   	.exec(function (err, docs) {
		if (!err) {
			entity.stats = docs;
			res.setHeader('Content-Type', 'application/json');
			res.send(JSON.stringify(entity));
		} else {
			res.status(500).send({ error: '[Error: Servers Mongo] Fallo recuperando datos.'});
		}
	});
}


function getTransactions (req, res){
	Transaction.count({"clientId" : req.body.clientId, validation:true}, function( err, count){
	   Transaction.find({"clientId" : req.body.clientId, validation:true},{} ,{sort:{date:-1}, skip:req.body.init, limit: req.body.page }, 
	   	function (err, docs) {
			if (!err) {
				var response = {};
				response.total =count;
				response.clients = docs;
				res.setHeader('Content-Type', 'application/json');
				res.send(JSON.stringify(response));
				res.end();
			} else {
				res.status(500).send({ error: '[Error: Servers Mongo] Fallo recuperando datos.'});
				res.end();
			}
		});
	});
}

exports.startPaths = StartPaths;

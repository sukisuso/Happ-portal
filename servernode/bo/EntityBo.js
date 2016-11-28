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
var Documents = null;
var Mensajes = null;
var Opciones = null;
var ObjectId = null;

function StartPaths(app, mongoose){
	Client = require('../models/Client')(mongoose);
	Transaction = require('../models/Transactions')(mongoose);
	Documents = require('../models/Document')(mongoose);
	Mensajes = require('../models/Mensajes')(mongoose);
	Opciones = require('../models/Opciones')(mongoose);
	ObjectId = mongoose.Types.ObjectId;
	
	app.get('/entity/:id', getEntity);
	app.post('/entity/:id/transacctions', getTransactions);
	app.post('/entity/:id/documents', getDocuments);
	app.get('/documents/get/:idDocument', get);
	app.post('/mensajes', addMensajes);
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

   Transaction.find({"clientId" : entity.personalInfo._id, validation:true},{} ,{sort:{date:1}}) 
   	.exec(function (err, docs) {
		if (!err) {
			entity.stats = docs;
			getOptions (res, entity);
		} else {
			res.status(500).send({ error: '[Error: Servers Mongo] Fallo recuperando datos.'});
		}
	});
}

function getOptions (res, entity){
	Opciones.findOne({"gestorId" : entity.personalInfo.gestorId}) 
   	.exec(function (err, docs) {
		if (!err) {
			entity.options = docs;
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

function getDocuments (req, res) {
	Documents.count({"clientId" : req.body.clientId}, function( err, count){
	   Documents.find({"clientId" : req.body.clientId},{} ,{sort:{date:-1}, skip:req.body.init, limit: req.body.page }, 
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

function get(req, res) {
  	Documents.findOne({_id: ObjectId(req.params.idDocument)},function (err, doc) {
		if (!err) {
			res.setHeader('Content-Type', 'application/pdf');
			res.type('pdf'); 
			res.send(doc.file.data);
		} else {
			logger.log('error',err);
			res.status(500).send({ error: '[Error: Servers Mongo] Fallo recuperando datos.'});
			res.end();
		}
	});
}

function addMensajes (req, res){
	var sv = new Mensajes({
		gestorId: req.body.gestorId,
	    clientId: req.body.clientId,
	    date: new Date(), 
	    asunto: req.body.asunto,
	    msg: req.body.msg,
	    estado:req.body.date  
	});
	
	sv.save(function (err) {
		if (!err) {
			res.send(true);
			res.end();
		} else {
			res.status(500).send({ error: '[Error: Servers Mongo] No se ha podido insertar.'});
			res.end();
		}
	});	
}

exports.startPaths = StartPaths;

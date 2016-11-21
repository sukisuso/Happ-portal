
/*
 * Router 
 * Jesús Juan Aguilar 03/2016
 * */
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/happ");
/*var log = require('./helpers/log');
 
var login = require('./bo/LoginBo');
var client = require('./bo/ClientBo');
var transactions = require('./bo/TransactionsBo');
var agenda = require('./bo/AgendaBo');
var documents = require('./bo/DocumentsBo');
var pdf = require('./bo/PdfBo');*/
var entity = require('./bo/EntityBo');

function route(app) {
	
	app.set('view engine', 'ejs');
	app.get('/portal/:entity', function(req, res) {
		res.render('portal', {entity: req.params.entity});
	});
	
	entity.startPaths(app, mongoose);
	
	/*client.startPaths(app, mongoose, log);
	login.startPaths(app, mongoose, log);
	transactions.startPaths(app, mongoose, log);
	agenda.startPaths(app, mongoose, log);
	documents.startPaths(app, mongoose, log);
	pdf.startPaths(app, mongoose, log);

	log.info('Routes loaded.');*/
}

exports.redirect = route;
'use strict';

var path = process.cwd();
var moment = require("moment");

function MakeDate(date){
	var unix, natural;
	
	if(moment.unix(Number(date)).format("MMMM D, YYYY") !== "Invalid date"){
		unix = Number(date);
		natural = moment.unix(Number(date)).format("MMMM D, YYYY");
	}
	else if(moment(date, "MMMM D, YYYY").format("MMMM D, YYYY") !== "Invalid date"){
		unix = Number(moment(date, "MMMM D, YYYY").unix());	
		natural =  date;
	}
	else{
		unix = null;
		natural = null;
	}
	return { "unix": unix, "natural": natural }
	
}



module.exports = function (app) {

	app.get('/',function (req, res) {
		res.sendFile(path + '/public/index.html');
	});
		
	app.get('/:date',function (req, res) {
		var date = req.params.date;
		res.setHeader('Content-Type', 'application/json');
		res.json(MakeDate(date));
	});	

};

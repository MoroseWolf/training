const { Client } = require('pg')
// ВЫВОДИТ ДАННЫЕ АБОНЕМЕНТА
var express = require('express');
var router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgtrs://localhost:5432/test';

	const client = new Client ({
	user: 'postgres',
	host: 'localhost',
	database: 'training',
	password: 'FFSMorWo'
	//password: '42364236'
	})
	client.connect()
	
function getURLParameter(sUrl, sParam) {
    let sPageURL = sUrl.substring(sUrl.indexOf('?') + 1);
	//console.log('URL - > ' , sPageURL)
    let sURLVariables = sPageURL.split('&');
    for (let i = 0; i < sURLVariables.length; i++) {
        let sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}
var i = 0;
router.get('/', function(req, res, next) {

	var data = [getURLParameter(req.url, 'id')]
i = getURLParameter(req.url, 'id')
	var items = new Object()
	var sql = 'select shape.id as shapeid, name as shapename, cost as shapecost from shape where shape.id = ($1);'
	const query = client.query(sql, data, function(err, results) {
		if (err) console.log(err)
		console.log(results)
	res.render('edit_abonements', {items: results.rows});
	})  
});
router.post('/update', function (req, res, next){
	   
	var data = [getURLParameter(req.url, 'id')]
	
	console.log('IDD ', i)
  var name = req.body.shapename
  var data0 = [name, req.body.shapecost, i]
  
   var sql = 'update shape set name = ($1), cost = ($2) where shape.id = ($3);'
   const query = client.query(sql, data0, function(err, results) {
		if (err) console.log(err)
	res.redirect('/abonements');
	})  
   
});
module.exports = router;


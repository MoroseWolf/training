const { Client } = require('pg')
// ВЫВОДИТ ДАННЫЕ УРАЖНЕНИЯ
var express = require('express');
var router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgtrs://localhost:5432/test';

const client = new Client ({
	user: 'postgres',
	host: 'localhost',
	database: 'training',
	//password: '42364236'
	password: 'FFSMorWo'
	})
	client.connect()
	
function getURLParameter(sUrl, sParam) {
    let sPageURL = sUrl.substring(sUrl.indexOf('?') + 1);
    let sURLVariables = sPageURL.split('&');
    for (let i = 0; i < sURLVariables.length; i++) {
        let sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}
var i = 1;
router.get('/', function(req, res, next) {
	var sql = 'select id, id_body as bodyid, name as exercisename, complexity, comment from exercise_all;'
	i = getURLParameter(req.url, 'id')
	const query = client.query(sql, function(err, results) {
		if (err) console.log(err)
	res.render('add_exercise_all', {items: results.rows});
	})  
});

router.post('/insert', async (req, res, next) => {
   
var data0 = [i, req.body.exercisename, req.body.complexity, req.body.comment]
   var sql = 'insert into exercise_all(id_body, name, complexity, comment) values (($1), ($2), ($3), ($4));'
   const query = client.query(sql, data0, function(err, results) {
		if (err) console.log(err)
	res.redirect('/exercise_body');
	})  
});
module.exports = router;
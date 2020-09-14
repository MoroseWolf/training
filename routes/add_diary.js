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
		//password: '42364236'
		password: 'FFSMorWo'
	})
	client.connect();
	
	
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

var personi =0
router.get('/', async (req, res, next) => {
	var sql = 'select diary.id as diaryid, diary.diaryperson as person, diary.date as diarydate from diary;'
	 personi =  getURLParameter(req.url, 'id')
	//p = personi
	console.log ('PERSON 1 -> ', personi)
	const query = client.query(sql, function(err, results) {
		if (err) console.log(err)
			res.render('add_diary', {items: results.rows});
	})  
});

router.post('/insert', async (req, res, next) => {
	//var personi =  [getURLParameter(req.url, 'id')]
	var data = [personi, req.body.date]
	
	var sql = 'insert into diary(diaryperson, date) values(($1), ($2));';
		console.log ('PERSON 2 -> ', personi)
	const query = client.query(sql, data, function(err, results) {
		if (err) console.log(err)
			res.redirect("/mainPage");
	})
});

module.exports = router;
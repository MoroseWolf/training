const { Client } = require('pg')

// - Нужно добавить удаление 
var express = require('express');
var router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgtrs://localhost:5432/test';
var url = require('url')

var http = require('http')
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
    let sURLVariables = sPageURL.split('&');
    for (let i = 0; i < sURLVariables.length; i++) {
        let sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}
var forD 
router.get('/', function(req, res, next) {
	var myid = url.parse(req.url)
	var data = [getURLParameter(req.url, 'id')]
	forD = getURLParameter(req.url, 'id')
	var sql = 'select distinct diary.diaryperson as diaryid, diary.id as abdia, diary.date from diary, abonement, notediary where abonement.diary_id = diary.diaryperson and diary.diaryperson = ($1);'
	const query = client.query(sql,data, function(err, results) {
		if (err) console.log(err)
		//console.log(results)
	res.render('diary', {items: results.rows, diaryid:forD,  dia: getURLParameter(req.url, 'id')});
	})  
})

router.get('/delete', function (req, res, next) {
	var data = [getURLParameter(req.url, 'id')]
	console.log('Удаление', data)

	var sql0 = 'delete from notediary where notediary.id_diary = ($1);'
	
		var sql = 'delete from diary where diary.id = ($1);'
			client.query(sql0, data)
			client.query(sql, data)
			
		console.log('Удаление прошло');
		res.redirect('/mainPage');

});
module.exports = router;
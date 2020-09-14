const { Client } = require('pg')

var express = require('express');
var router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgtrs://localhost:5432/test';
var url = require('url')
var http = require('http')

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

	const client = new Client ({
	user: 'postgres',
	host: 'localhost',
	database: 'training',
	password: 'FFSMorWo'
	//password: '42364236'
	})
	client.connect()
	
router.get('/', function(req, res, next) {
	//ДЛЯ ВЫДЕЛЕНИЯ АЙДИ ИЗ УРЛА
	var myid = url.parse(req.url)
	var data = getURLParameter(req.url, 'id')
	
	
	var id2 = getURLParameter(req.url, 'id2') // diaryid
	console.log('ID2 -> ', data)
var sql = 'select diary.id as diaryid, diary.diaryperson, exercise_body.name_of_body, diary.date as diarydate, note.id as noteid,  note.id_exercise as exerciseid, note.number_podhod, note.number_repeated, exercise_all.name as exercisename, exercise_all.complexity, exercise_all.comment from diary, note, exercise_all,exercise_body, notediary where notediary.id_note = note.id and notediary.id_diary = diary.id and note.id_exercise = exercise_all.id and exercise_all.id_body = exercise_body.id and id_diary = ($1);'
	const query = client.query(sql, [data], function(err, results) {
		if (err) console.log(err)
	//	console.log(results)
	res.render('note',  {id2: id2, id:data, items: results.rows});
	})  
})



router.get('/delete', function (req, res, next) {
	var data = [getURLParameter(req.url, 'id')]
	console.log('Удаление', data)


		var sql2 = 'delete from notediary where notediary.id_note =($1);'
		
		client.query(sql2, data)

		console.log('Удаление прошло');
		res.redirect('/mainPage');


});
module.exports = router;
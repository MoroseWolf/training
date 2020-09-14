const { Client } = require('pg')

// - Нужно добавить удаление 
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
	var i = 0;

router.get('/', async(req, res, next) => {
	//ДЛЯ ВЫДЕЛЕНИЯ АЙДИ ИЗ УРЛА
	var myid = url.parse(req.url)
	var data = [getURLParameter(req.url, 'id')]
	i = getURLParameter(req.url, 'id')

	var sql = 'select id as idd, id_body as bodyid, name as exercisename, complexity, comment from exercise_all where exercise_all.id_body = ($1);'

	let query = await client.query(sql, data);
	console.log(query);

	var count = Number(query.rowCount),
		exercises = [],
		row = [];

	for (let i = 0; i < count;i++){
		if (row.length >= 3){
			exercises.push(row);
			row = [];
			}
		row.push(query.rows[i]);

	}
	if (row.length != 0){
		exercises.push(row);
	}

	res.render('exercise_all', {exercises: exercises, i});

});

router.get('/delete',function (req, res, next){
	var data = [getURLParameter(req.url, 'id')]
	//var data = [i]
	console.log('IDD ', data)
   var sql = 'delete from exercise_all where exercise_all.id = ($1);'
   const query = client.query(sql, data, function(err, results) {
		if (err) console.log(err)
	res.redirect('/exercise_body');
	})  
   
});
module.exports = router;
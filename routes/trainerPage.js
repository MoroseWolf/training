const { Client } = require('pg')
// ВЫВОДИТ ДАННЫЕ ТРЕНЕРА

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
	});

	client.connect();
	
router.get('/', function(req, res, next) {

	//ДЛЯ ВЫДЕЛЕНИЯ АЙДИ ИЗ УРЛА
	var myid = url.parse(req.url)
	console.log('GETPARAM -> ', getURLParameter(req.url, 'id'))
	var data = getURLParameter(req.url, 'id')
	console.log(data);
	data1 = req.query.id;


	console.log('Что-то ' + req.query.id);

	var sql0 = 'select id, name, surname, phone, date_of_birth from "user" where id = ($1)';
	const query = client.query(sql0, [data1], function(err, results) {
		if (err) console.log(err)
		console.log('Получиль тренера')
		//console.log(results)
	res.render('trainerPage', {items: results.rows});
	})  
});

module.exports = router;
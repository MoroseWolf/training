const { Client } = require('pg');

// Добавление !ТРЕНЕРА!

var express = require('express');
var router = express.Router();
const pg = require('pg');
const path = require('path');
var url = require('url');

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
	
router.get('/', async (req, res, next) => {

	//ДЛЯ ВЫДЕЛЕНИЯ АЙДИ ИЗ УРЛА
	var myid = url.parse(req.url)
	var data = ['user',getURLParameter(req.url, 'id')]


	try
	{
		res.render('add_trainer');
	}
	catch (err) {
		console.error(err.stack);
	}
	finally {
		client.end();
	}
});

router.post('/insert', async (req, res, next) => {

	var username = req.body.username,
		password = req.body.password,
		trainer = 'trainer',
		name = req.body.name,
		surname = req.body.surname,
		phone = req.body.phone,
		date_of_birth = req.body.date_of_birth;

	try {
		var dataInsert = [username, password, trainer, name, surname, phone, date_of_birth],
			sqlInsert = 'insert into "user" (username, password, role, name, surname, phone, "date_of_birth") VALUES ($1, $2, $3, $4, $5, $6, $7) returning id';

		let insert = await client.query(sqlInsert, dataInsert);
		console.log('Добавлен тренер');
		console.log(insert.rows);
		res.redirect('/mainPage');
	}
	catch (err){
		console.log(err);
	}
	finally{
		client.end();
	}
});

module.exports = router;

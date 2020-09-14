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
	let sURLVariables = sPageURL.split('&');
	for (let i = 0; i < sURLVariables.length; i++) {
		let sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam) {
			return sParameterName[1];
		}
	}
}

router.get('/', function(req, res, next) {



	var data = ['user']

	var sql0 = 'select "user".id as userid, "user".name as username, "user".surname as usersurname, "user".phone as userphone, "user".date_of_birth, abonement.identif as ident,  shape.name as shapename, shape.cost as shapecost, (select "user".id as trainerid from "user" where abonement.trainer_id = "user".id),(select "user".phone as trainerphone from "user" where abonement.trainer_id = "user".id), (select "user".name as trainername from "user" where abonement.trainer_id = "user".id),(select "user".surname as trainersurname from "user" where abonement.trainer_id = "user".id) as trainersurname from "user", abonement, shape where "user".role = ($1) and abonement.user_id = "user".id and abonement.id_shape = shape.id;';

	const query = client.query(sql0, data, function(err, results) {
		if (err) console.log(err)

		res.render('mainPage', {items: results.rows});
	})
});

router.get('/delete', function (req, res, next) {
	var data = [getURLParameter(req.url, 'id')]
	console.log('Удаление абонемента', data)
	// var data = [getURLParameter(req.url, 'id')]
		var sql = 'delete from abonement where abonement.identif = ($1);'
		const query = client.query(sql, data, function(err, results) {
			if (err) console.log(err);
		console.log('Удаление прошло');
		res.redirect('/mainPage');
	})
});

module.exports = router;
const { Client } = require('pg')
// ВЫВОДИТ  ЮЗЕРА
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
	});
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
	
router.get('/', function(req, res, next) {
	//ДЛЯ ВЫДЕЛЕНИЯ АЙДИ ИЗ УРЛА
	var myid = url.parse(req.url)
	var data = ['user',getURLParameter(req.url, 'id')]
	
	//var sql = 'select staff.id as staffid, simple_user.id as userid, simple_user.name as username, simple_user.phone as userphone, simple_user.date_of_birth, abonement.identif as ident, shape.name as shapename, staff.name as trainername from  simple_user, abonement, shape, staff where simple_user.id_abonement = abonement.id and abonement.id_shape = shape.id and abonement.trainer_id = staff.id and simple_user.id = ($1);'
		var sql = 'select "user".id as userid, "user".role as userrole, "user".name as username, "user".surname as usersurname, "abonement".diary_id as diaryid, "user".phone as userphone, ' +
			'"user".date_of_birth, abonement.identif as ident,  shape.name as shapename, shape.cost as shapecost, ' +
			'(select "user".id as trainerid from "user" where abonement.trainer_id = "user".id), ' +
			'(select "user".name as trainername from "user" where abonement.trainer_id = "user".id),' +
			'(select "user".surname as trainersurname from "user" where abonement.trainer_id = "user".id) as trainersurname from "user", ' +
			'abonement, shape where "user".role = ($1) and "user".id = ($2) and abonement.user_id = "user".id and abonement.id_shape = shape.id;';

	const query = client.query(sql, data, function(err, results) {
		if (err) console.log(err);
		console.log(results);

	res.render('user', {items: results.rows, dia: getURLParameter(req.url, 'id')});
	})  
})

module.exports = router;
const { Client } = require('pg')
// ВЫВОДИТ ВСЕХ ЮЗЕРОВ У КОНКРЕТНОГО ТРЕНЕРА

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

	
	var sql = 'select simple_user.id as userid,  simple_user.name as username, staff.name as trainername from simple_user, staff, abonement where simple_user.id_abonement = abonement.id and staff.id = ($1);'
	var sql0 = 'select DISTINCT "user".id as userid, "user".phone as userphone, "user".date_of_birth, "user".name as username, "user".surname as usersurname from "user", abonement where  "user".id = abonement.user_id and abonement.trainer_id = ($1);'
	const query = client.query(sql0, [data], function(err, results) {
		if (err) console.log(err)
		console.log(results)
	res.render('trainerUsers', {items: results.rows});
	})  
})

module.exports = router;
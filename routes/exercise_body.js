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
	
router.get('/', function(req, res, next) {

	var sql = 'select id as bodyid, name_of_body as bodyname from exercise_body;'
	const query = client.query(sql, function(err, results) {
		if (err) console.log(err)
		console.log(results)
	res.render('exercise_body', {items: results.rows});
	})  
})

module.exports = router;
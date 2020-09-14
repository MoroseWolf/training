const { Client } = require('pg')
// ВЫВОДИТ ДАННЫЕ АБОНЕМЕНТА
var express = require('express');
var router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgtrs://localhost:5432/test';

router.get('/', function(req, res, next) {
  res.render('login');
});
const client = new Client ({
	user: 'postgres',
	host: 'localhost',
	database: 'training',
	password: 'FFSMorWo'
	//password: '42364236'
	})
	client.connect()

router.post('/login', function(req, res, next) {
 
	var username = req.body.username;
	var password = req.body.password;
	
	var data = [username, password]
	var ret
	
	var sql2 = 'select "user".id, "user".role from "user" where "user".username = ($1)  and "user".password = ($2);';
	const query = client.query(sql2, data, function(err, results) {
		if (err) console.log(err)
			 ret = results;

	
	var curRole = ret.rows[0].role
	var curId = ret.rows[0].id
	console.log('ID ', curId, ', USERNAME ', username, ' PASSWORD ', password, ' ROLE ', curRole)
	if (curRole == null) {res.redirect('/')}
	console.log(results)
	try {
		if (curRole == "user") {
			res.redirect('/user?id=' + curId)
		}
		if (curRole == "trainer") {
			res.redirect('/trainerPage?id=' + curId)
		}
		if (curRole == "admin") {
			res.redirect('/mainPage')
		}
	} catch (err) {}
	
	//res.render('mainPage', {items: results.rows});
	})  
});



module.exports = router;
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
		//password: '42364236'
		password: 'FFSMorWo'
	})
	client.connect();
	
router.get('/', async (req, res, next) => {
	var sql = 'select shape.id as shapeid, name as shapename, cost as shapecost from shape;'
	const query = client.query(sql, function(err, results) {
		if (err) console.log(err)
			res.render('add_abonement', {items: results.rows});
	})  
});

router.post('/insert', async (req, res, next) => {
	var data = [req.body.name, req.body.cost]
	var sql = 'insert into shape(name, cost) values(($1), ($2))';
		
	const query = client.query(sql, data, function(err, results) {
		if (err) console.log(err)
			res.redirect("/abonements");
	})
});

module.exports = router;
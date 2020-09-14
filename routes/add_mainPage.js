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
	client.connect();

	
router.get('', async (req, res, next) => {

	try {

		var sqlUser = 'select "user".id as userid, "user".role as userrole, "user".name as name, "user".surname as surname, "user".phone as phone from "user";';
		var sqlShape = 'select shape.id as shapeid, shape.name as shapename, shape.cost as shapecost from shape;';

		let listUser = await client.query(sqlUser);
		let listShape= await client.query(sqlShape);

		console.log(listUser);
		console.log(listShape);
		res.render('add_mainPage', {listUser: listUser.rows, listShape:listShape.rows});
	}
	catch (err) {
		console.error(err.stack);
	}
	finally {
		client.end();
	}
});

router.post('/insert', async (req, res, next) => {

	try {

		var sqlUser = 'select "user".id as userid, "user".role as userrole, "user".name as name, "user".surname as surname, "user".phone as phone from "user";'
		var sqlShape = 'select shape.id as shapeid, shape.name as shapename, shape.cost as shapecost from shape;'

		var sqlUser = 'INSERT INTO ';
		let listUser = await client.query(sqlUser);
		let listShape= await client.query(sqlShape);

		console.log(listUser);
		console.log(listShape);
		res.render('add_mainPage', {listUser: listUser.rows, listShape:listShape.rows});
	}
	catch (err) {
		console.error(err.stack);
	}
	finally {
		client.end();
	}
});

module.exports = router;
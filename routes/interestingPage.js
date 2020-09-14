const { Client } = require('pg');

// Добавление !ТРЕНЕРА!

var express = require('express');
var router = express.Router();
const pg = require('pg');
const path = require('path');
//const connectionString = process.env.DATABASE_URL || 'postgtrs://localhost:5432/test';
var url = require('url');
//var http = require('http');

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


    try
    {

        sqlTest = 'select id from abonement where id=2';
        var testId = await client.query(sqlTest);

        console.log('Get тестовой страницы');
        console.log(testId.rows[0].id);
        var idd = testId.rows[0].id;
        console.log(idd);
        res.render('interestingPage');
    }
    catch (err) {
        console.error(err.stack);
    }
    finally {
        client.end();
    }
});

module.exports = router;
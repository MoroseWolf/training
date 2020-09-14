const { Client } = require('pg');

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
    try
    {
        var sqlUser = 'select "user".id as userid, "user".role as userrole, "user".name as name, "user".surname as surname, "user".phone as phone from "user" where "user".role=\'trainer\';';
        var sqlShape = 'select shape.id as shapeid, shape.name as shapename, shape.cost as shapecost from shape;';

        let listUser = await client.query(sqlUser);
        let listShape= await client.query(sqlShape);

        console.log(listUser);
        console.log(listShape);
        res.render('add_user', {listUser: listUser.rows, listShape:listShape.rows});
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
        role = req.body.role,
        name = req.body.name,
        surname = req.body.surname,
        phone = req.body.phone,
        date_of_birth = req.body.date_of_birth,
        ident = req.body.ident,
        date_of_start = req.body.date_of_start,
        date_of_end = req.body.date_of_end,
        trainer = req.body.select_trainer,
        type_abonement = req.body.select_abonement
    ;

    try {
        var dataInsert = [username, password, role, name, surname, phone, date_of_birth],
            sqlInsert = 'insert into "user" (username, password, role, name, surname, phone, "date_of_birth") VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id';
            sqlAbonement = 'insert into "abonement" ( identif, start_date, end_date, id_shape, user_id, trainer_id) VALUES ($1, $2, $3, $4, $5, $6)';

        let userId = await client.query(sqlInsert, dataInsert);

        //console.log(userId.rows);
        console.log(userId.rows[0]);
        console.log(userId.rows[0].id);
        var id = userId.rows[0].id;
        var abonementInsert = [ident, date_of_start, date_of_end, type_abonement, id, trainer];
        let insertAbonement = await client.query(sqlAbonement, abonementInsert);

        console.log('Добавлен пользователь');

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

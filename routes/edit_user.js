const { Client } = require('pg')
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
    //console.log('URL - > ' , sPageURL)
    let sURLVariables = sPageURL.split('&');
    for (let i = 0; i < sURLVariables.length; i++) {
        let sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}
var i = 0;
router.get('/',async(req, res, next) => {

    i = getURLParameter(req.url, 'id');

    try {
        var data = [i];
        var sqlSelect = 'select "user".id as userid, "user".role as userrole, "user".name as username, "user".surname as usersurname, "user".phone as userphone, "user"."date_of_birth" as userbirthday, ' +
            'abonement.identif as abonid, abonement.start_date as abonstart, abonement.end_date as abonend, abonement.id_shape as abontype, abonement.user_id as abonuser, abonement.trainer_id as abontrainer' +
            ' ' +
            'from "user", "abonement" where "user".id = abonement.user_id and abonement.identif = $1;';

        let userInfo = await client.query(sqlSelect, data);

        var sqlUser = 'select "user".id as userid, "user".role as userrole, "user".name as name, "user".surname as surname, "user".phone as phone from "user" where "user".role=\'trainer\';';
        var sqlShape = 'select shape.id as shapeid, shape.name as shapename, shape.cost as shapecost from shape;';

        let listUser = await client.query(sqlUser);
        let listShape= await client.query(sqlShape);

        res.render('edit_user', {user: userInfo.rows[0], listUser: listUser.rows, listShape: listShape.rows});
    }
    catch(err){
        console.error(err.stack);
    }
    finally {
        client.end();
    }
});

router.post('/update', async (req, res, next) => {

    var role = req.body.userrole,
        name = req.body.username,
        surname = req.body.usersurname,
        phone = req.body.userphone,
        date_of_birth = req.body.userbirthday,
        ident = req.body.abonident,
        date_of_start = req.body.abonstart,
        date_of_end = req.body.abonend,
        trainer = req.body.abontrainer,
        type_abonement = req.body.abontype
    ;

    try {
        var dataUpdate = [name, surname, role, phone, date_of_birth, i],
            abonementUpdate = [ident, date_of_start, date_of_end, type_abonement, i, trainer];

        sqlUpdate = 'update "user" set name = ($1), surname = ($2), role = ($3), phone = ($4), date_of_birth = ($5) where "user".id = ($6);';
            sqlAbonement = 'update "abonement" set start_date = ($2), end_date = ($3), id_shape = ($4), user_id = ($5), trainer_id = ($6) where identif = ($1);';

        let userId = await client.query(sqlUpdate, dataUpdate);
        let updAbonement = await client.query(sqlAbonement, abonementUpdate);
        res.redirect('/mainPage');
    }
    catch(err){
        console.error(err.stack);
    }
    finally {
        client.end();
    }
});
module.exports = router;


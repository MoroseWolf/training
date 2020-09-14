/*const { Client } = require('pg')
var express = require('express');
var router = express.Router();
const pg = require('pg');
const path = require('path');
const connectionString = process.env.DATABASE_URL || 'postgtrs://localhost:5432/test';

const client = new Client ({
    user: 'postgres',
    host: 'localhost',
    database: 'training',
    //password: 'FFSMorWo'
	password: '42364236'
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

var i = 0;
router.get('/',async(req, res, next) => {
    i = getURLParameter(req.url, 'id2');
    try {
        var data = [i];
		var sql = 'select diary.id as diaryid, diary.diaryperson, exercise_body.id as exercisebodyid, exercise_body.name_of_body as nameofbody, diary.date as diarydate, note.id as noteid,  note.id_exercise as exerciseid, note.number_podhod, note.number_repeated, exercise_all.id as exerciseallid, exercise_all.name as exercisename, exercise_all.complexity, exercise_all.comment from diary, note, exercise_all,exercise_body, notediary where notediary.id_note = note.id and notediary.id_diary = diary.id and note.id_exercise = exercise_all.id and exercise_all.id_body = exercise_body.id and id_diary = ($1);'

        /*var sqlSelect = 'select "user".id as userid, "user".role as userrole, "user".name as username, "user".surname as usersurname, "user".phone as userphone, "user"."date_of_birth" as userbirthday, ' +
            'abonement.identif as abonid, abonement.start_date as abonstart, abonement.end_date as abonend, abonement.id_shape as abontype, abonement.user_id as abonuser, abonement.trainer_id as abontrainer' +
            ' ' +
            'from "user", "abonement" where "user".id = abonement.user_id and abonement.identif = $1;';

        let noteInfo = await client.query(sql, data);

      //  var sqlDiary = 'select diary.id as diaryid, diary.diaryperson, diary.date as diarydate from diary';
        var sqlBody = 'select exercise_body.id as exercisebodyid, exercise_body.name_of_body as nameofbody from exercise_body;';
		var sqlExer = 'select exercise_all.id as exerciseallid, exercise_all.name as exercisename, exercise_all.complexity, exercise_all.comment from exercise_all;'
		
		
        let listBody = await client.query(sqlBody);
        let listExer = await client.query(sqlExer);

        res.render('edit_note', {note: noteInfo.rows[0], listBody: listBody.rows, listExer: listExer.rows});
    }
    catch(err){
        console.error(err.stack);
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
    console.log('IDD ', i);

    try {
        var dataUpdate = [name, surname, role, phone, date_of_birth, i],
            abonementUpdate = [ident, date_of_start, date_of_end, type_abonement, i, trainer];

        sqlUpdate = 'update "user" set name = ($1), surname = ($2), role = ($3), phone = ($4), date_of_birth = ($5) where "user".id = ($6);';
            sqlAbonement = 'update "abonement" set start_date = ($2), end_date = ($3), id_shape = ($4), user_id = ($5), trainer_id = ($6) where identif = ($1);';

        let userId = await client.query(sqlUpdate, dataUpdate);
        let updAbonement = await client.query(sqlAbonement, abonementUpdate);

        console.log('Изменен пользователь');

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

*/
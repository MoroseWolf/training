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
	let sURLVariables = sPageURL.split('&');
	for (let i = 0; i < sURLVariables.length; i++) {
		let sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] == sParam) {
			return sParameterName[1];
		}
	}
}

var id = 0
var id2 = 0
router.get('/', async (req, res, next) => {
	try {
		
	var data = [getURLParameter(req.url, 'id')]
	
	var sqlDiary = 'select diary.id as diaryid, diary.date as diarydate from diary;'
	var sqlExerciseBody = 'select exercise_body.id as exercisebodyid, exercise_body.name_of_body as nameofbody from  exercise_body;';
	var sqlNote = 'select note.id_exercise as exerciseid, note.number_podhod as numberpodhod, note.number_repeated as numberrepeated from note;'
	var sqlExerciseAll = 'select exercise_all.id as exerciseallid, exercise_all.name as exercisename, exercise_all.complexity, exercise_all.comment from exercise_all;';
	id = getURLParameter(req.url, 'id') // diary.id
	id2 = getURLParameter(req.url, 'id2')
	let listDiary = await client.query(sqlDiary);
	let listExerciseBody= await client.query(sqlExerciseBody);
	let listNote = await client.query(sqlNote);
	let listExerciseAll = await client.query(sqlExerciseAll);
		
	res.render('add_note', {listExerciseAll:listExerciseAll.rows, listDiary: listDiary.rows, listExerciseBody:listExerciseBody.rows, listNote: listNote.rows});
	}
	catch (err) {
		console.error(err.stack);
	}
});

router.post('/insert', async (req, res, next) => {

 var diarydate = req.body.diarydate,
        select_body = req.body.select_body,
        select_exercisename = req.body.select_exercisename,
        numberpodhod = req.body.numberpodhod,
        numberrepeated = req.body.numberrepeated,
        complexity = req.body.complexity,
        comment = req.body.comment
    ;
	//id = getURLParameter(req.url, 'id') // diary.id
	console.log('MB IDDD -> ', id)
	
	try {
		sqlNotediary = 'insert into "notediary" (id_diary, id_note) values ($1, $2);'
		sqlNote = 'insert into "note" (id_exercise, number_podhod, number_repeated) values ($1, $2, $3) returning id';

		console.log('SELECT EX NAME ->  ', select_exercisename)
		var NoteInsert = [select_exercisename, numberpodhod, numberrepeated]
		let NoteI = await client.query(sqlNote, NoteInsert);
		var NoteId = NoteI.rows[0].id
		
		var notediaryInsert = [id2, NoteId]
		let notediaryI = await client.query(sqlNotediary, notediaryInsert);

		 //console.log('Добавлено!!');

        res.redirect('/mainPage');
	} 
	catch (err){
        console.log(err);
    }
   
});

module.exports = router;
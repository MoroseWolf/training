const { Client } = require('pg')
const express = require('express')
const morgan = require('morgan')
const pg = require('pg')
const path = require('path')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose')
const passport = require('passport')
var logger = require('morgan');
var createError = require('http-errors');

var app = express();

var indexRouter  = require('./routes/index');
var mainRouter = require('./routes/mainPage'); //для главной страницы абонемента
var trainerRouter = require('./routes/trainerPage') // для страницы тренера
var trainerUserRouter = require('./routes/trainerUsers') // для юзеров конкретного тренера
var userRouter = require('./routes/user') // для отдельного пользователя
var abonementsRouter = require('./routes/abonements')
//var exercisesRouter = require('./routes/exercises')


var exercise_bodyRouter = require('./routes/exercise_body');
var all_exerciseRouter = require('./routes/exercise_all');
var noteRouter = require('./routes/note');
var diaryRouter = require('./routes/diary');

var add_trainerRouter = require('./routes/add_trainer');
var add_mainPageRouter = require('./routes/add_mainPage');
var add_abonementRouter = require('./routes/add_abonement')
var add_exercise_allRouter = require('./routes/add_exercise_all')
var add_userRouter = require('./routes/add_user');
var add_diaryRouter = require('./routes/add_diary')
var add_noteRouter = require('./routes/add_note')

var edit_abonementsRouter = require('./routes/edit_abonements')
var edit_exercise_allRouter = require('./routes/edit_exercise_all')
var edit_userRouter = require('./routes/edit_user');
//var edit_noteRouter = require('./routes/edit_note')
// Страница для тестов
var int_pageRouter = require('./routes/interestingPage');


app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', expressHandlebars({ defaultLayout: 'layout' }))
app.set('view engine', 'handlebars')

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/mainPage', mainRouter);
app.use('/trainerPage', trainerRouter);
app.use('/trainerUsers', trainerUserRouter);
app.use('/user', userRouter)
app.use('/abonements', abonementsRouter)
//app.use('/exercises', exercisesRouter)

app.use('/exercise_body', exercise_bodyRouter)
app.use('/exercise_all', all_exerciseRouter)
app.use('/note', noteRouter)
app.use('/diary', diaryRouter);

app.use('/add_trainer', add_trainerRouter);
app.use('/add_mainPage', add_mainPageRouter);
app.use('/add_abonement', add_abonementRouter)
app.use('/add_exercise_all', add_exercise_allRouter)
app.use('/add_user', add_userRouter)
app.use('/add_diary', add_diaryRouter)
app.use('/add_note', add_noteRouter)

app.use('/edit_abonements', edit_abonementsRouter)
app.use('/edit_exercise_all', edit_exercise_allRouter)
app.use('/edit_user',edit_userRouter);
//app.use('/edit_note', edit_noteRouter)

// Страница для тетов
app.use('/interestingPage', int_pageRouter);




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  cookie: { maxAge: 60000 },
  secret: 'codeworkrsecret',
  saveUninitialized: false,
  resave: false
}));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

app.listen(5000, () => console.log('Server started listening on port 5000!\nCheck it!'));
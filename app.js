const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport')


//------ Enable CORS

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


// passportconfig
require('./config/passport')(passport);

// DB config
const db = require('./config/keys').mongoURL;

// connect to db --------------------------------------------------------
async function connect(){
    await mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
}

connect();

// ----- event listner

mongoose.connection.once('open', () => {

    console.log('connected to study app db');
    
}).on('error', (error) => {
    console.log('connection error ---> ', error);
})

// ----------------------------------------------------------------------------

app.use(express.static(__dirname + '/public'));

// ejs
app.use(expressLayouts);
app.set('view engine', 'ejs');

// bosy parser
app.use(express.json());
app.use(express.urlencoded({extended:false}));

// express session
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
    // cookie: {secure: true}
}));

// passport middle ware
app.use(passport.initialize());
app.use(passport.session());

// connect flash 
app.use(flash());

// global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

const PORT = process.env.PORT || 4000 || '0.0.0.0' ;
app.listen(PORT, console.log('silicon badger started ...'));

// routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/lnmodels', require('./routes/lnmodels'));
app.use('/submodels', require('./routes/submodels'));
app.use('/timebox', require('./routes/timebox'))
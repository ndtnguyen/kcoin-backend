
const morgan = require('morgan')
const bodyParser = require('body-parser')
const express = require('express')
const signupController = require('./controllers/signupController')
const loginController = require('./controllers/loginController')
const addressController = require('./controllers/addressController')
const path = require('path')

const app = express()

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(function(req,res,next){
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
})
app.use('/signup', signupController);
app.use('/login', loginController);
app.use('/address', addressController);
app.listen( process.env.PORT || 3100 )


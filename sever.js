const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controller/register');
const signin = require('./controller/signin');
const profile = require('./controller/profile');
const image = require('./controller/image');

const db = knex({
  client: 'pg',
  connection: {
    connectionString : procees.env.DATABASE_URL,
    ssl: true
  }
});


const app = express();

app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res) => {
	res.send('It is working!')
})

app.post('/signin', (req, res) => {
	signin.handleSignin(req, res, db, bcrypt)
})


app.post('/register', (req,res) => {
	register.handleRegister(req, res, db, bcrypt)
})


app.get('/profile/:id', (req, res) => {
	profile.handleProfileGet(req, res, db)
})

app.put('/image', (req, res) => {
	image.handleImage(req, res, db)
})

app.post('/imageurl', (req, res) => {
	image.handleApiCall(req, res)
})



// bcrypt.compar	e("bacon", hash, function(err, res) {
	
// });

app.listen(process.env.PORT || 3000, () => {
	console.log(`App is running fine on port ${process.env.PORT}`)
})
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
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : "'smartbraindb'"
  }
});


const app = express();

const database = {
	users: [
		{
			id:'123',
			name: 'john',
			email: 'j@gmail.com',
			password: 'test',
			entries: 0,
			joined: new Date()
		},
		{
			id:'456',
			name: 'shail',
			email: 's@gmail.com',
			password: 'shail',
			entries: 0,
			joined: new Date()
		}
	],
	login: [
		{
			id:'987',
			hash:'',
			email:'j@gmail.com'
		}
	]
}

app.use(bodyParser.json());

app.use(cors());

app.get('/', (req, res) => {
	res.send(database.users)
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

app.listen(3001, () => {
	console.log('App is running fine on port 3001')
})
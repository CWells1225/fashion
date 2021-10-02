// imports
const express = require('express')
const app = express()
const methodOverride = require('method-override')
const mongoose = require('mongoose')
require('dotenv').config()

const PORT = process.env.PORT
// Connect to Database

const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI, {
	useNewUrlParser: true, 
	useUnifiedTopology: true 
}, () => {
	console.log('db connected'); 
})

const db = mongoose.connection 

db.on('connected', () => {
	console.log('mongoose connected to', MONGODB_URI); 
})

db.on('disconnected', () => {
	console.log('mongoose disconnected to', MONGO_URI); 
})

db.on('error', (error) => {
	console.log('mongoose error', error); 
})

// Middleware 

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

//Controllers

const fashionsController = require('./controllers/fashionsController')
app.use('/fashions', fashionsController)	

//to test
app.get('/', (req, res) => {
	res.send('test')
})

//Listeners
app.listen(PORT, () => {
	console.log('listening on port:', PORT); 
}) 

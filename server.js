// requirements

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const items = require('./routes/api/items')

// initilize express as app

const app = express()

// middle ware

app.use(bodyParser.json())

// DB Config
const db = require('./config/keys').mongoURI

// Connect to mongo using mongoose

mongoose
  .connect(db)
  .then(() => console.log('Mongo is connected bro!'))
  .catch(err => console.log(err))

// Use Routes
app.use('/api/itmes', items)

// creating port for hosting
const port = process.env.PORT || 5000

// Have app listen on port
app.listen(port, () => console.log(`Server started on ${port}`))

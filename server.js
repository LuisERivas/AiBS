// requirements

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const items = require('./routes/api/items')
const path = require('path')

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
app.use('/api/items', items)

// serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}
// creating port for hosting
const port = process.env.PORT || 5000

// Have app listen on port
app.listen(port, () => console.log(`Server started on ${port}`))

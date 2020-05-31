// requirements

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const config = require('config')

// initilize express as app

const app = express()

// middle ware

app.use(express.json())

// DB Config
const db = config.get('mongoURI')

// Connect to mongo using mongoose

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Mongo is connected bro!'))
  .catch(err => console.log(err))

// Use Routes
app.use('/api/items', require('./routes/api/items'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
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

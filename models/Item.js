// bring in mongoose
const mongoose = require('mongoose')
// initialize schema
const Schema = mongoose.Schema

// create schema
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

// export item schema
module.exports = Item = mongoose.model('item', ItemSchema)

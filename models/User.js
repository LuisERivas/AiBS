// bring in mongoose
const mongoose = require('mongoose')
// initialize schema
const Schema = mongoose.Schema

// create schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  register_date: {
    type: Date,
    default: Date.now
  }
})

// export item schema
module.exports = User = mongoose.model('user', UserSchema)

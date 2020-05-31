// Requirements
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

// User model
const User = require('../../models/User')

// Routes

// Route:       POST api/auth
// Description: Authenticate user
// Access:      Public

router.post('/', (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).json({ msg: 'Yooooo, you forgot some stuff' })
  }
  User.findOne({ email })
    .then(user => {
      if (!user) return res.status(400).json({ msg: 'user does not exist exists' })
      // Validate password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials!' })
          jwt.sign(
            { id: user.id },
            config.get('jwtSecret'),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email
                }
              })
            })
        })
    })
})

// Route:       get api/auth/user
// Description: get user data
// Access:      private
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
})

// Export Router
module.exports = router

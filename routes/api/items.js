// Requirements
const express = require('express')
const router = express.Router()

// item model
const Item = require('../../models/Item')

// Routes

// Route:       GET api/items
// Description: Get all items
// Access:      Public

router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
})

// Route:       Post api/items
// Description: Post an item
// Access:      Public

router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  })
  newItem.save().then(item => res.json(item))
})

// Route:       Delete api/items
// Description: Delete an item
// Access:      Public

router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }))
})

// Export Router
module.exports = router

const express = require('express')
const router = express.Router()
const User = require('../models/User')
const auth = require('../middleware/authMiddleware')

router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find({}, 'name email _id') // récupère quelques champs utiles
    res.json(users)
  } catch (err) {
    res.status(500).json({ message: 'Erreur lors de la récupération des utilisateurs', error: err })
  }
})

module.exports = router

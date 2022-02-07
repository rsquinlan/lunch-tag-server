const mongoose = require('mongoose')

const db = {}

db.mongoose = mongoose

db.user = require('./user-model')
db.matches = require('./matches-model')

module.exports = db
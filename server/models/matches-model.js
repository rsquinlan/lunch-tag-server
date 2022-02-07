const mongoose = require('mongoose')

//create mongoose schema for user w/ username, email, password
const Matches = mongoose.model(
    "Matches",
    new mongoose.Schema({
        date: Date,
        matches: [[]]
    })
)

//can save new users and find old ones by username or email

module.exports = Matches
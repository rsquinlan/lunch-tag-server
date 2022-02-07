const mongoose = require('mongoose')

//create mongoose schema for user w/ username, email, password
const User = mongoose.model(
    "User",
    new mongoose.Schema({
        username: String,
        password: String,
        strikes: [String],
        prevMatches: [String],
        crush: String,
        optedIn: {type: Boolean, default: true}
    })
)

//can save new users and find old ones by username or email

module.exports = User
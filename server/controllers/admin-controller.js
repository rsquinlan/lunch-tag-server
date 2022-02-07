const config = require("../config/auth-config")
const db = require("../models")
const User = db.user
const Matches = db.matches

confirmMatches = (req, res) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;

    const matches = new Matches({
        date: today,
        matches: req.body.matches
    })

    matches.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }
    })

    req.body.matches.forEach(match => {
        User.updateOne({username: match[0]}, 
            {$push: {prevMatches: match[1]}})
        .exec((err) => {
            if (err) {
                res.status(500).send({ message: err })
                return
            } 
        })
        User.updateOne({username: match[1]}, 
            {$push: {prevMatches: match[0]}})
        .exec((err) => {
            if (err) {
                res.status(500).send({ message: err })
                return
            } 
        })
    })

    res.status(200).send("Success!")
}

module.exports = {
    confirmMatches
}
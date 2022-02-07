const config = require("../config/auth-config")
const db = require("../models")
const User = db.user
const Matches = db.matches

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

signup = (req, res) => {
    const user = new User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8)
    })
    user.save((err, user) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }
        res.send({ message: "User was registered successfully!" })
    })
}

signin = (req, res) => {
    User.findOne({
        username: req.body.username
    })
    .exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        }

        if(!user){
            res.status(404).send({ message: "User not found" })
            return
        }

        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )

        if (!passwordIsValid){
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            })
        }

        const token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 //24 hours
        })

        res.status(200).send({
            id: user._id,
            username: user.username,
            strikes: user.strikes,
            prevMatches: user.prevMatches,
            crush: user.crush,
            optedIn: user.optedIn,
            accessToken: token
        })
    })
}


getUsers = (req, res) => {
    User.find({}, ["username", "strikes", "prevMatches", "crush", "optedIn"])
    .exec((err, users) => {
        if (err) {
            res.status(500).send({ message: err })
            return
        } 
        res.status(200).send({
            userList: users
        })
    })
}

getMatches = (req, res) => {
    Matches.find({}, ["matches"])
    .exec((err, matches) => {
        if(err) {
            res.status(500).send({ message: err })
        }
        if(matches !== undefined){
            res.status(200).send({
                matches: matches[matches.length - 1].matches
            })
        }
        else{
            res.status(200).send({
                matches: []
            })
        }
        
    })
}

module.exports = {
    signup,
    signin,
    getUsers,
    getMatches
}
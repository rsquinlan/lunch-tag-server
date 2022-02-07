const config = require("../config/auth-config")
const db = require("../models")
const User = db.user

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

updateStrikes = (req, res) => {
    User.findOne({
        username: req.body.params.newStrike
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

        User.findOne({
            username: req.body.params.username
        })
        .exec((err, user) => {
            if(err) {
                res.status(500).send({ message: err })
                return
            }
    
            if(user.strikes.includes(req.body.params.newStrike)){
                res.status(406).send({ message: "User already in strikes" })
                return
            }
            User.updateOne({username: req.body.params.username}, 
                {$push: {strikes: req.body.params.newStrike}})
            .exec((err) => {
                if (err) {
                    res.status(500).send({ message: err })
                    return
                } 

                const token = jwt.sign({ id: user.id }, config.secret, {
                    expiresIn: 86400 //24 hours
                })

                user.strikes.push(req.body.params.newStrike)
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
        })
    })
}

deleteStrike = (req, res) => {
    User.findOne({
        username: req.body.params.username
    })
    .exec((err, user) => {
        if(err) {
            res.status(500).send({ message: err })
            return
        }
        User.updateOne({username: req.body.params.username}, 
            {$pull: {strikes: req.body.params.delStrike}})
        .exec((err) => {
            if (err) {
                res.status(500).send({ message: err })
                return
            } 

            const token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 //24 hours
            })

            var index = user.strikes.indexOf(req.body.params.delStrike);
            
            if (index !== -1) {
                user.strikes.splice(index, 1);
            }
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
    })
}

addCrush = (req, res) => {
    User.findOne({
        username: req.body.params.newCrush
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

        User.findOne({
            username: req.body.params.username
        })
        .exec((err, user) => {
            if(err) {
                res.status(500).send({ message: err })
                return
            }

            User.updateOne({username: req.body.params.username}, 
                {crush: req.body.params.newCrush})
            .exec((err) => {
                if (err) {
                    res.status(500).send({ message: err })
                    return
                } 

                const token = jwt.sign({ id: user.id }, config.secret, {
                    expiresIn: 86400 //24 hours
                })

                user.crush = req.body.params.newCrush
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
        })
    })
}

deleteCrush = (req, res) => {
    User.findOne({
        username: req.body.params.username
    })
    .exec((err, user) => {
        if(err) {
            res.status(500).send({ message: err })
            return
        }
        User.updateOne({username: req.body.params.username}, 
            {crush: ""})
        .exec((err) => {
            if (err) {
                res.status(500).send({ message: err })
                return
            } 

            const token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 //24 hours
            })

            res.status(200).send({
                id: user._id,
                username: user.username,
                strikes: user.strikes,
                prevMatches: user.prevMatches,
                crush: "",
                optedIn: user.optedIn,
                accessToken: token
            })
        })
    })
}

optIn = (req, res) => {
    User.findOne({
        username: req.body.params.username
    })
    .exec((err, user) => {
        if(err) {
            res.status(500).send({ message: err })
            return
        }
        User.updateOne({username: req.body.params.username}, 
            {optedIn: true})
        .exec((err) => {
            if (err) {
                res.status(500).send({ message: err })
                return
            } 

            const token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 //24 hours
            })

            res.status(200).send({
                id: user._id,
                username: user.username,
                strikes: user.strikes,
                prevMatches: user.prevMatches,
                crush: "",
                optedIn: true,
                accessToken: token
            })
        })
    })
}

optOut = (req, res) => {
    User.findOne({
        username: req.body.params.username
    })
    .exec((err, user) => {
        if(err) {
            res.status(500).send({ message: err })
            return
        }
        User.updateOne({username: req.body.params.username}, 
            {optedIn: false})
        .exec((err) => {
            if (err) {
                res.status(500).send({ message: err })
                return
            } 

            const token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 86400 //24 hours
            })

            res.status(200).send({
                id: user._id,
                username: user.username,
                strikes: user.strikes,
                prevMatches: user.prevMatches,
                crush: "",
                optedIn: false,
                accessToken: token
            })
        })
    })
}

module.exports = {
    updateStrikes,
    deleteStrike,
    addCrush,
    deleteCrush,
    optIn,
    optOut
}
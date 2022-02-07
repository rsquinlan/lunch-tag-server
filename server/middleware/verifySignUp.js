const db = require("../models")
const User = db.user

//check for duplicate username on sign up
module.exports.checkDuplicate = (req, res, next) => {
    //username
    User.findOne({
        username: req.body.username
    }).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: error })
            return
        }
        if (user){
            res.status(400).send({ message: "Username already in use" })
        }

        next();
    })
}
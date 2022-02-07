const verifySignUp = require("../middleware/verifySignUp")
const controller = require("../controllers/auth-controller.js")
const express = require("express")
const app = express.Router()


app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    )
    next()
})

app.post("/api/auth/signup", 
    verifySignUp.checkDuplicate, 
    controller.signup
)

app.post("/api/auth/signin", controller.signin)

app.get("/api/auth/getUsers" , controller.getUsers)

app.get("/api/auth/getMatches", controller.getMatches)

module.exports = app
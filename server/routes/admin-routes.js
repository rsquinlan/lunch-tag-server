const controller = require("../controllers/admin-controller.js")
const express = require("express")
const app = express.Router()


app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    )
    next()
})

app.post("/api/admin/confirmMatches", controller.confirmMatches)

module.exports = app
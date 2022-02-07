const authJwt = require("../middleware/authJwt")
const express = require("express")
const app = express.Router()
const controller = require("../controllers/edit-controller.js")

app.use(function(req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
        );
        next();
})

app.get("/api/all", (req, res) => res.status(200).send("You need to log in to see anything :)"))

app.post("/api/updateStrikes", authJwt.verifyToken, controller.updateStrikes)

app.post("/api/deleteStrike", authJwt.verifyToken, controller.deleteStrike)

app.post("/api/addCrush", authJwt.verifyToken, controller.addCrush)

app.post("/api/delCrush", authJwt.verifyToken, controller.deleteCrush)

app.post("/api/optIn", authJwt.verifyToken, controller.optIn)

app.post("/api/optOut", authJwt.verifyToken, controller.optOut)

module.exports = app
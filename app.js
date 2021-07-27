require('./model/db')
const express = require("express")
const app = express()
const path = require("path")
const routes = require("./routes")
const PORT = process.env.PORT || 5000

app.get("/tokens/:passcode",routes.get_tokens)
app.get("/amount/:passcode",routes.get_amount)
app.get("/unit/:passcode",routes.get_unit)
app.get("/tuma/unit/:passcode/:unit",routes.post_unit)
app.get("/tuma/amount/:passcode/:amount",routes.post_amount)
app.get("/tuma/calculating/:amount/:passcode/:flag",routes.calculating_unit)
app.get("/tuma/threshold/:passcode/:threshold",routes.set_threshold)
app.get("/threshold/:passcode",routes.get_threshold)
app.get("/send/unit/:passcode/:flag",routes.send_unit)

app.listen(PORT)
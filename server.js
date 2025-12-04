var express = require("express")
var app = express()
var port = process.env.PORT || 8000

app.use(express.static("static"))

app.use(express.static("static"))
app.set("view engine", "ejs")

app.get("/", function(req, res) {
  res.status(200).render("landingPage")
})

app.get("/game", function(req, res) {
  res.status(200).render("game")
})

app.listen(port, function() {
  console.log("== Server listening on port", port)
})
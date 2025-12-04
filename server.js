var express = require("express")
var app = express()
var port = process.env.PORT || 8000

var scoreData = require("./dummyData.json")

app.use(express.static("static"))

app.use(express.static("static"))
app.set("view engine", "ejs")

app.get("/", function(req, res) {
  res.status(200).render("landingPage")
})

app.get("/game", function(req, res) {
  res.status(200).render("game", {
    scoreData: scoreData
  })
})

app.get("*splat", function(req, res) {
  res.status(404).render("404")
})

app.listen(port, function() {
  console.log("== Server listening on port", port)
})
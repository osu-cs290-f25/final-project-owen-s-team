var express = require("express")
var app = express()
var fs = require("fs")
var port = process.env.PORT || 8000

var scoreData = require("./scoreData.json")

app.use(express.json())
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

app.get("/get-score-data", function(req, res) {
  fs.readFile("./scoreData.json", function (err, data) {
    if (err) {
      res.status(500).send("Error reading score data")
    } else {
      res.json(JSON.parse(data))
    }
  })
})

app.post("/save-score", function(req, res, next) {
  if (req.body && req.body.username && req.body.score != null && req.body.time && req.body.difficulty) {
    var newScore = {
      username: req.body.username,
      score: req.body.score,
      time: req.body.time,
      difficulty: req.body.difficulty
    }
    scoreData.push(newScore)
    fs.writeFileSync(
      "./scoreData.json",
      JSON.stringify(scoreData, null, 2)
    )
    
    res.status(200).send("Score saved successfully!")
  } else {
    res.status(400).send("Request body failed")
  }
})

app.get("*splat", function(req, res) {
  res.status(404).render("404")
})

app.listen(port, function() {
  console.log("== Server listening on port", port)
})
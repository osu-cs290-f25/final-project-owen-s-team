const modalBackdrop = document.getElementById("end-modal-backdrop")
const counterElement = document.getElementById("counter-number")
const timerElement = document.getElementById("timer-number")

const playAgainButton = document.getElementById("play-again")
const openSettingsButton = document.getElementById("open-settings")
const startRoundButton = document.getElementById("start-round")

const endModalViewScoreboardButton = document.getElementById("view-scoreboard-button")
const scoreboardModal = document.getElementById("scoreboard-modal")
const closeScoreboardButton = document.getElementById("close-scoreboard-button")
const personalButton = document.getElementById("personal-button")
const globalButton = document.getElementById("global-button")

const scoreboardFilterButton = document.getElementById("scoreboard-filter-button")
const scoreboardUsernameInput = document.getElementById("scoreboard-username-input")

const gameEndModal = document.getElementById("game-end-modal")
const saveScoreButton = document.getElementById("save-score-button")
const saveScoreModal = document.getElementById("save-score-modal")
const saveScoreModalBackdrop = document.getElementById("save-score-modal-backdrop")
const cancelSaveScoreButton = document.getElementById("cancel-save-score")
const userNameInputField = document.getElementById("username-input")
const submitSaveScoreButton = document.getElementById("submit-save-score")

const settingsModal = document.getElementById("settings-modal")
const colorSelect = document.getElementById("color-selection")
const applySettingsButton = document.getElementById("apply-settings-button")
var settingsOpenedFromGameEndModal;

const gameWindow = document.getElementById("game-window")

const endGameButton = document.getElementById("end-game-button")
const gearButton = document.getElementById("gear-icon")

const difficultySelect = document.getElementById("difficulty-selection")
const timeSelect = document.getElementById("time-selection")

var selectedTime = 10000
var selectedDifficulty = "Easy"

var minRadius = 70
var maxRadius = 100
var timeLeft = selectedTime
var counter = 0
let timerInterval = null

const colorMap = {
  "Default": "#f6e6c8",
  "Red": "#e74c3c",
  "Green": "#2ecc71",
  "Blue": "#3498db",
  "Black": "#000000",
  "White": "#ffffff",
  "Orange": "#f39c12"
};

const clickSound = new Audio("/sounds/click.wav");
const closeSound = new Audio("/sounds/close.wav");
const selectBoxesSound = new Audio("/sounds/selectBoxes.wav");
const missSound = new Audio("/sounds/miss.wav");

var gameRunning = false
var savedScore = false

timerElement.textContent = (timeLeft / 1000).toFixed(1)
counterElement.textContent = counter

playAgainButton.addEventListener("click", function() {
  document.getElementById("game-end-modal").classList.add("hidden")
  modalBackdrop.classList.add("hidden")

  startGame()
  selectBoxesSound.currentTime = 0;
  selectBoxesSound.play();
})

endGameButton.addEventListener("click", function() {
  timeLeft = 0;
})

gearButton.addEventListener("click", function() {
  if (!gameRunning) {
    scoreboardModal.classList.add("hidden")
    document.getElementById("settings-modal").classList.remove("hidden")
    modalBackdrop.classList.toggle("hidden")
    settingsOpenedFromGameEndModal = false;
  }
  selectBoxesSound.currentTime = 0;
  selectBoxesSound.play();
})

function spawnMissAlert(x, y) {
  var missAlert = document.createElement("p")
  missAlert.classList.add("miss-alert")
  missAlert.textContent = "-1"
  missAlert.style.top = y + "px"
  missAlert.style.left = x + "px"
  gameWindow.appendChild(missAlert)
}

gameWindow.addEventListener("click", function(event) {
  if (event.target != event.currentTarget) return // exit if the event is inherited from a child
  if (gameRunning) {
    const rect = gameWindow.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top 
    spawnMissAlert(x, y)
    counter--
    counterElement.textContent = counter
  }
  missSound.currentTime = 0;
  missSound.play();
})

startRoundButton.addEventListener("click", function() {
  gameRunning = true
  startRoundButton.classList.add("hidden")
  startTimer()
  generateRandomTarget()
  selectBoxesSound.currentTime = 0;
  selectBoxesSound.play();
})

saveScoreButton.addEventListener("click", function() {
  if (savedScore) {
    alert("Already saved score.")
  } else {
    saveScoreModal.classList.remove("hidden")
    saveScoreModalBackdrop.classList.remove("hidden")
  }
  selectBoxesSound.currentTime = 0;
  selectBoxesSound.play();
})

function hideSaveScoreModal() {
  saveScoreModal.classList.add("hidden")
  saveScoreModalBackdrop.classList.add("hidden")
  userNameInputField.value = ""
  selectBoxesSound.currentTime = 0;
  selectBoxesSound.play();
}

cancelSaveScoreButton.addEventListener("click", hideSaveScoreModal)

submitSaveScoreButton.addEventListener("click", function() {
  // Send score, username, difficulty, and time to server -> server will append data to a json file
  var username = userNameInputField.value.trim()

  if (!username) {
    alert("You must enter a username to save score!")
  } else {

    // send json data to server to be saved
    sendScoreData(username)
    savedScore = true
  
    hideSaveScoreModal()
  }
  selectBoxesSound.currentTime = 0;
  selectBoxesSound.play();
})

openSettingsButton.addEventListener("click", function() {
  settingsOpenedFromGameEndModal = true;
  gameEndModal.classList.add("hidden")
  settingsModal.classList.remove("hidden")

  selectBoxesSound.currentTime = 0;
  selectBoxesSound.play();
})



applySettingsButton.addEventListener("click", function() {
  // track difficulty and time selection for use later when adding data for scoreboard
  selectedDifficulty = difficultySelect.value
  selectedTime = parseInt(timeSelect.value) * 1000
  
  const selectedColorName = colorSelect.value;
  const selectedColor = colorMap[selectedColorName] || selectedColorName;
  document.documentElement.style.setProperty("--target-color", selectedColor);

  if (selectedDifficulty === "Easy") {
    minRadius = 70
    maxRadius = 100
  } else if (selectedDifficulty === "Medium") {
    minRadius = 30
    maxRadius = 70
  } else if (selectedDifficulty === "Hard") {
    minRadius = 10
    maxRadius = 40
  }

  timeLeft = selectedTime

  timerElement.textContent = (timeLeft / 1000).toFixed(1)
  
  if (settingsOpenedFromGameEndModal) {
    gameEndModal.classList.remove("hidden")
  }
  // settings was opened with gear icon on game play screen -> remove modal backdrop
  else {
    modalBackdrop.classList.add("hidden")
  }
  settingsModal.classList.add("hidden")

  selectBoxesSound.currentTime = 0;
  selectBoxesSound.play();
})

endModalViewScoreboardButton.addEventListener("click", function() {
  gameEndModal.classList.toggle("hidden")
  scoreboardModal.classList.toggle("hidden")

  loadScoreData() // populate scoreboard list
  selectBoxesSound.currentTime = 0;
  selectBoxesSound.play();
})

closeScoreboardButton.addEventListener("click", function () {
  scoreboardModal.classList.add("hidden")
  gameEndModal.classList.remove("hidden")
  closeSound.currentTime = 0;
  closeSound.play();
})

personalButton.addEventListener("click", function() {
  if (scoreboardUsernameInput.value)
  {
    personalButton.classList.add("selected-scoreboard-type")
    globalButton.classList.remove("selected-scoreboard-type")

    // populate scoreboard
    loadScoreData()
  } else {
    alert("You must input a username to view personal scores!")
  }
  selectBoxesSound.currentTime = 0;
  selectBoxesSound.play();
})

globalButton.addEventListener("click", function() {
  globalButton.classList.add("selected-scoreboard-type")
  personalButton.classList.remove("selected-scoreboard-type")
  
  // populate scorebaord
  loadScoreData()
  selectBoxesSound.currentTime = 0;
  selectBoxesSound.play();
})

scoreboardFilterButton.addEventListener("click", loadScoreData)

function startGame() {
  clearInterval(timerInterval)
  counter = 0
  timeLeft = selectedTime
  savedScore = false

  counterElement.textContent = counter
  timerElement.textContent = (timeLeft / 1000).toFixed(1)

  //Removes the target and any miss alerts remaining on screen from last game
  document.querySelectorAll(".target").forEach(t => t.remove())
  document.querySelectorAll(".miss-alert").forEach(m => m.remove())

  startRoundButton.classList.remove("hidden")
  
}

function startTimer() {
  const tickRate = 100; // update every 100ms

  timerInterval = setInterval(function() {

    if (timeLeft <= 0) {
      endGame()
      return
    }

    timeLeft -= tickRate
    timerElement.textContent = (timeLeft / 1000).toFixed(1)
  }, tickRate)
}

function endGame() {
  clearInterval(timerInterval)

  gameRunning = false

  document.getElementById("final-score").textContent = counter
  modalBackdrop.classList.remove("hidden")
  document.getElementById("game-end-modal").classList.remove("hidden")
  selectBoxesSound.currentTime = 0;
  selectBoxesSound.play();
}

function handleClick(event) {
  event.currentTarget.remove()
  counter++
  counterElement.textContent = counter
  generateRandomTarget()
  clickSound.currentTime = 0;
  clickSound.play();
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomTarget() {
  var target = document.createElement("button")

  var radius = getRandomInt(minRadius, maxRadius).toString() + "px"

  target.classList.add("target")
  target.style.top = getRandomInt(10, 90).toString() + "%"
  target.style.left = getRandomInt(5, 95).toString() + "%"
  target.style.height = radius
  target.style.width = radius

  target.addEventListener("click", handleClick)
  document.getElementById("game-window").appendChild(target)
}

// Scoreboard Handling
function sendScoreData(username) {
  var reqUrl = "/save-score"
  fetch(reqUrl, {
    method: "POST",
    body: JSON.stringify({
      username: username,
      score: counter,
      time: selectedTime / 1000,
      difficulty: selectedDifficulty
    }),
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function(res) {
    if (res.status === 200) {
      alert("Score saved successfully!")

    } else {
      alert("An error occured saving the score")
    }
  }).catch(function(err) {
    alert("An error occured saving the score")
  })
}

function renderGlobalScores(scores, difficulty, time) {
  // clear current scoreboard
  var scoreboardListContainer = document.getElementById("scoreboard-list-container")
  scoreboardListContainer.innerHTML = "" 

  // track place counter
  place = 1;

  var seenUsers = []

  scores.forEach((game) => {
    // Add relevant games only (selected difficulty/time, one score per username)
    if (game.difficulty === difficulty && game.time.toString() === time && !seenUsers.includes(game.username)) {

      var scoreboardRowHTML = window.templates.scoreboardRowEntry({
        username: game.username,
        score: game.score,
        place: place
      })

      seenUsers.push(game.username)
      place++

      scoreboardListContainer.insertAdjacentHTML("beforeend", scoreboardRowHTML)
    }
  })
}

function renderPersonalScores(scores, difficulty, time, activeUser) {
  // clear current scoreboard
  var scoreboardListContainer = document.getElementById("scoreboard-list-container")
  scoreboardListContainer.innerHTML = "" 

  // track place counter
  place = 1;

  scores.forEach((game) => {
    // Add relevant games only (selected difficulty/time, username same as activeUser)
    if (game.difficulty === difficulty && game.time.toString() === time && (game.username === activeUser)) {

      var scoreboardRowHTML = window.templates.scoreboardRowEntry({
        username: game.username,
        score: game.score,
        place: place
      })
      
      place++

      scoreboardListContainer.insertAdjacentHTML("beforeend", scoreboardRowHTML)
    }
  })
}

function updateScoreboard(scores) {
  // store filter info
  var selectedScoreboardTime = document.getElementById("selected-scoreboard-time").value
  var selectedScoreboardDifficulty = document.getElementById("selected-scoreboard-difficulty").value

  // person vs global scores being displayed
  var personal = personalButton.classList.contains("selected-scoreboard-type")

  // populate scoreboard appropriately based on scoreboard type
  if (personal) {
    renderPersonalScores(scores, selectedScoreboardDifficulty, selectedScoreboardTime, scoreboardUsernameInput.value)
  }
  else {
    renderGlobalScores(scores, selectedScoreboardDifficulty, selectedScoreboardTime)
  }
}

// get score data as an array from the server, sort it, and store in scoreData variable
function loadScoreData() {
  fetch("/get-score-data")
    .then(function(res) {
      return res.json() // parses json data into an array of objects that gets passed into the next .then
    })
    .then(function(scores) {
      // sort scores
      scores.sort((a, b) => b.score - a.score) // if negative, a before b, if positive, b before add

      updateScoreboard(scores) // update scoreboard to hold any new
    })
}

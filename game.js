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

const gameEndModal = document.getElementById("game-end-modal")
const saveScoreButton = document.getElementById("save-score-button")
const saveScoreModal = document.getElementById("save-score-modal")
const saveScoreModalBackdrop = document.getElementById("save-score-modal-backdrop")
const cancelSaveScoreButton = document.getElementById("cancel-save-score")
const userNameInputField = document.getElementById("username-input")
const submitSaveScoreButton = document.getElementById("submit-save-score")

const settingsModal = document.getElementById("settings-modal")
const applySettingsButton = document.getElementById("apply-settings-button")
var settingsOpenedFromGameEndModal;

const gameWindow = document.getElementById("game-window")

const endGameButton = document.getElementById("end-game-button")
const gearButton = document.getElementById("gear-icon")

const minRadius = 30
const maxRadius = 70
var timeLeft = 15000
var counter = 0
let timerInterval = null

var gameRunning = false

timerElement.textContent = (timeLeft / 1000).toFixed(1)
counterElement.textContent = counter

playAgainButton.addEventListener("click", function() {
  document.getElementById("game-end-modal").classList.add("hidden")
  modalBackdrop.classList.add("hidden")

  startGame()
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
})

startRoundButton.addEventListener("click", function() {
  gameRunning = true
  startRoundButton.classList.add("hidden")
  startTimer()
  generateRandomTarget()
})

saveScoreButton.addEventListener("click", function() {
  saveScoreModal.classList.remove("hidden")
  saveScoreModalBackdrop.classList.remove("hidden")
})

function hideSaveScoreModal() {
  saveScoreModal.classList.add("hidden")
  saveScoreModalBackdrop.classList.add("hidden")
  userNameInputField.value = ""
}

cancelSaveScoreButton.addEventListener("click", hideSaveScoreModal)

submitSaveScoreButton.addEventListener("click", function() {
  // Send score, username, difficulty, and time to server -> server will append data to a json file
  hideSaveScoreModal()
})

openSettingsButton.addEventListener("click", function() {
  settingsOpenedFromGameEndModal = true;
  gameEndModal.classList.add("hidden")
  settingsModal.classList.remove("hidden")
})

applySettingsButton.addEventListener("click", function() {
  // track difficulty and time selection for use later when adding data for scoreboard
  
  if (settingsOpenedFromGameEndModal) {
    gameEndModal.classList.remove("hidden")
  }
  // settings was opened with gear icon on game play screen -> remove modal backdrop
  else {
    modalBackdrop.classList.add("hidden")
  }
  settingsModal.classList.add("hidden")
})

endModalViewScoreboardButton.addEventListener("click", function() {
  scoreboardModal.classList.toggle("hidden")
})

closeScoreboardButton.addEventListener("click", function () {
  scoreboardModal.classList.add("hidden")
})

personalButton.addEventListener("click", function() {
  personalButton.classList.add("selected-scoreboard-type")
  globalButton.classList.remove("selected-scoreboard-type")
})

globalButton.addEventListener("click", function() {
  globalButton.classList.add("selected-scoreboard-type")
  personalButton.classList.remove("selected-scoreboard-type")
})

function startGame() {
  clearInterval(timerInterval)
  counter = 0
  timeLeft = 15000

  counterElement.textContent = counter
  timerElement.textContent = (timeLeft / 1000).toFixed(1)

  //Removes the target remaining on screen from last game
  document.querySelectorAll(".target").forEach(t => t.remove())

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
}

function handleClick(event) {
  event.currentTarget.remove()
  counter++
  counterElement.textContent = counter
  generateRandomTarget()
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


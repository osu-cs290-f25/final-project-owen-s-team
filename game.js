const modalBackdrop = document.getElementById("end-modal-backdrop")
const counterElement = document.getElementById("counter-number")
const timerElement = document.getElementById("timer-number")

const startButton = document.getElementById("play-button")
const playAgainButton = document.getElementById("play-again")
const settingsButton = document.getElementById("settings")
const startRoundButton = document.getElementById("start-round")

const gameWindow = document.getElementById("game-window")

const gearButton = document.getElementById("gear-icon")
const mainButton = document.getElementById("main-menu-button")

const minRadius = 30
const maxRadius = 70
var timeLeft = 15000
var counter = 0
let timerInterval = null

timerElement.textContent = (timeLeft / 1000).toFixed(1)
counterElement.textContent = "Score: " + counter

startButton.addEventListener("click", function () {
  document.getElementById("game-begin-modal").classList.add("hidden")
  modalBackdrop.classList.add("hidden")

  startGame()
})

playAgainButton.addEventListener("click", function() {
  document.getElementById("game-end-modal").classList.add("hidden")
  modalBackdrop.classList.add("hidden")

  startGame()
})

settingsButton.addEventListener("click", function() {
  document.getElementById("game-end-modal").classList.add("hidden")
  document.getElementById("settings-modal").classList.remove("hidden")
})

gearButton.addEventListener("click", function() {
  document.getElementById("game-begin-modal").classList.add("hidden")
  document.getElementById("settings-modal").classList.remove("hidden")
  modalBackdrop.classList.toggle("hidden")
})

mainButton.addEventListener("click", function() {
  document.getElementById("settings-modal").classList.add("hidden")
  document.getElementById("game-begin-modal").classList.remove("hidden")
})

startRoundButton.addEventListener("click", function() {
  startRoundButton.classList.add("hidden")
  startTimer()
  generateRandomTarget()
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


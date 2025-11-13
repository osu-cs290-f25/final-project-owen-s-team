const firstTarget = document.getElementById("first-target")

const minRadius = 30;
const maxRadius = 70;

var timeLeft = 30;
document.getElementById("timer").text = timeLeft

var counter = 0;
var counterElement = document.getElementById("counter")

firstTarget.addEventListener("click", handleClick)

setInterval(function() {

  if (timeLeft === 0) {
    // game end modal
    return
  }

  timer = document.getElementById("timer")
  timeLeft--
  timer.textContent = timeLeft
}, 1000);

function handleClick(event) {
  event.currentTarget.remove()
  counter++

  counterElement.textContent = "counter: " + counter

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
const firstTarget = document.getElementById("first-target")

console.log(firstTarget)

firstTarget.addEventListener("click", handleClick)

function handleClick(event) {
  event.currentTarget.remove()

  generateRandomTarget()
}

function generateRandomTarget() {
  var target = document.createElement("button")

  target.classList.add("target")
  target.style.top = getRandomInt(0, 100).toString() + "%"
  target.style.left = getRandomInt(0, 100).toString() + "%"

  target.addEventListener("click", handleClick)
  document.getElementsByTagName("body").appendChild(target)
}

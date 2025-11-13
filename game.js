const firstTarget = document.getElementById("first-target")

console.log(firstTarget)

firstTarget.addEventListener("click", handleClick)

function handleClick(event) {
  event.currentTarget.remove()

  
}

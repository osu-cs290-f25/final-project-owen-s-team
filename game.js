const firstTarget = getElementById("first-target")

firstTarget.addEventListener("click", handleClick)


function handleClick(event) {
    event.currentTarget.remove()
}

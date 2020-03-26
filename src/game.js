let canvas = null
let context = null
let inputs = {"w": false, "a": false, "s": false, "d": false, "e": false}
let x = 0
let y = 0
const keys = {
    87: "w",
    65: "a",
    83: "s",
    68: "d",
    69: "e"
}
const upm = 15
let deltatime = 0
let time = new Date().getTime()
let acx = 0
let acy = 0
const movespeed = 0.3
const centerx = 500
const centery = 250

function keystomove(step) {
    let vec = [0, 0]
    if (inputs["w"]) {
        vec[1] = -step
    }
    if (inputs["s"]) {
        vec[1] = step
    }
    if (inputs["a"]) {
        vec[0] = -step
    }
    if (inputs["d"]) {
        vec[0] = step
    }
    return vec
}

function frictionstep(coef) {
    acx -= coef * acx * deltatime
    acy -= coef * acy * deltatime
}

function loop() {
    deltatime = new Date().getTime() - time
    let move = keystomove(movespeed)
    for (child in canvas.children) {
        canvas.innerHTML = ""
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
    acx += move[0] * deltatime
    acy += move[1] * deltatime
    frictionstep(0.02)
    x += acx
    y += acy
    for (i in level.entities) {
        let entity = level.entities[i]
        drawimg(entity["name"], entity["x"], entity["y"], entity["scale"], entity["dynamic"])
    }
    drawimg("greg.png", x, y, 1, true)
    time = new Date().getTime()
}

function drawimg(source, xpos, ypos, scale, dynamic) {
    let img = document.createElement("img")
    img.parentElement = canvas
    img.src = source
    if (dynamic) {
        xpos -= (x - centerx)
        ypos -= (y - centery)
    }
    context.drawImage(img, xpos, ypos, img.width * scale, img.height * scale)
}

function main() {
    console.log(new PacketBuilder({"shortcut": "ack"}).getjson())
    canvas = document.getElementById("canvas")
    context = canvas.getContext("2d")
    setInterval(loop, upm)
}

document.addEventListener("DOMContentLoaded", main);
document.addEventListener("keydown", function(event) {
    inputs[keys[event.keyCode]] = true
})
document.addEventListener("keyup", function(event) {
    inputs[keys[event.keyCode]] = false
})
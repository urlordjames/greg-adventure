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
const url = new URL(window.location.href);
const serverscript = "ws://" + url.hostname + ":" + url.port
let level = {}
let auth = genauth()
let playerid = -1

function genauth() {
    let ranstring = ""
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    for(var i = 0; i < 16; i++) {
        ranstring += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return ranstring
}

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
    context.clearRect(0, 0, canvas.width, canvas.height)
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

function drawplayers() {
    if (level.players.length > 0) {
        return level
    }
    for (pid in level.players) {
        if (pid == playerid) {
            continue
        }
        let player = level.players[pid]
        level.entities.push({"name": "greg.png", "x": player["x"], "y": player["y"], "id": pid, "scale": 1, "dynamic": true})
    }
    return level
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

function sendpacket(data) {
    let socket = new WebSocket(serverscript)
    let tosend = buildpacket(data)
    socket.onopen = function(e) {
        socket.send(tosend)
        socket.close()
    }
}

function getnextid(playerid) {
    console.log("getting id from server...")
    let socket = new WebSocket(serverscript)
    let tosend = buildpacket({"shortcut": "getid", "id": playerid, "auth": auth})
    socket.onopen = function(e) {
        socket.send(tosend)
    }
    let promise = new Promise(function (resolve, reject) {
    socket.onmessage = function(e) {
        let id = JSON.parse(e.data)["id"]
            console.log("got id " + id)
            resolve(id)
        }
        socket.onerror = function(e) {
            reject(new Error("bad things have happened"))
        }
    })
    return promise
}

function updatepos(socket, id) {
    let tosend = buildpacket({"shortcut": "move", "x" : x, "y": y, "acx" : acx, "acy": acy, "id": id, "auth": auth})
    socket.send(tosend)
}

function possocket(playerid) {
    let socket = new WebSocket(serverscript)
    socket.onopen = function(e) {
        setInterval(function () {updatepos(socket, playerid)}, upm * 5)
    }
}

function sync(playerid) {
    let socket = new WebSocket(serverscript)
    let tosend = buildpacket({"shortcut": "syncreq", "id": playerid, "auth": auth})
    socket.onopen = function(e) {
        socket.send(tosend)
    }
    socket.onmessage = function(e) {
        level = JSON.parse(e.data)["lvl"]
        level = drawplayers(level)
    }
}

function main() {
    canvas = document.getElementById("canvas")
    context = canvas.getContext("2d")
    let idprmose = getnextid()
    idprmose.then(function (resolvedid) {
        playerid = resolvedid
        setInterval(loop, upm)
        console.log(playerid)
        sync(playerid)
        possocket(playerid)
    })
}

document.addEventListener("DOMContentLoaded", main)
document.addEventListener("keydown", function(event) {
    inputs[keys[event.keyCode]] = true
})
document.addEventListener("keyup", function(event) {
    inputs[keys[event.keyCode]] = false
})
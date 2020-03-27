const http = require("http")
const serveStatic = require("serve-static")
const finalhandler = require("finalhandler")
const WebSocket = require("ws")
const url = require('url')
const packet = require("./libs/packet.js")
const main = require("./main.js")

let egg = 100
let egg2 = -100

let level = main.level

setInterval(function() {
    egg = Math.floor(Math.random() * Math.floor(100))
    egg2 = Math.floor(Math.random() * Math.floor(100))
    level["entities"] = [{"name": "cheezethem.png", "x": egg, "y": egg2, "scale": 1, "dynamic": true}]
}, 100)
setInterval(function() {
    level["players"] = {}
}, 1000)

let connections = {}

var serve = serveStatic(__dirname, {"index": ["index.html"]})

var server = http.createServer()

const wss = new WebSocket.Server({noServer: true})

function authenticate(msg) {
    if (msg["auth"] != undefined && connections[msg["id"]] != undefined && connections[msg["id"]]["auth"] === msg["auth"]) {
        return true
    }
    else {
        console.log("invalid auth")
        console.log(msg)
        return false
    }
}

wss.on("connection", function(ws) {
    ws.on("message", function (message) {
        let msg = JSON.parse(message)
        switch (msg["type"]) {
            case "sync":
                if (!authenticate(msg)) {ws.close(); break}
                let interval = setInterval(function () {
                    ws.send(packet.buildpacket({"shortcut": "sync", "gamestate": level}))
                }, 30)
                ws.onclose = function () {
                    clearInterval(interval)
                    delete connections[msg["id"]]
                }
                break
            case "move":
                if (!authenticate(msg)) {ws.close(); break}
                level["players"][msg["id"]] = {"x": msg["x"], "y": msg["y"]}
                break
            case "getid":
                let id = Math.floor(Math.random() * Math.floor(999999))
                while (id in connections) {
                    id = Math.floor(Math.random() * Math.floor(999999))
                }
                console.log(msg["auth"])
                if (msg["auth"] == undefined) {
                    ws.close()
                    break
                }
                connections[id] = {}
                connections[id]["auth"] = msg["auth"]
                ws.send(packet.buildpacket({"shortcut": "setid", "id": id}))
                ws.close()
                break
            default:
                ws.close()
                break
        }
    })
})

server.on("request", function (req, res) {
    serve(req, res, finalhandler(req, res))
})

server.on("upgrade", function (request, socket, head) {
    const pathname = url.parse(request.url).pathname

    wss.handleUpgrade(request, socket, head, function (ws) {
        wss.emit("connection", ws, request)
    })
})

server.listen(8080)
const http = require("http")
const serveStatic = require("serve-static")
const finalhandler = require("finalhandler")
const WebSocket = require("ws")
const url = require('url');
const packet = require("./libs/packet.js")

let egg = 100
let egg2 = -100

setInterval(function() {
    egg = Math.floor(Math.random() * Math.floor(100))
    egg2 = Math.floor(Math.random() * Math.floor(100))
}, 1000)

var serve = serveStatic(__dirname, {"index": ["index.html"]})

var server = http.createServer()

const wss = new WebSocket.Server({noServer: true})

wss.on("connection", ws => {
    ws.on("message", message => {
        console.log(message)
        let level = {"entities": [{"name": "cheezethem.png", "x": egg, "y": egg2, "scale": 1, "dynamic": true}, {"name": "cheezethem.png", "x": 0, "y": 100, "scale": 1, "dynamic": true}, {"name": "cheezethem.png", "x": 100, "y": 100, "scale": 1, "dynamic": true}]}
        ws.send(packet.buildpacket({"shortcut": "sync", "gamestate": level}))
        ws.close()
    })
})

server.on("request", function (req, res) {
    serve(req, res, finalhandler(req, res))
})

server.on("upgrade", function (request, socket, head) {
    const pathname = url.parse(request.url).pathname;

    wss.handleUpgrade(request, socket, head, function (ws) {
        wss.emit("connection", ws, request)
    })
})

server.listen(8080)
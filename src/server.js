var connect = require("connect")
var serveStatic = require("serve-static")
var PacketBuilder = require("./libs/packet.js").PacketBuilder
const WebSocket = require("ws")
const wss = new WebSocket.Server({ port: 81 })

wss.on("connection", ws => {
    ws.on("message", message => {
        console.log(message)
    })
    ws.send(new PacketBuilder({"shortcut": "ack"}).getjson())
})

connect().use(serveStatic(__dirname)).listen(80, function(){
    console.log('Server running on 80...')
});
/*client
console.log("if you find an issues, please submit them at https://github.com/urlordjames/greg-adventure/issues")
clientend*/
function buildpacket(data) {
    if ("shortcut" in data) {
        switch (data["shortcut"]) {
            case "ack":
                packet = {"type": "ack", "status": true}
                break
            case "nack":
                packet = {"type": "ack", "status": false}
                break
            case "syncreq":
                packet = {"type": "sync", "id": data["id"], "auth": data["auth"]}
                break
            case "sync":
                packet = {"type": "sync", "lvl": data["gamestate"]}
                break
            case "move":
                packet = {"type": "move", "x": data["x"], "y": data["y"], "acx": data["acx"], "acy": data["acy"], "id": data["id"], "auth": data["auth"]}
                break
            case "getid":
                packet = {"type": "getid", "auth": data["auth"]}
                break
            case "setid":
                packet = {"type": "giveid", "id": data["id"]}
                break
        }
    }
    else {
        let packet = data
    }
    return JSON.stringify(packet)
}

/*client
/*
clientend*/
exports.buildpacket = buildpacket //*/
/*client
console.log("if you find an issues, please submit them at https://github.com/urlordjames/greg-adventure/issues")
clientend*/
class PacketBuilder {
    constructor(data) {
        if ("shortcut" in data) {
            switch (data["shortcut"]) {
                case "ack":
                    this.data = {"type": "ack", "status": true}
                    break
                case "nack":
                    this.data = {"type": "ack", "status": false}
                    break
            }
        }
        else {
            this.data = data
        }
    }
    getjson() {
        return JSON.stringify(this.data)
    }
}
/*client
console.log("hello, this is the client's script")
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
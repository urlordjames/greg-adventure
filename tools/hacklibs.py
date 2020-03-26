export = ["packet.js"]

def clientify(lines):
    newlines = []
    startmarker = -0
    for i, line in enumerate(lines):
        if line == "/*client":
            startmarker = i
            continue
        if line == "clientend*/":
            for clietline in lines[startmarker + 1:i]:
                newlines.append(clietline)
            startmarker = -1
            continue
        if startmarker > -1:
            continue
        newlines.append(line)
    newcode = ""
    for line in newlines:
        newcode += line + "\n"
    return newcode

for script in export:
    f = open("./src/libs/" + script, "r")
    lines = []
    for line in f.read().split("\n"):
        lines.append(line)
    f.close()
    f = open("./src/libs/client" + script, "w")
    f.write(clientify(lines))
    f.close()
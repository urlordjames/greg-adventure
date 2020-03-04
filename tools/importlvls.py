export = ["main.level"]

for level in export:
    f = open("./levels/" + level, "r")
    lvl = "const level = " + f.read()
    f.close()
    f = open("./src/" + level[:-5] + "js", "w")
    lvl = lvl.replace("'dynamic': True", "'dynamic': true")
    lvl = lvl.replace("'dynamic': False", "'dynamic': false")
    f.write(lvl)
    f.close()
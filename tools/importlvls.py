export = ["main.level"]

for level in export:
    f = open("./levels/" + level, "r")
    lvl = f.read()
    f.close()
    f = open("./src/" + level[:-5] + "js", "w")
    f.write(lvl)
    f.close()
import pygame

pygame.init()
screen = pygame.display.set_mode((1000, 500))
done = False
f = open("./levels/main.level", "r")
level = eval(f.read())
f.close()

movespeed = 5

images = {}

for ent in level["entities"]:
    if not ent["name"] in images:
        images.update({ent["name"]: pygame.image.load("./src/" + ent["name"])})

clock = pygame.time.Clock()
camera = [0, 0]

def move():
    if keys[pygame.K_LEFT]:
        camera[0] -= movespeed
    if keys[pygame.K_RIGHT]:
        camera[0] += movespeed
    if keys[pygame.K_UP]:
        camera[1] -= movespeed
    if keys[pygame.K_DOWN]:
        camera[1] += movespeed

def transform(x, y):
    return (x + (500 - camera[0]), y + (250 - camera[1]))

selected = 0

while not done:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            f = open("./levels/main.level", "w")
            f.write(str(level))
            f.close()
            done = True
        if pygame.mouse.get_pressed()[0]:
            for i, ent in enumerate(level["entities"]):
                x, y = pygame.mouse.get_pos()
                if images[ent["name"]].get_rect(topleft=transform(ent["x"], ent["y"])).collidepoint(x, y):
                    selected = i
            print(selected)
    keys = pygame.key.get_pressed()
    move()
    screen.fill((255, 255, 255))
    for ent in level["entities"]:
        screen.blit(images[ent["name"]], transform(ent["x"], ent["y"]))
    pygame.display.update()
    pygame.display.flip()
    clock.tick(60)
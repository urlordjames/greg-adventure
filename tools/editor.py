import pygame
import copy

pygame.init()
screen = pygame.display.set_mode((1000, 500))
done = False
f = open("./levels/main.level", "r")
level = eval(f.read())
f.close()

undo = []

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

def getrectfroment(ent):
    return images[ent["name"]].get_rect(topleft=transform(ent["x"], ent["y"]))

def drawselection(i):
    ent = level["entities"][i]
    pygame.draw.rect(screen, (255, 0, 0), getrectfroment(ent), 10)

def copystate():
    undo.append(copy.deepcopy(level))

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
                if getrectfroment(ent).collidepoint(x, y):
                    selected = i
        if event.type == pygame.KEYDOWN:
            if event.key == pygame.K_d:
                copystate()
                del level["entities"][selected]
                selected = 0
                print("delete")
            if event.key == pygame.K_z:
                level = undo[-1]
                del undo[-1]
                print("undo")
    keys = pygame.key.get_pressed()
    move()
    screen.fill((255, 255, 255))
    for ent in level["entities"]:
        screen.blit(images[ent["name"]], transform(ent["x"], ent["y"]))
    drawselection(selected)
    pygame.display.update()
    pygame.display.flip()
    clock.tick(60)
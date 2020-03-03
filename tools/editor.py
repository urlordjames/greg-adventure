import pygame

pygame.init()
screen = pygame.display.set_mode((1000, 500))
done = False
level = {
    "entities": [
        {"name": "cheezethem.png", 
        "x": -100,
        "y": 100,
        "scale":1,
        "dynamic": True},
        {"name": "cheezethem.png", 
        "x": 0,
        "y": 100,
        "scale":1,
        "dynamic": True},
        {"name": "cheezethem.png", 
        "x": 100,
        "y": 100,
        "scale":1,
        "dynamic": True}
    ]
}

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

while not done:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            done = True
        if pygame.mouse.get_pressed()[0]:
            print(pygame.mouse.get_pos())
    keys = pygame.key.get_pressed()
    move()
    screen.fill((255, 255, 255))
    for ent in level["entities"]:
        screen.blit(images[ent["name"]], (ent["x"] + (500 - camera[0]), ent["y"] + (250 - camera[1])))
    pygame.display.update()
    pygame.display.flip()
    clock.tick(60)
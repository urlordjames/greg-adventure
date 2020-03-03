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

images = {}

for ent in level["entities"]:
    if not ent["name"] in images:
        images.update({ent["name"]: pygame.image.load("./src/" + ent["name"])})

clock = pygame.time.Clock()

while not done:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            done = True
        if pygame.mouse.get_pressed()[0]:
            print(pygame.mouse.get_pos())
    for ent in level["entities"]:
        screen.blit(images[ent["name"]], (ent["x"] + 500, ent["y"] + 250))
    screen.fill((255, 255, 255))
    pygame.display.update()
    pygame.display.flip()
    clock.tick(60)
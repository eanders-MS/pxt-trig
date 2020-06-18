let y = 0
let x = 0
let angle = 0
let radius = 30
let mySprite = sprites.create(img`
    . . . . c c c b b b b b . . . .
    . . c c b 4 4 4 4 4 4 b b b . .
    . c c 4 4 4 4 4 5 4 4 4 4 b c .
    . e 4 4 4 4 4 4 4 4 4 5 4 4 e .
    e b 4 5 4 4 5 4 4 4 4 4 4 4 b c
    e b 4 4 4 4 4 4 4 4 4 4 5 4 4 e
    e b b 4 4 4 4 4 4 4 4 4 4 4 b e
    . e b 4 4 4 4 4 5 4 4 4 4 b e .
    8 7 e e b 4 4 4 4 4 4 b e e 6 8
    8 7 2 e e e e e e e e e e 2 7 8
    e 6 6 2 2 2 2 2 2 2 2 2 2 6 c e
    e c 6 7 6 6 7 7 7 6 6 7 6 c c e
    e b e 8 8 c c 8 8 c c c 8 e b e
    e e b e c c e e e e e c e b e e
    . e e b b 4 4 4 4 4 4 4 4 e e .
    . . . c c c c c e e e e e . . .
`, SpriteKind.Player)
game.onUpdate(function () {
    radius = radius - controller.dy()
    if (radius < 0) {
        radius = 0
    }
    if (radius > scene.screenHeight() / 2) {
        radius = scene.screenHeight() / 2
    }
    angle = angle + controller.dx()
    x = Math.round(scene.screenWidth() / 2 + trig.cos(angle) * radius)
    y = Math.round(scene.screenHeight() / 2 + trig.sin(angle) * radius)
    mySprite.setPosition(x, y)
})

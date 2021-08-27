namespace SpriteKind {
    export const Chicken = SpriteKind.create()
    export const Label = SpriteKind.create()
    export const Heart = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile4`, function (sprite, location) {
    item_name = sprites.readDataString(sprite, "held")
    if (controller.A.isPressed() && !(item_name)) {
        chicken_item = sprites.create(img`
            . 2 2 . 2 2 . 
            2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 
            . 2 2 2 2 2 . 
            . . 2 2 2 . . 
            . . . 2 . . . 
            `, SpriteKind.Heart)
        chicken_item.setFlag(SpriteFlag.GhostThroughWalls, true)
        tiles.placeOnTile(chicken_item, location)
        chicken_item.follow(sprite)
        chicken_item.z = 15
        sprites.setDataString(sprite, "held", "pet")
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Chicken, function (sprite, otherSprite) {
    if (controller.A.isPressed()) {
        chicken_want = sprites.readDataSprite(otherSprite, "label")
        if (chicken_want && sprites.readDataString(sprite, "held") == sprites.readDataString(otherSprite, "want")) {
            chicken_want.destroy(effects.hearts, 300)
            chicken_item.destroy()
            sprites.setDataString(sprite, "held", "")
            sprites.setDataString(otherSprite, "want", "")
            sprites.setDataSprite(otherSprite, "label", null)
            info.changeScoreBy(1)
            music.magicWand.play()
            if (info.score() == 30) {
                game.over(true)
            }
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile5`, function (sprite, location) {
    item_name = sprites.readDataString(sprite, "held")
    if (controller.A.isPressed() && !(item_name)) {
        chicken_item = sprites.create(img`
            . . . e . . . 
            . . e e e . . 
            . . e e e . . 
            . e e e e e . 
            . e e e e e . 
            . . e e e . . 
            `, SpriteKind.Heart)
        chicken_item.setFlag(SpriteFlag.GhostThroughWalls, true)
        tiles.placeOnTile(chicken_item, location)
        chicken_item.follow(sprite)
        chicken_item.z = 15
        sprites.setDataString(sprite, "held", "food")
    }
})
function make_chicken () {
    rand = randint(0, chicken_images.length - 1)
    this_chicken = sprites.create(chicken_images[rand], SpriteKind.Chicken)
    this_chicken.setBounceOnWall(true)
    sprites.setDataNumber(this_chicken, "index", rand)
    tiles.placeOnTile(this_chicken, tiles.getTileLocation(randint(3, 16), randint(3, 11)))
}
let want: Sprite = null
let this_chicken: Sprite = null
let rand = 0
let chicken_want: Sprite = null
let chicken_item: Sprite = null
let item_name = ""
let chicken_images: Image[] = []
scene.setBackgroundColor(7)
tiles.setSmallTilemap(tilemap`level2`)
chicken_images = [img`
    . . 2 . . . . . . . . . . . 
    . 2 2 . . . . . . . . . . . 
    . 1 1 1 . . . . . . . . . . 
    . 1 f 1 . . . . . . . 1 1 . 
    5 1 1 1 1 . . . . . 1 1 1 1 
    . . 2 1 1 1 1 1 1 1 1 1 . . 
    . . 1 1 d 1 1 1 1 1 1 . . . 
    . . 1 1 d 1 1 1 1 d 1 . . . 
    . . 1 1 1 d d d 1 1 1 . . . 
    . . . 1 1 1 1 1 1 1 . . . . 
    . . . . 1 1 1 1 1 . . . . . 
    . . . . 4 . 4 . . . . . . . 
    . . . . . . 4 . . . . . . . 
    `, img`
    . . . . 5 . . . . . . . . . 
    . . 5 5 . . . . . . . . . . 
    . . e e e . . . . . . . . . 
    . c e f e e . . . . . . . . 
    c c e e e e . . . . . . . . 
    . . e e e 4 . . . . . . . . 
    . . 4 2 4 4 4 . . . . e 2 . 
    . . 4 4 2 4 e e e e e 2 2 2 
    . . 2 2 2 e 4 4 4 4 e 4 2 2 
    . . 2 2 2 2 e 2 4 4 4 2 4 4 
    . . . 2 2 2 2 e e e e 4 4 . 
    . . . 2 2 2 2 2 2 2 2 4 . . 
    . . . . . 2 2 2 2 4 4 . . . 
    . . . . . . 5 . 5 . . . . . 
    . . . . . . 5 . 5 . . . . . 
    `, img`
    . . . . . . . . 5 . . . . . . . 
    . . . . . . . 5 . . . . . . . . 
    . . . . . . 5 . . . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . f 1 1 . . . . . . . 
    . . . . 4 4 1 1 1 . . . . . . . 
    . . . . . . 2 1 1 1 . . . . . . 
    . . . . . . 2 1 1 1 1 . . . . . 
    . . . . . . . 1 1 1 1 1 . . . . 
    . . . . . . . 1 1 1 1 1 1 . . . 
    . . . . . . . 1 1 1 1 1 1 1 . . 
    . . . . . . . . 1 1 1 1 1 1 . . 
    . . . . . . . . 4 . . . . 4 . . 
    . . . . . . . . 4 . . . . 4 . . 
    . . . . . . . . 4 . . . . 4 . . 
    . . . . . . . . . . . . . . . . 
    `]
let chicken_walk = [[img`
    . . 2 . . . . . . . . . . . 
    . 2 2 . . . . . . . . . . . 
    . 1 1 1 . . . . . . . . . . 
    . 1 f 1 . . . . . . . 1 1 . 
    5 1 1 1 1 . . . . . 1 1 1 1 
    . . 2 1 1 1 1 1 1 1 1 1 . . 
    . . 1 1 d 1 1 1 1 1 1 . . . 
    . . 1 1 d 1 1 1 1 d 1 . . . 
    . . 1 1 1 d d d 1 1 1 . . . 
    . . . 1 1 1 1 1 1 1 . . . . 
    . . . . 1 1 1 1 1 . . . . . 
    . . . . 4 . 4 . . . . . . . 
    . . . . . . 4 . . . . . . . 
    `,img`
    . . . 2 . . . . . . . . . . 
    . . 2 2 . . . . . . . . . . 
    . . 1 1 1 . . . . . . . . . 
    . . 1 f 1 . . . . . . 1 1 . 
    . 5 1 1 1 . . . . . 1 1 1 1 
    . . 2 1 1 1 1 1 1 1 1 1 . . 
    . . 1 1 d 1 1 1 1 1 1 . . . 
    . . 1 1 d 1 1 1 1 d 1 . . . 
    . . 1 1 1 d d d 1 1 1 . . . 
    . . . 1 1 1 1 1 1 1 . . . . 
    . . . . 1 1 1 1 1 . . . . . 
    . . . . 4 . 4 . . . . . . . 
    . . . . 4 . . . . . . . . . 
    `], [img`
    . . . . 5 . . . . . . . . . 
    . . 5 5 . . . . . . . . . . 
    . . e e e . . . . . . . . . 
    . c e f e e . . . . . . . . 
    c c e e e e . . . . . . . . 
    . . e e e 4 . . . . . . . . 
    . . 4 2 4 4 4 . . . . e 2 . 
    . . 4 4 2 4 e e e e e 2 2 2 
    . . 2 2 2 e 4 4 4 4 e 4 2 2 
    . . 2 2 2 2 e 2 4 4 4 2 4 4 
    . . . 2 2 2 2 e e e e 4 4 . 
    . . . 2 2 2 2 2 2 2 2 4 . . 
    . . . . . 2 2 2 2 4 4 . . . 
    . . . . . . 5 . . . . . . . 
    . . . . . . 5 . . . . . . . 
    `,img`
    . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . 
    . . . . 5 . . . . . . . . . 
    . . 5 5 . . . . . . . . . . 
    . . e e e . . . . . . . . . 
    . c e f e e . . . . . . . . 
    c c e e e e . . . . . . . . 
    . . e e e 4 4 . . . . e 2 . 
    . . 4 4 2 4 e e e e e 2 2 2 
    . . 2 2 2 e 4 4 4 4 e 4 2 2 
    . . 2 2 2 2 e 2 4 4 4 2 4 4 
    . . . 2 2 2 2 e e e e 4 4 . 
    . . . 2 2 2 2 2 2 2 2 4 . . 
    . . . . . 2 2 2 2 4 4 . . . 
    . . . . . . 5 . . . . . . . 
    `,img`
    . . . . 5 . . . . . . . . . 
    . . 5 5 . . . . . . . . . . 
    . . e e e . . . . . . . . . 
    . c e f e e . . . . . . . . 
    c c e e e e . . . . . . . . 
    . . e e e 4 . . . . . . . . 
    . . 4 2 4 4 4 . . . . e 2 . 
    . . 4 4 2 4 e e e e e 2 2 2 
    . . 2 2 2 e 4 4 4 4 e 4 2 2 
    . . 2 2 2 2 e 2 4 4 4 2 4 4 
    . . . 2 2 2 2 e e e e 4 4 . 
    . . . 2 2 2 2 2 2 2 2 4 . . 
    . . . . . 2 2 2 2 4 4 . . . 
    . . . . . . 5 . . . . . . . 
    . . . . . . 5 . . . . . . . 
    `,img`
    . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . 
    . . . . 5 . . . . . . . . . 
    . . 5 5 . . . . . . . . . . 
    . . e e e . . . . . . . . . 
    . c e f e e . . . . . . . . 
    c c e e e e . . . . . . . . 
    . . e e e 4 4 . . . . e 2 . 
    . . 4 4 2 4 e e e e e 2 2 2 
    . . 2 2 2 e 4 4 4 4 e 4 2 2 
    . . 2 2 2 2 e 2 4 4 4 2 4 4 
    . . . 2 2 2 2 e e e e 4 4 . 
    . . . 2 2 2 2 2 2 2 2 4 . . 
    . . . . . 2 2 2 2 4 4 . . . 
    . . . . . . 5 . . . . . . . 
    `,img`
    . . . . 5 . . . . . . . . . 
    . . 5 5 . . . . . . . . . . 
    . . e e e . . . . . . . . . 
    . c e f e e . . . . . . . . 
    c c e e e e . . . . . . . . 
    . . e e e 4 . . . . . . . . 
    . . 4 2 4 4 4 . . . . e 2 . 
    . . 4 4 2 4 e e e e e 2 2 2 
    . . 2 2 2 e 4 4 4 4 e 4 2 2 
    . . 2 2 2 2 e 2 4 4 4 2 4 4 
    . . . 2 2 2 2 e e e e 4 4 . 
    . . . 2 2 2 2 2 2 2 2 4 . . 
    . . . . . 2 2 2 2 4 4 . . . 
    . . . . . . . . 5 . . . . . 
    . . . . . . . . 5 . . . . . 
    `,img`
    . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . 
    . . . . 5 . . . . . . . . . 
    . . 5 5 . . . . . . . . . . 
    . . e e e . . . . . . . . . 
    . c e f e e . . . . . . . . 
    c c e e e e . . . . . . . . 
    . . e e e 4 4 . . . . e 2 . 
    . . 4 4 2 4 e e e e e 2 2 2 
    . . 2 2 2 e 4 4 4 4 e 4 2 2 
    . . 2 2 2 2 e 2 4 4 4 2 4 4 
    . . . 2 2 2 2 e e e e 4 4 . 
    . . . 2 2 2 2 2 2 2 2 4 . . 
    . . . . . 2 2 2 2 4 4 . . . 
    . . . . . . . . 5 . . . . . 
    `,img`
    . . . . 5 . . . . . . . . . 
    . . 5 5 . . . . . . . . . . 
    . . e e e . . . . . . . . . 
    . c e f e e . . . . . . . . 
    c c e e e e . . . . . . . . 
    . . e e e 4 . . . . . . . . 
    . . 4 2 4 4 4 . . . . e 2 . 
    . . 4 4 2 4 e e e e e 2 2 2 
    . . 2 2 2 e 4 4 4 4 e 4 2 2 
    . . 2 2 2 2 e 2 4 4 4 2 4 4 
    . . . 2 2 2 2 e e e e 4 4 . 
    . . . 2 2 2 2 2 2 2 2 4 . . 
    . . . . . 2 2 2 2 4 4 . . . 
    . . . . . . . . 5 . . . . . 
    . . . . . . . . 5 . . . . . 
    `,img`
    . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . 
    . . . . 5 . . . . . . . . . 
    . . 5 5 . . . . . . . . . . 
    . . e e e . . . . . . . . . 
    . c e f e e . . . . . . . . 
    c c e e e e . . . . . . . . 
    . . e e e 4 4 . . . . e 2 . 
    . . 4 4 2 4 e e e e e 2 2 2 
    . . 2 2 2 e 4 4 4 4 e 4 2 2 
    . . 2 2 2 2 e 2 4 4 4 2 4 4 
    . . . 2 2 2 2 e e e e 4 4 . 
    . . . 2 2 2 2 2 2 2 2 4 . . 
    . . . . . 2 2 2 2 4 4 . . . 
    . . . . . . . . 5 . . . . . 
    `], [img`
    . . . . . . . . 5 . . . . . . . 
    . . . . . . . 5 . . . . . . . . 
    . . . . . . 5 . . . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . f 1 1 . . . . . . . 
    . . . . 4 4 1 1 1 . . . . . . . 
    . . . . . . 2 1 1 1 . . . . . . 
    . . . . . . 2 1 1 1 1 . . . . . 
    . . . . . . . 1 1 1 1 1 . . . . 
    . . . . . . . 1 1 1 1 1 1 . . . 
    . . . . . . . 1 1 1 1 1 1 1 . . 
    . . . . . . . . 1 1 1 1 1 1 . . 
    . . . . . . . . 4 . . . . 4 . . 
    . . . . . . . . 4 . . . . 4 . . 
    . . . . . . . . 4 . . . . 4 . . 
    . . . . . . . . . . . . . . . . 
    `,img`
    . . . . . . . . 5 . . . . . . . 
    . . . . . . . 5 . . . . . . . . 
    . . . . . . 5 . . . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . f 1 1 . . . . . . . 
    . . . . 4 4 1 1 1 . . . . . . . 
    . . . . . . 2 1 1 1 . . . . . . 
    . . . . . . 2 1 1 1 1 . . . . . 
    . . . . . . . 1 1 1 1 1 . . . . 
    . . . . . . . 1 1 1 1 1 1 . . . 
    . . . . . . . 1 1 1 1 1 1 1 . . 
    . . . . . . . . 1 1 1 1 1 1 . . 
    . . . . . . . . 4 . . . . 4 . . 
    . . . . . . . . 4 . . . 4 4 . . 
    . . . . . . . . 4 . . . 4 4 . . 
    . . . . . . . . . . . . . . . . 
    `,img`
    . . . . . . . . 5 . . . . . . . 
    . . . . . . . 5 . . . . . . . . 
    . . . . . . 5 . . . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . f 1 1 . . . . . . . 
    . . . . 4 4 1 1 1 . . . . . . . 
    . . . . . . 2 1 1 1 . . . . . . 
    . . . . . . 2 1 1 1 1 . . . . . 
    . . . . . . . 1 1 1 1 1 . . . . 
    . . . . . . . 1 1 1 1 1 1 . . . 
    . . . . . . . 1 1 1 1 1 1 1 . . 
    . . . . . . . . 1 1 1 1 1 1 . . 
    . . . . . . . . 4 . . . . 4 . . 
    . . . . . . . 4 . . . . 4 . . . 
    . . . . . . . 4 . . . . 4 . . . 
    . . . . . . . . . . . . . . . . 
    `,img`
    . . . . . . . 5 . . . . . . . . 
    . . . . . . 5 . . . . . . . . . 
    . . . . . 5 . . . . . . . . . . 
    . . . . . 1 1 1 . . . . . . . . 
    . . . . . f 1 1 . . . . . . . . 
    . . . 4 4 1 1 1 . . . . . . . . 
    . . . . . 2 . 1 1 1 . . . . . . 
    . . . . . 2 . 1 1 1 1 . . . . . 
    . . . . . . . 1 1 1 1 1 . . . . 
    . . . . . . . 1 1 1 1 1 1 . . . 
    . . . . . . . 1 1 1 1 1 1 1 . . 
    . . . . . . . . 1 1 1 1 1 1 . . 
    . . . . . . . . 4 . . . . 4 . . 
    . . . . . . . 4 . . . . 4 . . . 
    . . . . . . . 4 . . . . 4 . . . 
    . . . . . . . . . . . . . . . . 
    `,img`
    . . . . . . . 5 . . . . . . . . 
    . . . . . . 5 . . . . . . . . . 
    . . . . . 5 . . . . . . . . . . 
    . . . . . 1 1 1 . . . . . . . . 
    . . . . . f 1 1 . . . . . . . . 
    . . . 4 4 1 1 1 . . . . . . . . 
    . . . . . 2 . 1 1 1 . . . . . . 
    . . . . . 2 . 1 1 1 1 . . . . . 
    . . . . . . . 1 1 1 1 1 . . . . 
    . . . . . . . 1 1 1 1 1 1 . . . 
    . . . . . . . 1 1 1 1 1 1 1 . . 
    . . . . . . . . 1 1 1 1 1 1 . . 
    . . . . . . . . 4 . . . . 4 . . 
    . . . . . . . 4 . . . . . 4 . . 
    . . . . . . . 4 . . . . . 4 . . 
    . . . . . . . . . . . . . . . . 
    `,img`
    . . . . . . . 5 . . . . . . . . 
    . . . . . . 5 . . . . . . . . . 
    . . . . . 5 . . . . . . . . . . 
    . . . . . 1 1 1 . . . . . . . . 
    . . . . . f 1 1 . . . . . . . . 
    . . . 4 4 1 1 1 . . . . . . . . 
    . . . . . 2 . 1 1 1 . . . . . . 
    . . . . . 2 . 1 1 1 1 . . . . . 
    . . . . . . . 1 1 1 1 1 . . . . 
    . . . . . . . 1 1 1 1 1 1 . . . 
    . . . . . . . 1 1 1 1 1 1 1 . . 
    . . . . . . . . 1 1 1 1 1 1 . . 
    . . . . . . . . 4 . . . . 4 . . 
    . . . . . . . . 4 . . . . 4 . . 
    . . . . . . . . 4 . . . . 4 . . 
    . . . . . . . . . . . . . . . . 
    `,img`
    . . . . . . . . 5 . . . . . . . 
    . . . . . . . 5 . . . . . . . . 
    . . . . . . 5 . . . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . f 1 1 . . . . . . . 
    . . . . 4 4 1 1 1 . . . . . . . 
    . . . . . . 2 1 1 1 . . . . . . 
    . . . . . . 2 1 1 1 1 . . . . . 
    . . . . . . . 1 1 1 1 1 . . . . 
    . . . . . . . 1 1 1 1 1 1 . . . 
    . . . . . . . 1 1 1 1 1 1 1 . . 
    . . . . . . . . 1 1 1 1 1 1 . . 
    . . . . . . . . 4 . . . . 4 . . 
    . . . . . . . . 4 . . . . 4 . . 
    . . . . . . . . 4 . . . . 4 . . 
    . . . . . . . . . . . . . . . . 
    `]]
let chicken_peck = [[img`
    . . . 2 . . . . . . . . . . 
    . . 2 2 . . . . . . . . . . 
    . . 1 1 1 . . . . . . . . . 
    . . 1 f 1 . . . . . . . 1 1 
    . 5 1 1 1 1 . . . . . 1 1 1 
    . . . 2 1 1 1 1 1 1 1 1 1 . 
    . . . 1 1 d 1 1 1 1 1 1 . . 
    . . . 1 1 d 1 1 1 1 d 1 . . 
    . . . 1 1 1 d d d 1 1 1 . . 
    . . . . 1 1 1 1 1 1 1 . . . 
    . . . . . 1 1 1 1 1 . . . . 
    . . . . . 4 . 4 . . . . . . 
    . . . . . 4 . 4 . . . . . . 
    `,img`
    . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . 
    . . . . . . . . . . 1 1 1 1 
    . . . . . . . . 1 1 1 1 1 . 
    . . . . 1 1 1 1 1 1 1 1 . . 
    . . . 1 1 d 1 1 1 1 1 1 . . 
    . . 1 1 1 d 1 1 1 1 d 1 . . 
    . 1 1 1 1 1 d d d 1 1 1 . . 
    2 1 f 1 2 1 1 1 1 1 1 . . . 
    2 1 1 1 . 1 1 1 1 1 . . . . 
    . . 5 . . 4 . 4 . . . . . . 
    . . . . . 4 . 4 . . . . . . 
    `], [img`
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . 5 5 5 . . . . . . . . . . 
    . . e e e . . . . . . . . . . 
    . c e f e e . . . . . . . . . 
    c c e e e e . . . . . . . . . 
    . . e e e 4 4 4 . . . . e 2 . 
    . . . 4 4 2 4 e e e e e 2 2 2 
    . . . 2 2 2 e 4 4 4 4 e 4 2 2 
    . . . 2 2 2 2 e 2 4 4 4 2 4 4 
    . . . . 2 2 2 2 e e e e 4 4 . 
    . . . . 2 2 2 2 2 2 2 2 4 . . 
    . . . . . . 2 2 2 2 4 4 . . . 
    . . . . . . . 5 . 5 . . . . . 
    . . . . . . . 5 . 5 . . . . . 
    `,img`
    . . . . . 5 . . . . . . . . . 
    . . . 5 5 . . . . . . . . . . 
    . . . e e e . . . . . . . . . 
    . . c e f e e . . . . . . . . 
    . c c e e e e . . . . . . . . 
    . . . e e e 4 . . . . . . . . 
    . . . 4 2 4 4 4 . . . . e 2 . 
    . . . 4 4 2 4 e e e e e 2 2 2 
    . . . 2 2 2 e 4 4 4 4 e 4 2 2 
    . . . 2 2 2 2 e 2 4 4 4 2 4 4 
    . . . . 2 2 2 2 e e e e 4 4 . 
    . . . . 2 2 2 2 2 2 2 2 4 . . 
    . . . . . . 2 2 2 2 4 4 . . . 
    . . . . . . . 5 . 5 . . . . . 
    . . . . . . . 5 . 5 . . . . . 
    `], [img`
    . . . . . . . . 5 . . . . . . . 
    . . . . . . . 5 . . . . . . . . 
    . . . . . . 5 . . . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . f 1 1 . . . . . . . 
    . . . . 4 4 1 1 1 . . . . . . . 
    . . . . . . 2 1 1 1 . . . . . . 
    . . . . . . 2 1 1 1 1 . . . . . 
    . . . . . . . 1 1 1 1 1 . . . . 
    . . . . . . . 1 1 1 1 1 1 . . . 
    . . . . . . . 1 1 1 1 1 1 1 . . 
    . . . . . . . . 1 1 1 1 1 1 . . 
    . . . . . . . . 4 . . . . 4 . . 
    . . . . . . . . 4 . . . . 4 . . 
    . . . . . . . . 4 . . . . 4 . . 
    . . . . . . . . . . . . . . . . 
    `,img`
    . . . . . . . . 5 . . . . . . . 
    . . . . . . . 5 . . . . . . . . 
    . . . . . . 5 . . . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . f 1 1 . . . . . . . 
    . . . . 4 4 1 1 1 . . . . . . . 
    . . . . . . 2 1 1 1 . . . . . . 
    . . . . . . 2 1 1 1 1 . . . . . 
    . . . . . . . 1 1 1 1 1 . . . . 
    . . . . . . . 1 1 1 1 1 1 . . . 
    . . . . . . . 1 1 1 1 1 1 1 . . 
    . . . . . . . . 1 1 1 1 1 1 . . 
    . . . . . . . . 4 . . . . 4 . . 
    . . . . . . . . 4 . . . . 4 . . 
    . . . . . . . . 4 . . . . 4 . . 
    . . . . . . . . . . . . . . . . 
    `,img`
    . . . . . . . . 5 . . . . . . . 
    . . . . . . . 5 . . . . . . . . 
    . . . . . . 5 . . . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . f 1 1 . . . . . . . 
    . . . . 4 4 1 1 1 . . . . . . . 
    . . . . . . 2 1 1 1 . . . . . . 
    . . . . . . 2 1 1 1 1 . . . . . 
    . . . . . . . 1 1 1 1 1 . . . . 
    . . . . . . . 1 1 1 1 1 1 . . . 
    . . . . . . . 1 1 1 1 1 1 1 . . 
    . . . . . . . . 1 1 1 1 1 1 . . 
    . . . . . . . . 4 . . . . 4 . . 
    . . . . . . . . 4 . . . . 4 . . 
    . . . . . . . . 4 . . . . 4 . . 
    . . . . . . . . . . . . . . . . 
    `,img`
    . . . . . . . 5 . . . . . . . . 
    . . . . . . 5 . . . . . . . . . 
    . . . . . 5 . . . . . . . . . . 
    . . . . . 1 1 1 . . . . . . . . 
    . . . . . f 1 1 . . . . . . . . 
    . . . 4 4 1 1 1 . . . . . . . . 
    . . . . . 2 . 1 1 1 . . . . . . 
    . . . . . 2 . 1 1 1 1 . . . . . 
    . . . . . . . 1 1 1 1 1 . . . . 
    . . . . . . . 1 1 1 1 1 1 . . . 
    . . . . . . . 1 1 1 1 1 1 1 . . 
    . . . . . . . . 1 1 1 1 1 1 . . 
    . . . . . . . . 4 . . . . 4 . . 
    . . . . . . . . 4 . . . . 4 . . 
    . . . . . . . . 4 . . . . 4 . . 
    . . . . . . . . . . . . . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    5 . . 1 1 1 1 1 1 1 . . . . . . 
    . 5 . 1 1 1 1 1 1 1 1 . . . . . 
    . . 5 1 f 1 2 2 1 1 1 1 . . . . 
    . . . . . 4 . 1 1 1 1 1 1 . . . 
    . . . . . 4 . 1 1 1 1 1 1 1 . . 
    . . . . . . . . 1 1 1 1 1 1 . . 
    . . . . . . . . 4 . . . . 4 . . 
    . . . . . . . . 4 . . . . 4 . . 
    . . . . . . . . 4 . . . . 4 . . 
    . . . . . . . . . . . . . . . . 
    `,img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . 1 1 . . . . . . 
    . . . . . . . 1 1 1 1 . . . . . 
    . . . . . . 1 1 1 1 1 1 . . . . 
    . . . . . 1 1 1 1 1 1 1 1 . . . 
    5 . . 1 1 1 1 1 1 1 1 1 1 1 . . 
    . 5 . 1 1 1 1 1 1 1 1 1 1 1 . . 
    . . 5 1 f 1 2 2 4 . . . . 4 . . 
    . . . . . 4 . . 4 . . . . 4 . . 
    . . . . . 4 . . 4 . . . . 4 . . 
    . . . . . . . . . . . . . . . . 
    `]]
for (let index = 0; index < 6; index++) {
    make_chicken()
}
let hand = sprites.create(img`
    . . . f . f . . . 
    . . f 1 f 1 f f . 
    . . f 1 f 1 f 1 f 
    . . f 1 f 1 f 1 f 
    . f f 1 f 1 f 1 f 
    f 1 f 1 f 1 f 1 f 
    f 1 f 1 1 1 1 1 f 
    f 1 1 1 1 1 1 1 f 
    f 1 1 1 1 1 1 1 f 
    . f 1 1 1 1 1 1 f 
    . . f 1 1 1 1 1 f 
    . . . f f f f f . 
    `, SpriteKind.Player)
hand.setFlag(SpriteFlag.GhostThroughWalls, true)
controller.moveSprite(hand)
hand.z = 10
game.onUpdate(function () {
    for (let value of sprites.allOfKind(SpriteKind.Chicken)) {
        chicken_want = sprites.readDataSprite(value, "label")
        if (chicken_want) {
            chicken_want.setPosition(value.x, value.y - 16)
        }
    }
})
game.onUpdateInterval(5000, function () {
    for (let value of sprites.allOfKind(SpriteKind.Chicken)) {
        chicken_want = sprites.readDataSprite(value, "label")
        if (!(chicken_want)) {
            if (Math.percentChance(10)) {
                rand = randint(0, 1)
                if (rand == 0) {
                    want = sprites.create(img`
                        . . 1 1 1 1 1 1 1 1 1 1 1 . . 
                        . 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
                        . 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
                        1 1 1 7 7 7 1 1 1 7 7 7 1 1 1 
                        1 1 1 7 7 7 7 1 7 7 7 7 1 1 1 
                        1 1 1 1 1 1 7 7 7 1 1 1 1 1 1 
                        1 1 1 1 1 1 1 7 1 1 1 1 1 1 1 
                        1 1 1 1 1 1 1 7 1 1 1 1 1 1 1 
                        . 1 1 1 1 1 1 7 1 1 1 1 1 1 . 
                        . 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
                        . . 1 1 1 1 1 1 1 1 1 1 1 . . 
                        . . . . . . 1 1 1 . . . . . . 
                        . . . . . . . 1 . . . . . . . 
                        . . . . . . . 1 . . . . . . . 
                        . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . 
                        `, SpriteKind.Label)
                    sprites.setDataString(value, "want", "food")
                } else if (rand == 1) {
                    want = sprites.create(img`
                        . . 1 1 1 1 1 1 1 1 1 1 1 . . 
                        . 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
                        . 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
                        1 1 1 1 1 2 2 1 2 2 1 1 1 1 1 
                        1 1 1 1 2 2 2 2 2 2 2 1 1 1 1 
                        1 1 1 1 2 2 2 2 2 2 2 1 1 1 1 
                        1 1 1 1 1 2 2 2 2 2 1 1 1 1 1 
                        1 1 1 1 1 1 2 2 2 1 1 1 1 1 1 
                        . 1 1 1 1 1 1 2 1 1 1 1 1 1 . 
                        . 1 1 1 1 1 1 1 1 1 1 1 1 1 . 
                        . . 1 1 1 1 1 1 1 1 1 1 1 . . 
                        . . . . . . 1 1 1 . . . . . . 
                        . . . . . . . 1 . . . . . . . 
                        . . . . . . . 1 . . . . . . . 
                        . . . . . . . . . . . . . . . 
                        . . . . . . . . . . . . . . . 
                        `, SpriteKind.Label)
                    sprites.setDataString(value, "want", "pet")
                }
                sprites.setDataSprite(value, "label", want)
            }
        }
    }
})
game.onUpdateInterval(2000, function () {
    for (let value of sprites.allOfKind(SpriteKind.Chicken)) {
        rand = randint(0, 2)
        if (rand == 1) {
            value.setVelocity(randint(-15, 15), randint(-15, 15))
            animation.runImageAnimation(
            value,
            chicken_walk[sprites.readDataNumber(value, "index")],
            300,
            true
            )
        } else if (rand == 2) {
            value.setVelocity(0, 0)
            animation.runImageAnimation(
            value,
            chicken_peck[sprites.readDataNumber(value, "index")],
            200,
            true
            )
        }
    }
})
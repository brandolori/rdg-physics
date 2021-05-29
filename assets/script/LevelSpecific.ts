const { ccclass, property } = cc._decorator;

@ccclass("PendingSpriteFrame")
class PendingSpriteFrame {
    @property(cc.Sprite)
    sprite: cc.Sprite = null

    @property(cc.SpriteFrame)
    frame: cc.SpriteFrame = null
}

@ccclass
export default class LevelSpecific extends cc.Component {

    static instance: LevelSpecific

    @property
    gameOverString = ""

    @property
    gameWinString = ""

    @property
    shareEndString = ""

    @property([PendingSpriteFrame])
    pendingSprites: PendingSpriteFrame[] = []


    onLoad() {
        LevelSpecific.instance = this

        this.pendingSprites.forEach(el => el.sprite.spriteFrame = el.frame)
    }

}

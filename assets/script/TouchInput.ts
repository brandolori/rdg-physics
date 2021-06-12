import PlayerControl from "./PlayerControl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TouchInput extends cc.Component {

    @property(cc.Node)
    leftButton: cc.Node = null

    @property(cc.Node)
    rightButton: cc.Node = null

    @property(cc.Node)
    jumpButton: cc.Node = null

    player: PlayerControl

    onLoad() {
        if (!("ontouchstart" in window)) {
            this.node.active = false
            return
        }

        this.player = cc.director.getScene().getComponentInChildren(PlayerControl)

        // start
        this.leftButton.on(cc.Node.EventType.TOUCH_START, () => this.player.leftPressed = true)
        this.rightButton.on(cc.Node.EventType.TOUCH_START, () => this.player.rightPressed = true)
        this.jumpButton.on(cc.Node.EventType.TOUCH_START, () => this.player.upPressed = true)

        // end and cancel
        this.leftButton.on(cc.Node.EventType.TOUCH_END, () => this.player.leftPressed = false)
        this.leftButton.on(cc.Node.EventType.TOUCH_CANCEL, () => this.player.leftPressed = false)

        this.rightButton.on(cc.Node.EventType.TOUCH_END, () => this.player.rightPressed = false)
        this.rightButton.on(cc.Node.EventType.TOUCH_CANCEL, () => this.player.rightPressed = false)

        this.jumpButton.on(cc.Node.EventType.TOUCH_END, () => this.player.upPressed = false)
        this.jumpButton.on(cc.Node.EventType.TOUCH_CANCEL, () => this.player.upPressed = false)
    }
}

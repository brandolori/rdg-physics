import PlayerControl from "./player_control";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TouchInput extends cc.Component {

    @property(cc.Node)
    leftButton: cc.Node = null

    @property(cc.Node)
    rightButton: cc.Node = null

    @property(cc.Node)
    jumpButton: cc.Node = null

    @property(PlayerControl)
    player: PlayerControl = null

    onLoad() {
        // start
        this.leftButton.on(cc.Node.EventType.TOUCH_START, () => this.player.moveLeft())
        this.rightButton.on(cc.Node.EventType.TOUCH_START, () => this.player.moveRight())
        this.jumpButton.on(cc.Node.EventType.TOUCH_START, () => this.player.jump())

        // end and cancel
        this.leftButton.on(cc.Node.EventType.TOUCH_END, () => this.player.stopLRMovement())
        this.leftButton.on(cc.Node.EventType.TOUCH_CANCEL, () => this.player.stopLRMovement())

        this.rightButton.on(cc.Node.EventType.TOUCH_END, () => this.player.stopLRMovement())
        this.rightButton.on(cc.Node.EventType.TOUCH_CANCEL, () => this.player.stopLRMovement())

        this.rightButton.on(cc.Node.EventType.TOUCH_END, () => this.player.stopLRMovement())
        this.rightButton.on(cc.Node.EventType.TOUCH_CANCEL, () => this.player.stopLRMovement())
    }
}

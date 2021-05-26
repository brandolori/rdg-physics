import Game from "../Game";

const { ccclass, property } = cc._decorator;

@ccclass
export default class LinearMovement extends cc.Component {

    @property(cc.Node)
    nodeA: cc.Node = null

    @property(cc.Node)
    nodeB: cc.Node = null

    @property(cc.Node)
    vessel: cc.Node = null

    @property
    speed = 100

    @property
    flip = false

    duration: number

    progress = 0


    start() {
        this.duration = this.nodeA.position.sub(this.nodeB.position).mag() / this.speed
    }

    update(dt: number) {
        if (Game.instance.state != "active")
            return

        this.progress = (this.progress + dt / this.duration) % 1

        const x = Math.abs(1 - this.progress * 2)
        
        this.vessel.x = cc.misc.lerp(this.nodeA.x, this.nodeB.x, x)
        this.vessel.y = cc.misc.lerp(this.nodeA.y, this.nodeB.y, x)

        if (this.flip)
            this.vessel.scaleX = this.progress < .5 ? -1 : 1
    }

}

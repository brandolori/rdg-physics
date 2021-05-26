import Game from "../Game";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PingPong extends cc.Component {

    @property(cc.Node)
    nodeB: cc.Node = null

    @property(cc.Prefab)
    prefab: cc.Prefab = null

    vessel: cc.Node

    @property
    speed = 100

    @property
    flip = false

    duration: number

    progress = 0

    posA = cc.Vec3.ZERO


    start() {
        this.duration = this.posA.sub(this.nodeB.position).mag() / this.speed

        this.vessel = cc.instantiate(this.prefab)
        this.vessel.parent = this.node
    }

    update(dt: number) {
        if (Game.instance.state != "active")
            return

        this.progress = (this.progress + dt / this.duration) % 1

        const x = Math.abs(1 - this.progress * 2)
        this.vessel.x = cc.misc.lerp(this.posA.x, this.nodeB.x, x)
        this.vessel.y = cc.misc.lerp(this.posA.y, this.nodeB.y, x)

        if (this.flip)
            this.vessel.scaleX = this.progress < .5 ? -1 : 1

    }

}

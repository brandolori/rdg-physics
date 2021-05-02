import Game from "./Game";

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
    duration = 5

    progress = 0


    update(dt: number) {
        if (Game.instance.state != "active")
            return

        this.progress = (this.progress + dt / this.duration) % 1

        const x = Math.abs(1 - this.progress * 2)
        this.vessel.x = cc.misc.lerp(this.nodeA.x, this.nodeB.x, x)
        this.vessel.y = cc.misc.lerp(this.nodeA.y, this.nodeB.y, x)

    }

}

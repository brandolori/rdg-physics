import PlayerControl from "./PlayerControl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CameraControls extends cc.Component {

    playerNode: cc.Node

    @property([cc.Node])
    bgArray: cc.Node[] = []

    // @property(cc.Node)
    // backBGLayer: cc.Node = null

    // @property(cc.Node)
    // midBGLayer: cc.Node = null

    @property
    lerpFactor = 10

    @property
    minHeight = -200

    @property
    maxHeight = 400

    onLoad() {
        this.playerNode = cc.director.getScene().getComponentInChildren(PlayerControl).node
    }

    lateUpdate(dt: number) {

        const directionOffset = this.playerNode.getComponent(cc.RigidBody).linearVelocity.x * .1

        const playerPosition = this.playerNode.getPosition()

        let targetPosition = playerPosition.add(cc.Vec2.RIGHT.mul(directionOffset))

        targetPosition.y = cc.misc.clampf(targetPosition.y, this.minHeight, this.maxHeight);

        let currentPosition = this.node.getPosition();

        currentPosition.lerp(targetPosition, this.lerpFactor * dt, currentPosition);

        this.node.setPosition(currentPosition);

        this.bgArray.forEach((el, index) => {
            el.setPosition(currentPosition.x / Math.pow(2, index + 1), currentPosition.y / Math.pow(2, index + 1))
        })
    }
}

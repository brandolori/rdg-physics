import PlayerControl from "./PlayerControl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CameraControls extends cc.Component {

    playerNode: cc.Node

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

        // this.backBGLayer.setPosition(current_position.x / 2, current_position.y / 2);

        // this.midBGLayer.setPosition(current_position.x / 4, current_position.y / 4);

    }
}

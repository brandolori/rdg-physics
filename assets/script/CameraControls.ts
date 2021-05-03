const { ccclass, property } = cc._decorator;

@ccclass
export default class CameraControls extends cc.Component {

    @property(cc.Node)
    playerNode: cc.Node = null

    @property(cc.Node)
    backBGLayer: cc.Node = null

    @property(cc.Node)
    midBGLayer: cc.Node = null

    @property
    lerpFactor = 10

    @property
    minHeight = -200

    @property
    maxHeight = 400

    update(dt: number) {

        let target_position = this.playerNode.getPosition();
        target_position.y = cc.misc.clampf(target_position.y, this.minHeight, this.maxHeight);

        let current_position = this.node.getPosition();

        current_position.lerp(target_position, this.lerpFactor * dt, current_position);

        this.node.setPosition(current_position);

        this.backBGLayer.setPosition(current_position.x / 2, current_position.y / 2);

        this.midBGLayer.setPosition(current_position.x / 4, current_position.y / 4);

    }
}

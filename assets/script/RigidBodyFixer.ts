const { ccclass, property } = cc._decorator;

@ccclass
export default class RigidBodyFixer extends cc.Component {

    update(dt) {
        this.node.position = new cc.Vec3(0, 0, 0)
    }
}

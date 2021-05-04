const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayerFeet extends cc.Component {

    isGrounded = false

    onBeginContact(contact, selfCollider, otherCollider: cc.PhysicsCollider) {
        if (otherCollider.node.group == "ground") {
            this.isGrounded = true;
        }
    }

    onEndContact(contact, selfCollider, otherCollider: cc.PhysicsCollider) {
        if (otherCollider.node.group == "ground") {
            this.isGrounded = false;
        }
    }
}

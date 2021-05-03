import { emitEvent, Events } from "./EventSystem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class JumpOnTop extends cc.Component {

    @property(cc.PhysicsBoxCollider)
    deathCollider: cc.PhysicsBoxCollider = null

    @property(cc.Node)
    toDestroy: cc.Node = null

    onBeginContact(contact, selfCollider, otherCollider: cc.PhysicsCollider) {
        if (otherCollider.tag != 2)
            return

        emitEvent(Events.PLAYER_BOUNCE)
        this.deathCollider.enabled = false

        // TODO
        this.toDestroy.destroy()

        this.node.active = false
    }
}

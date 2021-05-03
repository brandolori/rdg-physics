import { emitEvent, Events } from "./EventSystem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class DeathBarrier extends cc.Component {

    onBeginContact(contact, selfCollider, otherCollider: cc.PhysicsCollider) {
        emitEvent(Events.DEATH_BARRIER)
    }
}

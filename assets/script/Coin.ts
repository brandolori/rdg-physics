import { emitEvent, Events } from "./EventSystem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Coin extends cc.Component {

    onBeginContact(contact, selfCollider, otherCollider) {
        emitEvent(Events.COIN)
        this.node.destroy()
    }
}

import { emitEvent, Events } from "./EventSystem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Sign extends cc.Component {

    @property(cc.Prefab)
    card: cc.Prefab = null

    displayed = false

    onBeginContact(contact, selfCollider, otherCollider) {
        if (!this.displayed) {
            emitEvent(Events.DISPLAY_CARD, this.card)
            this.displayed = true
        }
    }
}

import { emitEvent, Events } from "../EventSystem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CardOnStart extends cc.Component {

    @property(cc.Prefab)
    card: cc.Prefab = null;



    start() {
        emitEvent(Events.DISPLAY_CARD, this.card)
    }

}

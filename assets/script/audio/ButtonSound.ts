import { emitEvent, Events } from "../EventSystem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ButtonSounds extends cc.Component {

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_START, () => emitEvent(Events.BUTTON_PRESS))
    }
}

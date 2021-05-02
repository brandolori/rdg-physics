import { emitEvent, Events } from "./EventSystem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EmitOnCollision extends cc.Component {

    @property
    event: string = ""

    @property
    once = false

    @property
    destroyOnCollision = false

    emitted = false

    onBeginContact() {
        if (!this.emitted)
            emitEvent(this.event)

        if (this.once)
            this.emitted = true

        if (this.destroyOnCollision)
            this.node.destroy()
    }
}

const { ccclass, property } = cc._decorator;

@ccclass
export default class LoadSceneOnClick extends cc.Component {

    @property
    scene = ""

    onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchStart, this)
    }

    onTouchStart() {
        cc.director.loadScene(this.scene)
    }
}

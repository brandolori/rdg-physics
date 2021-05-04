import { emitEvent, Events, onEvent } from "./EventSystem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EndGameManager extends cc.Component {

    @property(cc.Node)
    uiNode: cc.Node = null

    // @property(cc.Label)
    // scoreLabel: cc.Label = null

    // @property(cc.Node)
    // inGameUI: cc.Node = null

    @property(cc.Node)
    retryButton: cc.Node = null

    @property(cc.Node)
    mainMenuButton: cc.Node = null

    @property
    mainMenuSceneName = "MainMenu"

    onLoad() {
        onEvent(Events.DEATH, this.showDeathUI, this)
        this.retryButton.on(cc.Node.EventType.TOUCH_START, this.retry, this)
        this.mainMenuButton.on(cc.Node.EventType.TOUCH_START, this.mainMenu, this)
    }

    showDeathUI() {
        // this.inGameUI.active = false
        this.uiNode.active = true
        // this.scoreLabel.string = score.toString()
        emitEvent(Events.UI_POPUP)
    }

    retry() {
        emitEvent(Events.UI_POPDOWN)
        cc.director.loadScene(cc.director.getScene().name)
    }

    mainMenu() {
        emitEvent(Events.UI_POPDOWN)
        cc.director.loadScene(this.mainMenuSceneName)
    }
}

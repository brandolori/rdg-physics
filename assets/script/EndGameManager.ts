import { emitEvent, Events, onEvent } from "./EventSystem";
import LevelSpecific from "./LevelSpecific";

const { ccclass, property } = cc._decorator;

@ccclass
export default class EndGameManager extends cc.Component {

    @property(cc.Node)
    uiNode: cc.Node = null

    @property(cc.Label)
    scoreLabel: cc.Label = null

    // @property(cc.Label)
    // scoreLabel: cc.Label = null

    // @property(cc.Node)
    // inGameUI: cc.Node = null

    @property(cc.Node)
    retryButton: cc.Node = null

    @property(cc.Node)
    mainMenuButton: cc.Node = null

    @property(cc.Node)
    shareButton: cc.Node = null

    @property
    mainMenuSceneName = "MainMenu"

    onLoad() {
        onEvent(Events.DEATH, (score: number) => this.showDeathUI(score, false))
        onEvent(Events.END_GAME, (score: number) => this.showDeathUI(score, true))
        this.retryButton.on(cc.Node.EventType.TOUCH_END, this.retry, this)
        this.mainMenuButton.on(cc.Node.EventType.TOUCH_END, this.mainMenu, this)
    }

    showDeathUI(score: number, win: boolean) {
        // this.inGameUI.active = false
        this.uiNode.active = true
        this.scoreLabel.string = win
            ? LevelSpecific.instance.gameWinString.replace("{score}", score.toString())
            : LevelSpecific.instance.gameOverString.replace("{score}", score.toString())


        emitEvent(Events.UI_POPUP)

        if (navigator.share) {
            this.shareButton.on(cc.Node.EventType.TOUCH_END, () => {
                const shareText = LevelSpecific.instance.shareEndString
                    .replace("{score}", score.toString())
                    .replace("{url}", "https://games.nonstudio.org/rgd/")

                navigator.share({
                    text: shareText,
                })
                    .catch(err => console.log(err))
                    .then(res => console.log(res))
            })
        } else {
            this.shareButton.active = false
        }
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

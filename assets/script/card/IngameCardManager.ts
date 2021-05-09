import { Card } from "./CardSerializer";
// import TrashManager from "../Trash/TrashManager";
import CardManager from "./CardManager";
import { emitEvent, Events, onEvent } from "../EventSystem";
import cardsFromPrefab from "./cardsFromPrefab";

const { ccclass, property } = cc._decorator;

@ccclass
export default class IngameCardManager extends cc.Component {

    @property(cc.Node)
    onTouchCloseNode: cc.Node = null

    cardManager: CardManager
    // trashManager: TrashManager
    cardsToLoad: Card[] = []

    onLoad() {
        this.cardManager = this.getComponentInChildren(CardManager)
        onEvent(Events.DISPLAY_CARD, this.displayCards, this)
        // this.trashManager = cc.director.getScene().getComponentInChildren(TrashManager)
    }

    displayCards(prefab: cc.Prefab) {
        this.cardManager.displayCards(cardsFromPrefab(prefab))

        // enable close button
        this.onTouchCloseNode.active = true
        this.onTouchCloseNode.on(cc.Node.EventType.TOUCH_END, this.onTouchStart, this)

        emitEvent(Events.PAUSE)

    }

    onTouchStart(event: cc.Event.EventTouch) {
        this.cardManager.closeDeck()

        // emitEvent(Events.HIDE_CARD)

        // disable close button
        this.onTouchCloseNode.off(cc.Node.EventType.TOUCH_END, this.onTouchStart, this)
        this.onTouchCloseNode.active = false

        emitEvent(Events.UNPAUSE)
    }
}

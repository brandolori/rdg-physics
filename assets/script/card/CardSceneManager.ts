import { Card } from "./CardSerializer";
import CardManager from "./CardManager";
import TrashManager from "../Trash/TrashManager";
import cardsFromPrefab from "./cardsFromPrefab";

const { ccclass, property } = cc._decorator;

@ccclass
export default class IngameCardManager extends cc.Component {

    @property(cc.Node)
    onTouchCloseNode: cc.Node = null

    @property([cc.Prefab])
    cards: cc.Prefab[] = []

    @property
    mainMenuScene = ""

    onLoad() {
        const cards = this.cards.map(cardsFromPrefab).reduce((a, b) => [...a, ...b])
        this.getComponentInChildren(CardManager).displayCards(cards)

        this.onTouchCloseNode.on(cc.Node.EventType.TOUCH_START, () => cc.director.loadScene(this.mainMenuScene))
    }
}

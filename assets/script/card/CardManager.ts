import { emitEvent, Events } from "../EventSystem";
import { Card } from "./CardSerializer";
// import CardPopupAnimation from "../Animation/CardPopupAnimation";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CardManager extends cc.Component {

    @property(cc.Prefab)
    cardPrefab: cc.Prefab = null

    currentCardIndex: number = 0
    cardNode: cc.Node = null
    stackOfCards: Card[] = null
    currentCallback: () => void
    callbackCalled: boolean;

    displayCards(cards: Card[], callback?: () => void) {
        this.currentCardIndex = 0
        this.stackOfCards = cards
        this.currentCallback = callback
        this.callbackCalled = false

        const inst = cc.instantiate(this.cardPrefab)
        this.cardNode = inst
        inst.parent = this.node

        inst.on(cc.Node.EventType.TOUCH_END, this.onTouchStart, this)

        // const maxIndexLabel = cc.find("Index Counter/Max Index", inst).getComponent(cc.Label)
        // maxIndexLabel.string = cards.length.toString()

        this.updateCard()
        emitEvent(Events.CARD_OPEN)
        emitEvent(Events.UI_POPUP)
        // this.cardNode.getComponent(CardPopupAnimation).animateIn()
    }

    updateCard() {
        const nextCardInfo = this.stackOfCards[this.currentCardIndex]
        const titleLabel = this.cardNode.getChildByName("Title").getComponent(cc.Label)
        // const image = this.cardNode.getChildByName("Picture").getComponent(cc.Sprite)
        const textLabel = this.cardNode.getChildByName("Text").getComponent(cc.Label)
        // const indexLabel = cc.find("Index Counter/Current Index", this.cardNode).getComponent(cc.Label)

        titleLabel.string = nextCardInfo.title
        // image.spriteFrame = nextCardInfo.image
        textLabel.string = nextCardInfo.text
        // indexLabel.string = (this.currentCardIndex + 1).toString()
    }

    onTouchStart(event: cc.Event.EventTouch) {
        event.stopPropagation()
        const touchLoc = event.getLocation();

        if (touchLoc.x >= cc.winSize.width / 2) {
            //Right
            if (this.currentCardIndex < this.stackOfCards.length - 1) {
                this.currentCardIndex += 1
                this.updateCard()
                if (this.currentCardIndex == this.stackOfCards.length - 1) {
                    if (this.currentCallback && !this.callbackCalled) {
                        this.callbackCalled = true
                        this.currentCallback()
                    }
                }
            } else {
                this.currentCardIndex = 0
                this.updateCard()
            }

        } else {
            //Left
            if (this.currentCardIndex > 0) {
                this.currentCardIndex -= 1
                this.updateCard()
            }
        }
        emitEvent(Events.CARD_CHANGE)
    }

    closeDeck() {
        emitEvent(Events.UI_POPDOWN)
        this.cardNode.destroy()
        // this.cardNode.getComponent(CardPopupAnimation).animateOut(() => this.cardNode.destroy())
    }

}
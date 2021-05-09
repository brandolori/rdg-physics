const { ccclass, property } = cc._decorator;

export interface Card {
    title: string,
    image: cc.SpriteFrame,
    text: string
}

@ccclass("CardSerializer")
export default class CardSerializer implements Card {
    
    @property()
    title = ""
    
    @property(cc.SpriteFrame)
    image: cc.SpriteFrame = null

    @property()
    text: string = ""
}

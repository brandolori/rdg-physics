import CardSerializer from "./CardSerializer";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CardPrefab extends cc.Component {

    @property([CardSerializer])
    cards: CardSerializer[] = [];
}

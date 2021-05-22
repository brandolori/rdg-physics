const { ccclass, property } = cc._decorator;

@ccclass
export default class LevelSpecific extends cc.Component {

    static instance: LevelSpecific

    @property
    gameEndString = ""

    @property
    shareEndString = ""

    onLoad() {
        LevelSpecific.instance = this
    }

}

const { ccclass, property } = cc._decorator;

@ccclass
export default class BackgroundMusic extends cc.Component {

    @property(cc.AudioClip)
    clip: cc.AudioClip = null;

    start() {
        cc.audioEngine.playMusic(this.clip, true)
    }
}

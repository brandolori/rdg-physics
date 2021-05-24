import { onEvent } from "../EventSystem";

const { ccclass, property } = cc._decorator;

@ccclass("EventClipSerializer")
export class EventClipSerializer {

    @property()
    event: string = ""

    @property()
    muteMusic = false

    @property([cc.AudioClip])
    clips: cc.AudioClip[] = []
}

@ccclass
export default class NewClass extends cc.Component {

    @property([EventClipSerializer])
    eventClips: EventClipSerializer[] = []

    @property
    effectsVolume = .5

    @property
    musicVolume = .5

    onLoad() {

        cc.audioEngine.setEffectsVolume(this.effectsVolume)
        cc.audioEngine.setMusicVolume(this.musicVolume)

        this.eventClips.forEach((ec) => {
            onEvent(ec.event, () => {
                const clip = ec.clips[Math.floor(ec.clips.length * Math.random())]
                cc.audioEngine.playEffect(clip, false)

                if (ec.muteMusic) {

                    cc.audioEngine.setMusicVolume(.25 * this.musicVolume)

                    this.scheduleOnce(() => cc.audioEngine.setMusicVolume(this.musicVolume), clip.duration)
                }
            })
        })
    }
}

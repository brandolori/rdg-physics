import { emitEvent, Events, onEvent } from "./EventSystem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    static instance: Game

    @property
    drawDebug = false

    @property
    gravity = -1000

    @property(cc.Label)
    scoreLabel: cc.Label = null

    score = 0

    state: "active" | "suspended" = "active"
    physicsManager: cc.PhysicsManager

    onLoad() {
        // singleton 😯
        Game.instance = this
        this.physicsManager = cc.director.getPhysicsManager()
        this.physicsManager.enabled = true;
        this.physicsManager.gravity = cc.v2(0, this.gravity);

        // Physics timestep, default FIXED_TIME_STEP is 1/60
        this.physicsManager.enabledAccumulator = true;
        cc.PhysicsManager.FIXED_TIME_STEP = 1 / 60;

        if (this.drawDebug) {
            cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
                cc.PhysicsManager.DrawBits.e_jointBit |
                cc.PhysicsManager.DrawBits.e_shapeBit
        }

        onEvent(Events.PLAYER_HIT, this.die, this)
        onEvent(Events.DEATH_BARRIER, this.die, this)
        onEvent(Events.END_REACHED, () => {
            emitEvent(Events.END_GAME, this.score)
            this.suspendGame()
        })

        onEvent(Events.PAUSE, this.suspendGame, this)
        onEvent(Events.UNPAUSE, this.resumeGame, this)

        onEvent(Events.COIN, this.onCoin, this)
    }

    start() {
        emitEvent(Events.GAME_START)
    }

    onCoin() {
        this.score += 1
        this.scoreLabel.string = this.score.toString()
    }

    suspendGame() {
        this.physicsManager.enabled = false
        this.state = "suspended"
        emitEvent(Events.GAME_SUSPEND)
    }

    resumeGame() {
        this.physicsManager.enabled = true
        this.state = "active"
        emitEvent(Events.GAME_RESUME)
    }

    die() {
        this.suspendGame()
        emitEvent(Events.DEATH, this.score)
    }


}

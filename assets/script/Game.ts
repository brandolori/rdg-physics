import { emitEvent, Events, onEvent } from "./EventSystem";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    static instance: Game

    @property
    drawDebug = false

    state: "active" | "suspended" = "active"
    physicsManager: cc.PhysicsManager

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


    onLoad() {
        // singleton 😯
        Game.instance = this
        this.physicsManager = cc.director.getPhysicsManager()
        this.physicsManager.enabled = true;
        this.physicsManager.gravity = cc.v2(0, -2000);

        // Physics timestep, default FIXED_TIME_STEP is 1/60
        this.physicsManager.enabledAccumulator = true;
        cc.PhysicsManager.FIXED_TIME_STEP = 1 / 60;

        if (this.drawDebug) {
            cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
                cc.PhysicsManager.DrawBits.e_jointBit |
                cc.PhysicsManager.DrawBits.e_shapeBit
        }

        onEvent(Events.PLAYER_HIT, this.onPlayerHit, this)
        onEvent(Events.DEATH_BARRIER, this.onDeathBarrier, this)
    }

    onPlayerHit() {
        this.suspendGame()
        emitEvent(Events.DEATH)
    }

    onDeathBarrier() {
        this.suspendGame()
        emitEvent(Events.DEATH)
    }
}

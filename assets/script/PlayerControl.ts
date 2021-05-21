import { Events, onEvent } from "./EventSystem";
import PlayerFeet from "./PlayerFeet";

const { ccclass, property } = cc._decorator;

type AnimState = "walking" | "jumping" | "idle"

@ccclass
export default class PlayerControl extends cc.Component {

    @property
    velocityMax = 400

    @property
    walkForce = 15000

    @property
    jumpForce = 500000

    @property(PlayerFeet)
    feet: PlayerFeet = null

    rigidBody: cc.RigidBody
    direction = 0
    isGrounded = false
    leftPressed = false
    rightPressed = false
    upPressed = false
    anim: cc.Animation;
    animState: AnimState

    setAnimState(state: AnimState) {
        if (this.animState != state) {
            switch (state) {
                case "idle":
                    this.anim.play("PlayerIdle")
                    break;
                case "jumping":
                    this.anim.play("PlayerJump")
                    break;
                case "walking":
                    this.anim.play("PlayerWalk")
                    break;
            }
            console.log(`switching to ${state}`)
            this.animState = state
        }
    }

    onLoad() {
        onEvent(Events.PLAYER_BOUNCE, this.onBounce, this)

        // Rigid Body
        this.rigidBody = this.node.getComponent(cc.RigidBody);

        this.anim = this.getComponent(cc.Animation);

        // Key events
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyPressed, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyReleased, this);

    }

    onBounce() {
        this.rigidBody.applyForceToCenter(cc.v2(0, this.jumpForce), true);
    }

    onKeyPressed(event) {

        switch (event.keyCode) {

            case cc.macro.KEY.left:
            case cc.macro.KEY.a:
                this.leftPressed = true
                break;

            case cc.macro.KEY.right:
            case cc.macro.KEY.d:
                this.rightPressed = true
                break;

            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
            case cc.macro.KEY.space:
                this.upPressed = true
                break;
        }

    }

    onKeyReleased(event) {

        switch (event.keyCode) {

            case cc.macro.KEY.left:
            case cc.macro.KEY.a:
                this.leftPressed = false
                break;

            case cc.macro.KEY.right:
            case cc.macro.KEY.d:
                this.rightPressed = false
                break;

            case cc.macro.KEY.w:
            case cc.macro.KEY.up:
            case cc.macro.KEY.space:
                this.upPressed = false
                break;

        }
    }

    jump() {
        if (this.feet.isGrounded) {
            this.rigidBody.applyForceToCenter(cc.v2(0, this.jumpForce), true)
            this.feet.isGrounded = false
        }
    }

    update(dt) {

        this.direction = (+this.rightPressed) - (+this.leftPressed)

        // animation
        if (!this.feet.isGrounded) {
            this.setAnimState("jumping")
        } else {
            if (this.direction != 0) {
                this.setAnimState("walking")
            } else {
                this.setAnimState("idle")
            }
        }

        if ((this.direction > 0 && this.rigidBody.linearVelocity.x < this.velocityMax) || (this.direction < 0 && this.rigidBody.linearVelocity.x > -this.velocityMax)) {
            this.rigidBody.applyForceToCenter(cc.v2(this.direction * this.walkForce, 0), true);
        }

        if (this.upPressed) {
            this.jump()
        }

        this.node.scaleX = this.direction >= 0 ? -1 : 1

    }

}

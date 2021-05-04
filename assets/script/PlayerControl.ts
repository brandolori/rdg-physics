import { Events, onEvent } from "./EventSystem";
import PlayerFeet from "./PlayerFeet";

const { ccclass, property } = cc._decorator;

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

    onLoad() {
        onEvent(Events.PLAYER_BOUNCE, this.onBounce, this)

        // Rigid Body
        this.rigidBody = this.node.getComponent(cc.RigidBody);

        // Key events
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyPressed, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyReleased, this);
    }

    onBounce() {
        this.rigidBody.applyForceToCenter(cc.v2(0, this.jumpForce), true);
    }

    onKeyPressed(event) {

        let key_code = event.keyCode;

        switch (key_code) {

            case cc.macro.KEY.left:
                this.moveLeft()
                break;

            case cc.macro.KEY.right:
                this.moveRight()
                break;

            case cc.macro.KEY.up:
                this.jump()
                break;
        }

    }

    onKeyReleased(event) {

        let key_code = event.keyCode;

        switch (key_code) {

            case cc.macro.KEY.left:
            case cc.macro.KEY.right:
                this.stopLRMovement()
                break;

        }
    }

    jump() {
        if (this.feet.isGrounded) {
            this.rigidBody.applyForceToCenter(cc.v2(0, this.jumpForce), true);
            this.feet.isGrounded = false;
        }
    }

    moveLeft() {
        this.direction = -1;
    }

    moveRight() {
        this.direction = 1;
    }

    stopLRMovement() {
        this.direction = 0;
    }

    update(dt) {

        if ((this.direction > 0 && this.rigidBody.linearVelocity.x < this.velocityMax) || (this.direction < 0 && this.rigidBody.linearVelocity.x > -this.velocityMax)) {
            this.rigidBody.applyForceToCenter(cc.v2(this.direction * this.walkForce, 0), true);
        }

        this.node.scaleX = this.direction >= 0 ? -1 : 1

    }

}

const { ccclass, property } = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    onLoad() {
        let physicsManager = cc.director.getPhysicsManager()
        physicsManager.enabled = true;
        physicsManager.gravity = cc.v2(0, -2000);
        physicsManager.enabledAccumulator = true;

        // Physics timestep, default FIXED_TIME_STEP is 1/60
        cc.PhysicsManager.FIXED_TIME_STEP = 1 / 60;

        // cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        // cc.PhysicsManager.DrawBits.e_pairBit |
        // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        // cc.PhysicsManager.DrawBits.e_jointBit |
        // cc.PhysicsManager.DrawBits.e_shapeBit
        // ;
    }
}

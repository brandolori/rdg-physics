const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.TiledMap)
    worldMap: cc.TiledMap = null

    @property
    collisionGroupName = "Collisions"

    @property
    coinsGroupName = "Coins"

    @property
    staticObstaclesGroupName = "StaticObstacles"

    @property(cc.Prefab)
    collisionPrefab: cc.Prefab = null

    @property(cc.Prefab)
    coinsPrefab: cc.Prefab = null

    @property(cc.Prefab)
    staticObstaclesPrefab: cc.Prefab = null

    onLoad() {
        const collisionObjects = this.worldMap.getObjectGroup(this.collisionGroupName).getObjects()

        collisionObjects.forEach(obj => {
            const node = cc.instantiate(this.collisionPrefab)
            node.height = obj.height
            node.width = obj.width

            node.x = obj.x
            node.y = obj.y - obj.height

            const collider = node.getComponent(cc.PhysicsBoxCollider)

            collider.size = new cc.Size(obj.width, obj.height)
            collider.offset = new cc.Vec2(obj.width / 2, obj.height / 2)
            this.node.addChild(node)
        })

        const coinsObjects = this.worldMap.getObjectGroup(this.coinsGroupName).getObjects()

        coinsObjects.forEach(obj => {
            const node = cc.instantiate(this.coinsPrefab)

            node.x = obj.x + obj.width / 2
            node.y = obj.y - obj.height / 2

            this.node.addChild(node)

            node.scale = 1 / this.node.scale
        })

        const staticObstaclesObjects = this.worldMap.getObjectGroup(this.staticObstaclesGroupName).getObjects()

        staticObstaclesObjects.forEach(obj => {
            const node = cc.instantiate(this.staticObstaclesPrefab)

            node.x = obj.x + obj.width / 2
            node.y = obj.y - obj.height / 2

            this.node.addChild(node)

            node.scale = 1 / this.node.scale
        })

    }
}

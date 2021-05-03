const { ccclass, property } = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.TiledMap)
    worldMap: cc.TiledMap = null

    @property
    collisionGroupName = "Collisions"

    @property(cc.Prefab)
    collisionPrefab: cc.Prefab = null


    onLoad() {
        const collisionObjects = this.worldMap.getObjectGroup(this.collisionGroupName).getObjects()

        collisionObjects.forEach(obj => {
            console.log("oggetto")
            console.log(obj)
            
            const node = cc.instantiate(this.collisionPrefab)
            node.height = obj.height
            node.width = obj.width

            node.x = obj.x
            node.y = obj.y - obj.height

            node.anchorX = .5
            node.anchorY = .5

            const collider = node.addComponent(cc.PhysicsBoxCollider)

            collider.size = new cc.Size(obj.width, obj.height)
            collider.offset = new cc.Vec2(obj.width / 2, obj.height / 2)
            this.node.addChild(node)
        })

    }
}

const { ccclass, property } = cc._decorator;

@ccclass("ObjGroupSerializer")
class ObjGroupSerializer {
    @property()
    groupName = ""

    @property(cc.Prefab)
    prefab: cc.Prefab = null
}

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.TiledMap)
    worldMap: cc.TiledMap = null

    @property
    collisionGroupName = "Collisions"

    @property(cc.Prefab)
    collisionPrefab: cc.Prefab = null

    @property(ObjGroupSerializer)
    groups: ObjGroupSerializer[] = []

    onLoad() {
        this.worldMap.enableCulling(false)

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


        this.groups.forEach(group => {
            const objects = this.worldMap.getObjectGroup(group.groupName).getObjects()
            objects.forEach(obj => {
                const node = cc.instantiate(group.prefab)

                node.x = obj.x + obj.width / 2
                node.y = obj.y - obj.height / 2

                this.node.addChild(node)

                node.scale = 1 / this.node.scale
            })
        })
    }
}

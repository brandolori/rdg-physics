import CardPrefab from "./CardPrefab"

export default (prefab: cc.Prefab) => {
    const inst = cc.instantiate(prefab)
    return inst.getComponent(CardPrefab).cards.map(el => ({ ...el }))
}

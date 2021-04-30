const emitEvent = (event: string, ...args: any[]) => cc.Canvas.instance.node.emit(event, ...args)

const onEvent = (event: string, cb: any, target?: any) => cc.Canvas.instance.node.on(event, cb, target)

const Events = {
    GAME_START: "game-start",
    COIN: "coin"
}

export {
    emitEvent,
    onEvent,
    Events
}
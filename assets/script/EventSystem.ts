const emitEvent = (event: string, ...args: any[]) => cc.Canvas.instance.node.emit(event, ...args)

const onEvent = (event: string, cb: any, target?: any) => cc.Canvas.instance.node.on(event, cb, target)

const Events = {
    GAME_START: "game-start",

    COIN: "coin",
    DEATH: "death",
    PLAYER_BOUNCE: "player-bounce",
    PLAYER_HIT: "player-hit",
    DEATH_BARRIER: "death-barrier",

    UI_POPUP: "ui-popup",
    UI_POPDOWN: "ui-popdown",
    GAME_SUSPEND: "game-suspend",
    GAME_RESUME: "game-resume",

    /** requires an argument, a card prefab */
    DISPLAY_CARD: "display-card",
    HIDE_CARD: "display-card",

    PAUSE: "pause",
    UNPAUSE: "unpause"
}

export {
    emitEvent,
    onEvent,
    Events
}
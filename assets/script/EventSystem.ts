const emitEvent = (event: string, ...args: any[]) => cc.Canvas.instance.node.emit(event, ...args)

const onEvent = (event: string, cb: any, target?: any) => cc.Canvas.instance.node.on(event, cb, target)

const Events = {
    GAME_START: "game-start",

    COIN: "coin",
    DEATH: "death",
    PLAYER_BOUNCE: "player-bounce",
    PLAYER_JUMP: "player-jump",
    PLAYER_HIT: "player-hit",
    DEATH_BARRIER: "death-barrier",
    END_REACHED: "end-reached",
    END_GAME: "end-game",

    UI_POPUP: "ui-popup",
    UI_POPDOWN: "ui-popdown",
    GAME_SUSPEND: "game-suspend",
    GAME_RESUME: "game-resume",

    /** requires an argument, a card prefab */
    DISPLAY_CARD: "display-card",
    CARD_OPEN: "card-open",
    CARD_CHANGE: "card-change",

    PAUSE: "pause",
    UNPAUSE: "unpause",

    BUTTON_PRESS: "button-press",
}

export {
    emitEvent,
    onEvent,
    Events
}
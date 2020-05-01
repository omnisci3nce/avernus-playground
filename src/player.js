const PlayerAnims = {
    IDLE: 0,
    RUN: 1,
    JUMP: 2,
    SWING_1: 3
}
Object.freeze(PlayerAnims)

export const initialPlayerState = () => ({
    position: { x: 10, y: 10 },
    velocity: { x: 0, y: 0 },
    currentAnim: PlayerAnims.IDLE,
    frames: { frame: 0, animFrame: 0 },
})

const ANIM_SPEED = 1

// takes world state + TODO: inputs and returns new player state
export const updatePlayer = (state) => {
    console.log('update player')

    // updating animation data
    let n_frame = state.player.frames.frame + 1
    if ( n_frame / ANIM_SPEED >= 4) {
        n_frame = 0
    }
    
    const n_animFrame = Math.trunc(state.player.frames.frame / ANIM_SPEED)

    const newState = {
        ...state.player,
        frames: {
            frame: n_frame, 
            animFrame: n_animFrame
        }
    }
    console.log(newState)
    return newState
}

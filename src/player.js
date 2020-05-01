import Idle1 from './img/idle-00.png'
import Idle2 from './img/idle-01.png'
import Idle3 from './img/idle-02.png'
import Idle4 from './img/idle-03.png'
import Run1 from './img/run-00.png'
import Run2 from './img/run-01.png'
import Run3 from './img/run-02.png'
import Run4 from './img/run-03.png'
import Run5 from './img/run-04.png'
import Run6 from './img/run-05.png'

function loadImg (url) {
    const myImg = new Image()
    myImg.src = url
    return myImg
}

// initialise all our sprite imgs
let idleAnimFrames = [
    loadImg(Idle1),
    loadImg(Idle2),
    loadImg(Idle3),
    loadImg(Idle4),
]
export const playerAnimations = [
    [loadImg(Idle1), loadImg(Idle2), loadImg(Idle3), loadImg(Idle4)],
    [loadImg(Run1),
      loadImg(Run2),
      loadImg(Run3),
      loadImg(Run4),
      loadImg(Run5),
      loadImg(Run6)
    ]
]


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
    currentAnim: PlayerAnims.RUN,
    frames: { frame: 0, animFrame: 0 },
})

const ANIM_SPEED = 1

// takes world state + TODO: inputs and returns new player state
export const updatePlayer = (state) => {
    //console.log('update player')
    const animLength = playerAnimations[state.player.currentAnim].length

    // updating animation data
    let n_frame = state.player.frames.frame + 1
    if ( n_frame / ANIM_SPEED >= animLength) {
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
    //console.log(newState)
    return newState
}

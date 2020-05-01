// import { map } from 'ramda'
import { prop, spec } from './utils'
import Idle1 from './img/idle-00.png'
import Idle2 from './img/idle-01.png'
import Idle3 from './img/idle-02.png'
import Idle4 from './img/idle-03.png'
import { g_inputQueue } from './input.js'
import { initialPlayerState, updatePlayer } from './player.js'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
ctx.imageSmoothingEnabled = false

const spriteWidth = 50 
const spriteHeight = 37

const loadImg = url => {
    const myIcon = new Image()
    myIcon.src = url
    return myIcon
}

let idleAnimFrames = [
    loadImg(Idle1),
    loadImg(Idle2),
    loadImg(Idle3),
    loadImg(Idle4),
]

// Initial world state
let state = {
	player: initialPlayerState()
}
console.log('initial state: ', state)

// test spec

let counters = {
    x: 0
}
const addOne = c => {
    return c.x + 1
}

const next = state => {
    return spec({
        player: updatePlayer
    })(state)
}

/* 10 frames per second

/ anim speed you get how many frames you keep the same animation sprite

so /2 means every 2 frames you change, effectively making your animation
5fps
(?)
*/

const SCALE = 4
const draw = () => {
	ctx.fillStyle = '#EDF2F7'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(idleAnimFrames[state.player.frames.animFrame],
        0,0,50,37,
        state.player.position.x, state.player.position.y, 50 * SCALE, 37 * SCALE)
}
let globalFrame = 0

const step = t1 => t2 => {
	if (t2 - t1 > 1000) {
        // handle inputs 
        //console.log(g_inputQueue)

        // update world state based on previous state and inputs
        state = next(state)
        // draw to screen
		draw()
		
		window.requestAnimationFrame(step(t2))
	} else {
		window.requestAnimationFrame(step(t1))
	}
}


window.onload = () => {
    draw()
    window.requestAnimationFrame(step(0))
}

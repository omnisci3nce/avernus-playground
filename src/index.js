// import { map } from 'ramda'
import { prop, spec } from './utils'
import { g_inputQueue } from './input.js'
import { initialPlayerState, updatePlayer, playerAnimations } from './player.js'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
ctx.imageSmoothingEnabled = false

const spriteWidth = 50 
const spriteHeight = 37

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
    console.log(state)
    ctx.drawImage(playerAnimations[state.player.currentAnim][state.player.frames.animFrame],
        0,0,50,37,
        state.player.position.x, state.player.position.y, 50 * SCALE, 37 * SCALE)
}
let globalFrame = 0

const step = t1 => t2 => {
	if (t2 - t1 > 33) {
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
// Key events

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'w': case 'ArrowUp': console.log('up pressed'); break
        case 'a': case 'ArrowLeft': console.log('left pressed'); break
        case 's': case 'ArrowDown': 
            state.player.currentAnim = 0
            state.player.frames = {frame:0, animFrame: 0}
            break
        case 'd': case 'ArrowRight':
            state.player.currentAnim = 1
            state.player.frames = {frame:0, animFrame: 0}
            break
    }
})


window.onload = () => {
    draw()
    window.requestAnimationFrame(step(0))
}

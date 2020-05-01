// import { map } from 'ramda'
import { prop, spec } from './utils'
import Idle1 from './img/idle-00.png'
import Idle2 from './img/idle-01.png'
import Idle3 from './img/idle-02.png'
import Idle4 from './img/idle-03.png'

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

let state = {
	playerPos: { x:0, y:0 },
    frame: 0,
    animFrame: 0
}

// test spec

let counters = {
    x: 0
}
const addOne = c => {
    return c.x + 1
}

const updatePlayerPos = state => {
    return {x:state.playerPos.x, y:state.playerPos.y}
}

const next = () => {
    state.animFrame = Math.trunc(state.frame/2)

    state.frame += 1

    if (state.frame / 2 >= 4) {
        state.frame = 0
    }

    state = spec({
        playerPos: updatePlayerPos,
        frame: prop('frame'),
        animFrame: prop('animFrame')
    })(state)
    // console.log(state)
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
    // console.log(state)
    ctx.drawImage(idleAnimFrames[state.animFrame], 0, 0, 50, 30, state.playerPos.x, state.playerPos.y, 50 * SCALE , 30 * SCALE )
}
let globalFrame = 0

// mutable state
const inputQueue = []

const handleInput = ( q ) => {
    q.shift()
}

const step = t1 => t2 => {
	if (t2 - t1 > 1000) {
        // globalFrame += 1

        // handle inputs 


        // update state based on state and inputs
        next()
        console.log(inputQueue)
        handleInput(inputQueue)


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
        case 'w': case 'ArrowUp':
            inputQueue.push('up')
            break
        case 'a': case 'ArrowLeft': console.log('left pressed'); break
        case 's': case 'ArrowDown': console.log('down pressed'); break
        case 'd': case 'ArrowRight': console.log('right pressed'); break
    }
})


window.onload = () => {
    draw()
    window.requestAnimationFrame(step(0))
}
import { map } from 'ramda'
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


// game state
let state = {
	playerPos: { x:0, y:0 },
    frame: 0,
    animFrame: 0
}

const next = () => {
    state.animFrame = Math.trunc(state.frame/2)
    // console.log('frame: ', state.frame)
    // console.log('animFrame: ', state.animFrame)

    state.frame += 1

    if (state.frame / 2 >= 4) {
        state.frame = 0
    }
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
    ctx.drawImage(idleAnimFrames[state.animFrame], 0, 0, 50, 30, 0, 0, 50 * SCALE , 30 * SCALE )
}
let globalFrame = 0
const step = t1 => t2 => {
	if (t2 - t1 > 100) {
        // console.log('global frame: ', globalFrame)
        globalFrame += 1
        // if (globalFrame >= 16) {
        //     return
        // }
		next()
		draw()
		// console.log('Draw Complete.')
		window.requestAnimationFrame(step(t2))
	} else {
		window.requestAnimationFrame(step(t1))
	}
}



window.onload = () => {
    draw()
    window.requestAnimationFrame(step(0))
}
import { map } from 'ramda'
import Idle1 from './img/idle-00.png'

const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

const spriteWidth = 50 
const spriteHeight = 37

// game state
let state = {
	playerPos: { x:0, y:0 }
}

const next = (s) => s

const draw = () => {
	ctx.fillStyle = '#EDF2F7'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

const step = t1 => t2 => {
	if (t2 - t1 > 100) {
		state = next(state)
		draw()
		console.log('Draw Complete.')
		window.requestAnimationFrame(step(t2))
	} else {
		window.requestAnimationFrame(step(t1))
	}
}

draw()
window.requestAnimationFrame(step(0))
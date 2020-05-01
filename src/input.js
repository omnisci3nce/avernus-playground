// mutable state
export const g_inputQueue = []


// squashes multiple inputs into 1 8 direction command that cna be sent to physics
// does this by 
export const resolveInputs = ( ) => {
	let directional = {
		left: false, right: false, up:false, down: false
	}
	while (g_inputQueue.length > 0) {
		const i = g_inputQueue.shift()
		if (i == 'right') {
			directional.right = true
		} else if (i == 'down') {
			directional.down = true
		}
	}
	return directional
}


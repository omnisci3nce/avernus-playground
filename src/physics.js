const GRAVITY = 0
const X_ACCEL = 3
const MAX_V = 10

// takes world state and returns new physics state
export const updatePhysics = (state, inputs) => {
	// X AXIS
	if (inputs.right || inputs.left) {
		state.player.velocity.x = state.player.velocity.x + X_ACCEL * (inputs.right ? 1 : -1)

		if (state.player.velocity.x > MAX_V) {
			state.player.velocity.x = MAX_V
		} else if (state.player.velocity.x < -MAX_V) {
			state.player.velocity.x = -MAX_V
		}
	}

	if (inputs.down) {
		state.player.velocity.x = 0
	}

	state.player.position.x = state.player.position.x + state.player.velocity.x

	// Y AXIS
	state.player.velocity.y += GRAVITY
	state.player.position.y = state.player.position.y + state.player.velocity.y
}
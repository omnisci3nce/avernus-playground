// mutable state
export const g_inputQueue = []

// squashes multiple inputs into 1 8 direction command that cna be sent to physics
// does this by 
const resolveInputs = ( ) => {



}

// Key events

window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'w': case 'ArrowUp': g_inputQueue.push('up'); break
        case 'a': case 'ArrowLeft': ; break
        case 's': case 'ArrowDown': g_inputQueue.push('down'); break
        case 'd': case 'ArrowRight': console.log('right pressed'); break
    }
})



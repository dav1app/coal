const _loop = []
let animationFrame

function renderLoop () {
  animationFrame = global.requestAnimationFrame(renderLoop)
  _loop.forEach(callback => callback())
}

export class AnimationLoop {
  static add (callback) {
    _loop.push(callback)
  }

  static start () {
    setTimeout(renderLoop, 1000 / 30)
  }
}

window.onerror = (event) => {
  console.log('Stop!')
  window.cancelAnimationFrame(animationFrame)
}

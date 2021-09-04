const _loop = {}

function executeLoop (event) {
  _loop[event].forEach(callback => callback())
}

export class EventLoop {
  /**
   * Adds an event to the EventLoop
   * @param {*} event The string representing the DOM event.
   * @param {*} callback The function to be executed.
   */
  static add (event, callback, options) {
    if (!_loop[event]) {
      _loop[event] = []
      window.addEventListener(event, () => {
        console.log('executing event', event)
        executeLoop(event)
      })
    }

    switch (true) {
      case options?.before:
        _loop[event].unshift(callback)
        console.log(_loop[event])
        break
      default:
        _loop[event].push(callback)
        console.log(_loop[event])
    }
  }
}

window.onerror = (event) => {
  console.log('Stop!')
  console.error(event)
}

const _loop = {}

function executeLoop (event, eventParameters) {
  _loop[event].forEach(callback => callback(eventParameters))
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
      window.addEventListener(event, (eventParameters) => {
        executeLoop(event, eventParameters)
      })
    }

    switch (true) {
      case options?.before:
        _loop[event].unshift(callback)
        break
      default:
        _loop[event].push(callback)
    }
  }
}

window.onerror = (event) => {
  console.error(event)
}

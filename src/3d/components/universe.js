import { Scene } from './scene'
import { World } from './world'

let _universe = {}

export class Universe {
  constructor () {
    this.graphics = Scene.current()
    this.physics = World.current()
    _universe = this
  }

  add (obj) {
    _universe.graphics.add(obj.graphics)
    // iverse.physics.add(obj.physics)
  }

  static current () {
    return _universe
  }
}

export default Universe

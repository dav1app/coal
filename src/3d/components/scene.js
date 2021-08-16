import { Scene as _Scene, Color } from 'three'
let _scene

export class Scene {
  constructor () {
    _scene = new _Scene()
    _scene.background = new Color(0x0)
    return _scene
  }

  static current () {
    return _scene
  }
}

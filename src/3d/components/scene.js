import { Scene as _Scene } from 'three'
let _scene

export class Scene {
  constructor () {
    _scene = new _Scene()
    return _scene
  }

  static current () {
    return _scene
  }
}

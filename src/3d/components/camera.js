
import { PerspectiveCamera } from 'three'
import { Sizes } from '../configs/sizes'

const FOV = 50
const FAR = 1200
const NEAR = 400

let _camera

export class Camera {
  constructor (child) {
    _camera = new PerspectiveCamera(
      FOV,
      Sizes.width / Sizes.height,
      1,
      10000
    )
    _camera.position.set(0, 0, 0)
    if (child) {
      _camera.add(child)
      child.position.set(0, 0, -2)
    }
    return _camera
  }

  static current () {
    return _camera
  }
}

export default Camera

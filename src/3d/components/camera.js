
import { PerspectiveCamera } from 'three'

const FOV = 50
const FAR = 1200
const NEAR = 400

let _camera

export class Camera {
  constructor () {
    _camera = new PerspectiveCamera(
      FOV,
      window.innerWidth / window.innerHeight
    )
    _camera.far = 100
    _camera.updateProjectionMatrix()
    return _camera
  }

  static current () {
    return _camera
  }
}

export default Camera

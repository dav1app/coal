import { PerspectiveCamera } from 'three'
import { Sizes } from '../configs/sizes'

const FOV = 50
const FAR = 100000
const NEAR = 0.1

let _camera

/**
 * Main class for THREE camera.
 */
export class Camera {
  /**
   * Creates a new THREE camera.It doesn't return any physics object. For physics, please look into the Actor class.
   * @param {THREE.Object3D} child The child that will be attached to the camera.
   * @returns THREE.Camera New camera
   * @example
   * const universe = new Universe()
   * const camera = new Camera()
   * universe.graphics.add(camera) //or scene.add(camera)
   */
  constructor ({ child }) {
    _camera = new PerspectiveCamera(
      FOV,
      Sizes.width / Sizes.height,
      NEAR,
      FAR
    )
    _camera.position.set(0, 0, 0)
    if (child) {
      _camera.add(child)
      child.position.set(0, 0, -2)
    }

    /* It automatically adds an event for windows resizing */
    window.addEventListener('resize', () => {
      _camera.aspect = Sizes.width / Sizes.height
      _camera.updateProjectionMatrix()
    })

    return _camera
  }

  /**
   * Return the current instance of the camera.
   * @deprecated
   * @static
   * @returns _camera - The current instance of the camera.
   */
  static current () {
    return _camera
  }
}

export default Camera

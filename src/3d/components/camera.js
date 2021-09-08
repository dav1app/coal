import { PerspectiveCamera } from 'three'
import { Sizes } from '../configs/sizes'
import { AnimationLoop } from './animationLoop'
import { EventLoop } from './eventLoop'

const FOV = 50
const FAR = 100000
const NEAR = 0.1

/**
 * The main class for the cube to be used with <b>mixzoid,/b>.
 * @typedef {Object} mzCamera
 * @memberof C#
 * @property {THREE.Mesh} graphics - The graphics object.
 * @property {OIMO.Body} physics - The physics object
 */

/**
 * Main class for THREE camera.
 */
export class Camera {
  /**
   * Creates a new THREE camera.It doesn't return any physics object. For physics, please look into the Actor class.
   * @param {THREE.Object3D} child The child that will be attached to the camera.
   * @returns {THREE.Camera} New camera
   * @example
   * const universe = new Universe()
   * const camera = new Camera()
   * universe.graphics.add(camera) // or scene.add(camera)
   */
  constructor ({ y = 0, z = 0, child } = {}) {
    this.graphics = new PerspectiveCamera(
      FOV,
      Sizes.width / Sizes.height,
      NEAR,
      FAR
    )

    this.graphics.position.set(0, y, z)

    AnimationLoop.add(() => {
      this.graphics.updateWorldMatrix()
    })

    /* It automatically adds an event for windows resizing */
    EventLoop.add('resize', () => {
      this.graphics.aspect = Sizes.width / Sizes.height
      this.graphics.updateProjectionMatrix()
    })
  }
}

export default Camera

import {
  TextureLoader,
  Mesh,
  BoxBufferGeometry,
  MeshStandardMaterial
} from 'three'
import { Floor } from './floor'
import { addHeightOffset } from '../utils/addHeightOffset'
import { World } from './world'
import { AnimationLoop } from './animationLoop'

/**
 * The main class for the cube to be used with <b>mixzoid,/b>.
 * @class Cube
 * @typedef {Object} mzCube
 * @property {THREE.Mesh} graphics - The graphics object.
 * @property {OIMO.Body} physics - The physics object
 */

const _cube = {}

/**
 * The main cube class that returns both <code>cube.graphics</code> as a THREE.Mesh and <code>cube.physics</code> thar
 * returns the world added OIMO.Body.
 * @class
 */
export class Cube {
  /**
   * Creates a new cube.
   * @constructor
   * @param {parameters} parameters The parameters of the cube.
   * @param {float} parameters.x The x position of the cube.
   * @param {float} parameters.y The y position of the cube.
   * @param {float} parameters.z The z position of the cube.
   * @param {float} parameters.w The width of the cube.
   * @param {float} parameters.h The height of the cube.
   * @param {float} parameters.d The depth of the cube.
   * @return {mzCube} The cube.
   * @example
   * const universe = new Universe()
   * const cube = new Cube({
   *   x: 0,
   *   z: -1
   * })
   * universe.add(cube)
   */
  constructor ({ x = 0, y = 0, z = -1, w = 1, h = 1, d = 1 } = {}) {
    const geometry = new BoxBufferGeometry(w, h, d)
    const texture = new TextureLoader().load('box.jpg')
    const material = new MeshStandardMaterial({
      roughness: 1,
      metalness: 0.04,
      map: texture
    })

    const graphics = new Mesh(
      geometry,
      material
    )

    graphics.castShadow = true
    graphics.receiveShadow = true

    graphics.position.x = x
    graphics.position.z = z
    y = Floor.current().graphics ? addHeightOffset(Floor.current().graphics.position.y + h / 2) + y : y
    graphics.position.y = y

    const physics = {
      type: 'box',
      size: [w, h, d],
      pos: [x, y, z],
      move: true,
      density: 1,
      friction: 0.2,
      restitution: 0.2
    }

    _cube.graphics = graphics
    _cube.physics = World.current().add(physics)

    // Adds the animation loop to link graphics and physics. The main source of truth is physics always.
    AnimationLoop.add(() => {
      _cube.graphics.position.set(...Object.values(_cube.physics.getPosition()))
      _cube.graphics.quaternion.set(...Object.values(_cube.physics.getQuaternion()))
    })

    return _cube
  }

  /**
   * Returns the current instance of the cube.
   * @deprecated
   * @static
   * @returns _cube
   */
  static current () {
    return _cube
  }
}

export default Cube

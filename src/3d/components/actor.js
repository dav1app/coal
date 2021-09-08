import { BoxBufferGeometry, MeshBasicMaterial, Mesh } from 'three'
import { addHeightOffset } from '../utils/addHeightOffset'
import { Floor } from './floor'
import { AnimationLoop } from './animationLoop'
import { World } from './world'

/**
 * Create an actor on Mixzoid. Actors are objects that can be attached to controllers.
 * @typedef {mzActor} mzActor - An actor on Mixzoid.
 * @memberof Actor#
 * @property {THREE.Mesh} graphics - The graphics object.
 * @property {OIMO.Body} physics - The physics object
 */

export class Actor {
  /**
   * Create an actor on Mixzoid. Actors are objects that can be attached to controllers.
   * @param {THREE.Camera} camera The camera that will be attached to the actor.
   *
   * @example
   * const universe = new Universe()
   * const camera = new Camera()
   * universe.graphics.add(camera) // or scene.add(camera)
   */
  constructor ({ x = 0, y = 1, z = 0, w = 1, h = 3, d = 1, camera, controls = {} } = {}) {
    this.graphics = {}
    this.physics = {}

    this.graphics.body = new Mesh(
      new BoxBufferGeometry(w, h, d),
      new MeshBasicMaterial({
        color: 0xFFF000
      }))
    this.graphics.body.position.y = addHeightOffset(Floor.current().graphics.position.y + h / 2) + y
    this.graphics.body.position.x = x
    this.graphics.body.position.z = z

    this.physics.body = World.current().add({
      type: 'box',
      size: [w, h, d],
      pos: [x, y, z],
      move: true,
      density: 1,
      friction: 1,
      restitution: 0
    })

    AnimationLoop.add(() => {
      this.graphics.body.position.y = this.physics.body.position.y
    })

    AnimationLoop.add(() => {
      this.physics.body.position.y = this.graphics.body.position.y
      this.physics.body.position.x = this.graphics.body.position.x
      this.physics.body.position.z = this.graphics.body.position.z
    })

    if (camera) {
      this.graphics.camera = camera

      AnimationLoop.add(() => {
        this.graphics.camera.graphics.position.y = this.graphics.body.position.y
        this.graphics.camera.graphics.position.x = this.graphics.body.position.x
        this.graphics.camera.graphics.position.z = this.graphics.body.position.z
        this.graphics.camera.graphics.rotation.x = this.graphics.body.rotation.x
        this.graphics.camera.graphics.rotation.y = this.graphics.body.rotation.y
        this.graphics.camera.graphics.rotation.z = this.graphics.body.rotation.z
      })
    }

    if (controls?.Keyboard) {
      // this.mouse = new controls.mouse({ camera })
      this.keyboard = new controls.Keyboard({
        actor: this.graphics.body
      })
    }

    if (controls?.Mouse) {
      this.mouse = new controls.Mouse({ actor: this.graphics.body })
    }
  }
}

export default Actor

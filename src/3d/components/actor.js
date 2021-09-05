import { BoxBufferGeometry, MeshBasicMaterial, Mesh, DoubleSide } from 'three'
import { addHeightOffset } from '../utils/addHeightOffset'
import { Camera } from './camera'
import { Floor } from './floor'
import { AnimationLoop } from './animationLoop'
import { World } from './world'
import { Vec3 } from 'oimo'

const _actor = {}

export class Actor {
  constructor ({ x = 0, y = 4, z = 0, w = 1, h = 3, d = 1 } = {}) {
    const geometry = new BoxBufferGeometry(w, h, d)
    const material = new MeshBasicMaterial({
      color: 0xFFF000
    })
    const graphics = new Mesh(geometry, material)

    y = Floor.current().graphics ? addHeightOffset(Floor.current().graphics.position.y + h / 2) + y : y
    graphics.position.y = y

    const physics = {
      type: 'box',
      size: [w, h, d],
      pos: [x, y, z],
      move: true,
      density: 1,
      friction: 0.2,
      restitution: 0.2,
      allowSleep: false
    }

    _actor.graphics = graphics
    _actor.physics = World.current().add(physics)

    console.log(_actor.physics)

    AnimationLoop.add(() => {
      _actor.graphics.position.set(...Object.values(_actor.physics.getPosition()))
      _actor.physics.position.x = Camera.current().position.x
      _actor.physics.position.z = Camera.current().position.z

      //   const newX =
      //   //   const newX = _actor.physics.getPosition().x
      //   const newZ = _actor.physics.getPosition().z// _actor.graphics.position.z
      //   const newY = _actor.physics.getPosition().y

      //   _actor.physics.setPosition({
      //     x: newX,
      //     y: newY,
      //     z: newZ
      //   })

      // _actor.graphics.position.set(newX, newY, newZ)

    //   _actor.graphics.position.set(newX, newY, newZ)
    //   _actor.physics.setPosition({
    //     x: newX,
    //     y: newY,
    //     z: newZ
    //   })
    })

    return _actor
  }

  static current () {
    return _actor || new Actor()
  }
}

export default Actor

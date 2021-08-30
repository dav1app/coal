import {
  TextureLoader,
  Mesh,
  BoxBufferGeometry,
  MeshStandardMaterial
} from 'three'
import { Floor } from './floor'
import { addHeightOffset } from '../utils/addHeightOffset'
import { Box, Vec3 } from 'oimo'
import { World } from './world'

const _cube = {}

export class Cube {
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

    return _cube
  }

  static current () {
    return _cube
  }
}

export default Cube

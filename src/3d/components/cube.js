import {
  TextureLoader,
  Mesh,
  BoxBufferGeometry,
  MeshStandardMaterial,
} from 'three'
import { Floor } from './floor'
import { addHeightOffset } from '../utils/addHeightOffset'

let _cube

export class Cube {
  constructor ({ x = 0, y = 0, z = -1, w = 1, h = 1, d = 1 }) {
    const texture = new TextureLoader().load('box.jpg')
    const cube = new Mesh(
      new BoxBufferGeometry(w, h, d),
      new MeshStandardMaterial({
        roughness: 1,
        metalness: 0.04,
        map: texture
      })
    )
    cube.position.x = x
    cube.position.z = z
    cube.castShadow = true
    cube.receiveShadow = true
    cube.position.y = Floor.current() ? addHeightOffset(Floor.current().position.y + h / 2) + y : y
    _cube = cube
    return _cube
  }

  static current () {
    return _cube
  }
}

export default Cube

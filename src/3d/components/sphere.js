import {
  TextureLoader,
  Mesh,
  IcosahedronGeometry,
  MeshStandardMaterial,
  MeshBasicMaterial
} from 'three'
import { Floor } from './floor'
import { addHeightOffset } from '../utils/addHeightOffset'

let _sphere

export class Sphere {
  constructor ({ x = 0, z = -1, y = 0, w = 1, h = 1, d = 1 }) {
    const sphere = new Mesh(
      new IcosahedronGeometry(w, h, d),
      new MeshBasicMaterial({
        color: 0xff0000
      })
    )
    sphere.position.x = x
    sphere.position.z = z
    sphere.position.y = addHeightOffset(Floor.current().position.y + h / 2) + y
    _sphere = sphere
    return _sphere
  }

  static current () {
    return _sphere
  }
}

export default Sphere

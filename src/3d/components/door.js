import {
  BoxBufferGeometry,
  MeshBasicMaterial,
  Mesh
} from 'three'
import { Floor } from './floor'
import { addHeightOffset } from '../utils/addHeightOffset'

export class Door {
  constructor ({ x = 0, z = -1, y = 0, w = 1, h = 1, d = 1, c = 0xff0000 }) {
    const box = new Mesh(
      new BoxBufferGeometry(2, 4, 1),
      new MeshBasicMaterial({ color: c, wireframe: false })
    )
    box.glow = true
    box.position.x = x
    box.position.z = z

    box.position.y = Floor.current().graphics ? addHeightOffset(-1.5 + (h * 2)) + y : y
    return box
  }
}

export default Door

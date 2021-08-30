import {
  Mesh,
  SphereBufferGeometry,
  MeshBasicMaterial,
  PointLight
} from 'three'
import { Floor } from './floor'
import { addHeightOffset } from '../utils/addHeightOffset'

export class Sphere {
  constructor ({ x = 0, z = -1, y = 0, w = 1, h = 1, d = 1 }) {
    const sphere = new Mesh(
      new SphereBufferGeometry(h, 64, 32),
      new MeshBasicMaterial({ color: 0xff0000, wireframe: false })
    )

    sphere.position.x = x
    sphere.position.z = z
    sphere.position.y = Floor.current().graphics ? addHeightOffset(Floor.current().position.y + h / 2) + y : y
    return sphere
  }
}

export default Sphere

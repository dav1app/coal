import {
  SphereBufferGeometry,
  MeshBasicMaterial,
  Mesh
} from 'three'
import { Floor } from './floor'
import { addHeightOffset } from '../utils/addHeightOffset'

export class GlowingSphere {
  constructor ({ x = 0, z = -1, y = 0, w = 1, h = 1, d = 1 }) {
    const sphere = new Mesh(
      new SphereBufferGeometry(h, 64, 32),
      new MeshBasicMaterial({ color: 0xff0000, wireframe: false })
    )
    sphere.glow = true
    sphere.position.x = x
    sphere.position.z = z
    sphere.position.y = Floor.current() ? addHeightOffset(Floor.current().position.y + h / 2) + y : y
    return sphere
  }
}

export default GlowingSphere

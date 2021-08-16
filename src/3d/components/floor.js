import { PlaneBufferGeometry, TextureLoader, MeshStandardMaterial, Mesh, MeshPhongMaterial } from 'three'
import { fitTextureToGeometry } from '../utils/fitTexture'

let _floor

export class Floor {
  constructor () {
    const geometry = new PlaneBufferGeometry(100, 100, 100, 100).rotateX(-Math.PI / 2)
    const texture = new TextureLoader().load('floor.jpg')

    const material = new MeshPhongMaterial({
      shininess: 50,
      map: fitTextureToGeometry({
        geometry,
        texture,
        size: 1
      })
    })
    const floor = new Mesh(geometry, material)
    floor.position.y = -1.5
    floor.position.x = 0
    floor.position.z = 0
    floor.receiveShadow = true
    _floor = floor
    return _floor
  }

  static current () {
    return _floor
  }
}

export default Floor

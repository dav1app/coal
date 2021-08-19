import { PlaneBufferGeometry, MeshStandardMaterial, Mesh, RepeatWrapping, sRGBEncoding } from 'three'
import { TextureLoader } from './textureLoader'
import { fitTextureToGeometry } from '../utils/fitTexture'

const h = 1.2
const w = 2 * h

let _floor

export class Floor {
  constructor () {
    return this.load()
  }

  static current () {
    return _floor
  }

  async load () {
    const floorMat = new MeshStandardMaterial({
      roughness: 0.8,
      color: 0xffffff,
      metalness: 0.01,
      bumpScale: 0.001
    })

    const floorGeometry = new PlaneBufferGeometry(2, 200)
    const t1 = await new TextureLoader('hardwood2_diffuse.jpg')
    t1.wrapS = RepeatWrapping
    t1.wrapT = RepeatWrapping
    t1.anisotropy = 4

    t1.encoding = sRGBEncoding
    floorMat.map = fitTextureToGeometry({
      texture: t1,
      geometry: floorGeometry,
      size: {
        w,
        h
      }
    })
    floorMat.needsUpdate = true

    const t2 = await new TextureLoader('hardwood2_bump.jpg')
    t2.wrapS = RepeatWrapping
    t2.wrapT = RepeatWrapping
    t2.anisotropy = 4
    floorMat.bumpMap = fitTextureToGeometry({
      texture: t2,
      geometry: floorGeometry,
      size: {
        w,
        h
      }
    })
    floorMat.needsUpdate = true

    const t3 = await new TextureLoader('hardwood2_roughness.jpg')
    t3.wrapS = RepeatWrapping
    t3.wrapT = RepeatWrapping
    t3.anisotropy = 4
    floorMat.roughnessMap = t3
    floorMat.bumpMap = fitTextureToGeometry({
      texture: t1,
      geometry: floorGeometry,
      size: {
        w, h
      }
    })
    floorMat.needsUpdate = true

    const floor = new Mesh(floorGeometry, floorMat)
    floor.receiveShadow = true
    floor.rotation.x = -Math.PI / 2.0

    floor.position.y = -1.5
    floor.position.x = 0
    floor.position.z = 0
    floor.receiveShadow = true
    _floor = floor
    return _floor
  }
}

export default Floor

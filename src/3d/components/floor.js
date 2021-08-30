import { PlaneBufferGeometry, MeshStandardMaterial, Mesh, RepeatWrapping, sRGBEncoding } from 'three'
import { TextureLoader } from './textureLoader'
import { World } from './world'
import { fitTextureToGeometry } from '../utils/fitTexture'
import { addHeightOffset } from '../utils/addHeightOffset'

const _floor = {}

const textureSize = {
  w: 1.2,
  h: 2.4
}

export class Floor {
  constructor ({ x = 0, y = -1.5, z = 0, w = 2, h = 200, d = addHeightOffset(0) } = {}) {
    return this.load({ x, y, z, w, h, d })
  }

  static current () {
    return _floor
  }

  async load ({ x, y, z, w, h, d }) {
    const material = new MeshStandardMaterial({
      roughness: 0.8,
      color: 0xffffff,
      metalness: 0.01,
      bumpScale: 0.001
    })

    const geometry = new PlaneBufferGeometry(w, h)
    const t1 = await new TextureLoader('hardwood2_diffuse.jpg')
    t1.wrapS = RepeatWrapping
    t1.wrapT = RepeatWrapping
    t1.anisotropy = 4
    t1.encoding = sRGBEncoding
    material.map = fitTextureToGeometry({
      texture: t1,
      geometry,
      size: textureSize
    })
    material.needsUpdate = true

    const t2 = await new TextureLoader('hardwood2_bump.jpg')
    t2.wrapS = RepeatWrapping
    t2.wrapT = RepeatWrapping
    t2.anisotropy = 4
    material.bumpMap = fitTextureToGeometry({
      texture: t2,
      geometry,
      size: textureSize
    })
    material.needsUpdate = true

    const t3 = await new TextureLoader('hardwood2_roughness.jpg')
    t3.wrapS = RepeatWrapping
    t3.wrapT = RepeatWrapping
    t3.anisotropy = 4
    // material.roughnessMap = t3
    material.bumpMap = fitTextureToGeometry({
      texture: t1,
      geometry,
      size: textureSize
    })
    material.needsUpdate = true

    const graphics = new Mesh(geometry, material)
    graphics.receiveShadow = true
    graphics.rotation.x = -Math.PI / 2.0

    graphics.position.y = y
    graphics.position.x = x
    graphics.position.z = z

    const physics = {
      type: 'box',
      size: [w, h, d],
      pos: [x, y, z],
      rot: [90, 0, 0],
      move: false,
      density: 1,
      friction: 0.2,
      restitution: 0.2
    }

    _floor.graphics = graphics
    _floor.physics = World.current().add(physics)
    return _floor
  }
}

export default Floor

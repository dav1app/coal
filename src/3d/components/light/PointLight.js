import { PointLight as _PointLight } from 'three'

export class PointLight {
  constructor ({ x = 0, y = 0, z = -1, i = 10 }) {
    const light = new _PointLight(0xffffff, i)
    light.castShadow = true
    light.shadow.mapSize.width = 512 // default
    light.shadow.mapSize.height = 512 // default
    light.shadow.camera.near = 0.5 // default
    light.shadow.camera.far = 500 // default
    light.position.set(x, y, z)
    return light
  }
}

export default PointLight

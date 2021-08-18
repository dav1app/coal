import { PointLight as _PointLight } from 'three'

export class RedLight {
  constructor ({ x = 0, y = 1, z = 1, intensity = 10 }) {
    const light = new _PointLight(0xff0000, intensity)
    light.castShadow = true
    light.shadow.mapSize.width = 512 // default
    light.shadow.mapSize.height = 512 // default
    light.shadow.camera.near = 0.5 // default
    light.shadow.camera.far = 500 // default

    light.position.set(x, y, z)
    return light
  }
}

export default RedLight

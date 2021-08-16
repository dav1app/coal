import { PointLight as _PointLight } from 'three'

export class PointLight {
  constructor () {
    return this.setup()
  }

  setup () {
    const light = new _PointLight(0xffffff, 10)
    light.castShadow = true
    light.shadow.mapSize.width = 512 // default
    light.shadow.mapSize.height = 512 // default
    light.shadow.camera.near = 0.5 // default
    light.shadow.camera.far = 500 // default
    return light
  }

  render () {

  }
}

export default PointLight

import { SpotLight as _SpotLight, SpotLightHelper, Group } from 'three'

export class SpotLight {
  constructor ({ x, y, z }) {
    const light = new _SpotLight(0xffffff, 5, 0, 1.5, 1)
    light.position.set(0, 1, z)
    light.rotateX(120)

    return light
  }
}

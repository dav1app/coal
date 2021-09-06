import { AmbientLight as _AmbientLight } from 'three'

export class AmbientLight {
  constructor ({ color = 0xffffff, lumens = 1 } = {}) {
    return {
      graphics: new _AmbientLight(color, lumens)
    }
  }
}

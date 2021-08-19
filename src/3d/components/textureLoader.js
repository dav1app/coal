import { TextureLoader as _TextureLoader } from 'three'

export class TextureLoader {
  constructor (url) {
    return new Promise((resolve, reject) => {
      const textureLoader = new _TextureLoader()
      textureLoader.load(url, resolve)
    })
  }
}

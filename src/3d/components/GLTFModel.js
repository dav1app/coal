import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

export class GLTFModel {
  constructor (url) {
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader(url)
      loader.setDRACOLoader(new DRACOLoader())
      loader.load(
        url,
        gltf => {
          resolve(gltf.scene)
        }
      )
    })
  }
}

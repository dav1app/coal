
import { Box3, Vector3 } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { Floor } from './floor'

export class GLTFModel {
  constructor (url, { x = 0, y = 0, z = -1 }) {
    return new Promise((resolve, reject) => {
      const loader = new GLTFLoader()
      loader.setDRACOLoader(new DRACOLoader())
      loader.load(
        url,
        gltf => {
          const meshes = []
          gltf.scene.traverse((object) => {
            if (object.isMesh) {
              const box = new Box3().setFromObject(object)
              const sizes = box.getSize(new Vector3())
              object.position.y = Floor.current().graphics ? Floor.current().graphics.position.y + (sizes.y / 2) : 0
              meshes.push(object)
            }
          })

          gltf.scene.position.set(x, y, z)

          resolve(gltf.scene)
        },
        () => {},
        (error) => {
          reject(error)
        }
      )
    })
  }
}

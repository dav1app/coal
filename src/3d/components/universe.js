import { Mesh } from 'three'
import { Scene } from './scene'
import { Actor } from './actor'
import { World } from './world'
import { Renderer } from './renderer'
import { AnimationLoop } from './animationLoop'

let _universe = {}

export class Universe {
  constructor () {
    this.renderer = new Renderer()
    this.word = new World()
    this.scene = new Scene()
    this.camera = undefined

    _universe = this
  }

  async add (obj) {
    obj = await obj
    switch (true) {
      case obj instanceof Mesh:
        this.scene.add(obj)
        break
      case obj instanceof Actor:
        if (obj.graphics.body) this.scene.add(obj.graphics.body)
        if (obj.graphics.camera) {
          this.scene.add(obj.graphics.camera.graphics)
          this.addCameraToRenderer(obj.graphics.camera.graphics)
        }
        break
      default:
        this.scene.add(obj.graphics)
    }
  }

  static current () {
    return _universe
  }

  addCameraToRenderer (camera) {
    AnimationLoop.add(() => {
      this.renderer.render(this.scene, camera)
    })
  }
}

export default Universe

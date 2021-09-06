import { Mesh, PerspectiveCamera } from 'three'
import { Scene } from './scene'
import { World } from './world'
import { Camera } from './camera'
import { Renderer } from './renderer'
import { AnimationLoop } from './animationLoop'

let _universe = {}

export class Universe {
  constructor () {
    this.renderer = new Renderer()
    this.word = new World()
    this.scene = new Scene()
    this.graphics = Scene.current()
    this.physics = World.current()

    _universe = this
  }

  async add (obj) {
    obj = await obj
    switch (true) {
      case obj instanceof PerspectiveCamera:
        this.scene.add()
        AnimationLoop.add(() => {
          this.renderer.render(this.graphics, obj)
        })
        break
      case obj instanceof Mesh:
        this.scene.add(obj)
        break
      default:
        _universe.graphics.add(obj.graphics)
    }
  }

  static current () {
    return _universe
  }
}

export default Universe

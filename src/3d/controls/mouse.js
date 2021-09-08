import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import { Raycaster, Vector3 } from 'three'
import { Renderer } from '../components/renderer'
import { AnimationLoop } from '../components/animationLoop'
import { EventLoop } from '../components/eventLoop'

let _mouse

export class Mouse {
  constructor ({ actor } = {}) {
    this.graphics = {}
    this.controls = new PointerLockControls(actor, Renderer.current().domElement)
    this.raycaster = new Raycaster(new Vector3(), new Vector3(0, -1, 0), 0, 10)

    EventLoop.add('click', () => {
      this.controls.lock()
    })

    console.log(this.raycaster)
    AnimationLoop.add(() => {
      this.raycaster.ray.origin.copy(actor.position)
    })

    return _mouse
  }
}

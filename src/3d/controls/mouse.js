import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import { Renderer } from '../components/renderer'
import { Camera } from '../components/camera'
import { Raycaster } from '../components/raycaster'
import { AnimationLoop } from '../components/animationLoop'

let _mouse

export class Mouse {
  constructor () {
    _mouse = new PointerLockControls(Camera.current(), Renderer.current().domElement)

    document.addEventListener('click', function () {
      _mouse.lock()
    })

    AnimationLoop.add(() => {
      Raycaster.ray.origin.copy(_mouse.getObject().position)
      Raycaster.ray.origin.y -= 10
    })

    return _mouse
  }
}

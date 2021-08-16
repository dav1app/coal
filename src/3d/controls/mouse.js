import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import { Renderer } from '../components/renderer'
import { Camera } from '../components/camera'
import { Raycaster } from '../components/raycaster'
import { AnimationLoop } from '../components/animationLoop'

let controls

function setup () {
  controls = new PointerLockControls(Camera.current(), Renderer.current().domElement)

  document.addEventListener('click', function () {
    controls.lock()
  })

  AnimationLoop.add(() => {
    Raycaster.ray.origin.copy(controls.getObject().position)
    Raycaster.ray.origin.y -= 10
  })
}

export function Mouse () {
  setup()
}

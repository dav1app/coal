import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import { Renderer } from '../components/renderer'
import { Camera } from '../components/camera'

let _controls

export class Controls {
  constructor () {
    _controls = new PointerLockControls(Camera.current(), Renderer.domElement)
    return _controls
  }

  static current () {
    return _controls
  }
}

export default Controls


import { Vector3 } from 'three'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import { Renderer } from '../components/renderer'
import { Camera } from '../components/camera'
import { AnimationLoop } from '../components/animationLoop'

let controls

let moveForward = false
let moveBackward = false
let moveLeft = false
let moveRight = false

let isWalking = false
const isMoving = false

const speedFast = 50.0
const speedSlow = 20.0

let speed = speedFast
const head_bob_frequency = 0.01
const head_bob_frequency_walking = 0.003
const head_bob_amplitude = 0.008

let prevTime = global.performance.now()
const velocity = new Vector3()
const direction = new Vector3()

function setup () {
  controls = new PointerLockControls(Camera.current(), Renderer.domElement)
  const onKeyDown = function (event) {
    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        moveForward = true
        break
      case 'ArrowLeft':
      case 'KeyA':
        moveLeft = true
        break
      case 'ArrowDown':
      case 'KeyS':
        moveBackward = true
        break
      case 'ArrowRight':
      case 'KeyD':
        moveRight = true
        break
      case 'ShiftLeft':
        speed = speedSlow
        isWalking = true
        break
    }
  }

  const onKeyUp = function (event) {
    switch (event.code) {
      case 'ArrowUp':
      case 'KeyW':
        moveForward = false
        break
      case 'ArrowLeft':
      case 'KeyA':
        moveLeft = false
        break
      case 'ArrowDown':
      case 'KeyS':
        moveBackward = false
        break
      case 'ArrowRight':
      case 'KeyD':
        moveRight = false
        break
      case 'ShiftLeft':
        speed = speedFast
        isWalking = false
        break
      default:
        console.log(event.code)
    }
  }

  document.addEventListener('keydown', onKeyDown)
  document.addEventListener('keyup', onKeyUp)
}

AnimationLoop.add(() => {
  const time = global.performance.now()

  const delta = (time - prevTime) / 1000

  velocity.x -= velocity.x * 10.0 * delta
  velocity.z -= velocity.z * 10.0 * delta
  direction.z = Number(moveForward) - Number(moveBackward)
  direction.x = Number(moveRight) - Number(moveLeft)
  direction.normalize()

  if (moveForward || moveBackward) {
    velocity.z -= direction.z * speed * delta
  }

  if (moveLeft || moveRight) {
    velocity.x -= direction.x * speed * delta
  }

  controls.moveForward(-velocity.z * delta)
  controls.moveRight(-velocity.x * delta)

  if (moveForward || moveBackward || moveLeft || moveRight) {
    controls.getObject().position.y += Math.sin(time * (isWalking ? head_bob_frequency_walking : head_bob_frequency)) * head_bob_amplitude
  }

  prevTime = time
})

export function Keyboard () {
  setup()
}

export default Keyboard

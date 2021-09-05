
import { Vector3 } from 'three'
import { AnimationLoop } from '../components/animationLoop'
import { Controls } from './controls'
import { Actor } from '../components/actor'
import { arrayEqual } from '../utils/arrayEqual'

let _keyboard

let moveForward = false
let moveBackward = false
let moveLeft = false
let moveRight = false

let isWalking = false

const speedFast = 50.0
const speedSlow = 20.0

let speed = speedFast
const headBobFrequency = 0.01
const headBobFrequencyWalking = 0.003
const headBobAmplitude = 0.07
const headBobAmplitudeWalking = 0.003

let prevTime = global.performance.now()
const velocity = new Vector3()
const direction = new Vector3()

export class Keyboard {
  constructor () {
    _keyboard = Controls.current()
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
      }
    }

    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('keyup', onKeyUp)

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

      _keyboard.moveForward(-velocity.z * delta)
      _keyboard.moveRight(-velocity.x * delta)

      let wooble = 0

      if (moveForward || moveBackward || moveLeft || moveRight) {
        wooble = -Math.abs(Math.sin(time * (isWalking ? headBobFrequencyWalking : headBobFrequency))) * (isWalking ? headBobAmplitudeWalking : headBobAmplitude)
      }

      _keyboard.getObject().position.y = (Actor.current().physics.getPosition().y) + wooble

      prevTime = time
    })

    return _keyboard
  }
}

export default Keyboard

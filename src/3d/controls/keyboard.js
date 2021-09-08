
import { Vector3 } from 'three'
import { AnimationLoop } from '../components/animationLoop'
import { keyboardControls } from '../configs/keyboardControls'
import { EventLoop } from '../components/eventLoop'

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
  constructor ({
    actor
  } = {}) {
    this._vector = new Vector3()

    this.moveForward = function (distance) {
      this._vector.setFromMatrixColumn(actor.matrix, 0)
      this._vector.crossVectors(actor.up, this._vector)
      actor.position.addScaledVector(this._vector, distance)
    }

    this.moveRight = function (distance) {
      this._vector.setFromMatrixColumn(actor.matrix, 0)
      actor.position.addScaledVector(this._vector, distance)
    }

    EventLoop.add('keydown', (event) => {
      switch (event.code) {
        case keyboardControls.moveForward:
          moveForward = true
          break
        case keyboardControls.moveLeft:
          moveLeft = true
          break
        case keyboardControls.moveBackward:
          moveBackward = true
          break
        case keyboardControls.moveRight:
          moveRight = true
          break
        case 'ShiftLeft':
          speed = speedSlow
          isWalking = true
          break
      }
    })

    EventLoop.add('keyup', (event) => {
      switch (event.code) {
        case keyboardControls.moveForward:
          moveForward = false
          break
        case keyboardControls.moveLeft:
          moveLeft = false
          break
        case keyboardControls.moveBackward:
          moveBackward = false
          break
        case keyboardControls.moveRight:
          moveRight = false
          break
        case 'ShiftLeft':
          speed = speedFast
          isWalking = false
          break
      }
    })

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

      this.moveForward(-velocity.z * delta)
      this.moveRight(-velocity.x * delta)

      let wooble = 0

      if (moveForward || moveBackward || moveLeft || moveRight) {
        wooble = -Math.abs(Math.sin(time * (isWalking ? headBobFrequencyWalking : headBobFrequency))) * (isWalking ? headBobAmplitudeWalking : headBobAmplitude)
      }

      prevTime = time
    })

    return _keyboard
  }
}

export default Keyboard

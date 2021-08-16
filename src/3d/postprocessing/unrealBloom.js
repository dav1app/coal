import { UnrealBloomPass as _UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { Vector2 } from 'three'

export const UnrealBloomPass = new _UnrealBloomPass(new Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85)

export default UnrealBloomPass

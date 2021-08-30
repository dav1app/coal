import { World as _World } from 'oimo'

let _world

export class World {
  constructor () {
    _world = new _World({
      timestep: 1 / 60,
      iterations: 2,
      broadphase: 2, // 1 brute force, 2 sweep and prune, 3 volume tree
      worldscale: 1, // scale full world
      random: true,
      gravity: [0, -9.8, 0]
    })
    return _world
  }

  static current () {
    return _world
  }
}

export default World

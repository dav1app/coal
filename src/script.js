import './style.css'
import { AmbientLight } from './3d/components/light/AmbientLight'
import { Keyboard } from './3d/controls/keyboard'
import { Cube } from './3d/components/cube'
import { Camera } from './3d/components/camera'
import { Floor } from './3d/components/floor'
import { Mouse } from './3d/controls/mouse'
import { AnimationLoop } from './3d/components/animationLoop'
import { HUD } from './3d/components/hud'
import { Door } from './3d/components/door'
import { Howl } from 'howler'
import { Universe } from './3d/components/universe'
import { Actor } from './3d/components/actor'
import { Controls } from './3d/controls/controls'

// const sound = new Howl({
//   src: 'dark-ambient.mp3',
//   autoplay: true,
//   loop: true
// })

// sound.play()

(async function () {
  const universe = new Universe() // Creates the renderer, the scene, the world.
  await universe.add(new Camera({ child: new HUD() })) // Add a new camera
  await universe.add(new AmbientLight()) // Adds a new ambient light.
  await universe.add(new Floor()) // Adds a floor. Floors cannot move on the universe.
  await universe.add(new Actor()) // Adds an actor to the universe. Camera should be attached to it.
  await universe.add(new Cube({
    y: 4,
    x: -1,
    z: -6
  }))
  await universe.add(new Door({
    w: 2,
    h: 1,
    d: 1,
    x: 0,
    z: 50,
    c: 0xffffff
  }))
  await universe.add(new Door({
    w: 1,
    h: 1,
    d: 1,
    x: 0,
    z: -50,
    c: 0xff0000
  }))

  new Controls() // This is manually hooked to the camera and the actor for now. I'm working on this.
  new Mouse()
  new Keyboard()

  AnimationLoop.start() // This starts to render the layers.
})()

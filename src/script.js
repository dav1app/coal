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
// const sound = new Howl({
//   src: 'dark-ambient.mp3',
//   autoplay: true,
//   loop: true
// })

// sound.play()

(async function () {
  const universe = new Universe()
  await universe.add(new AmbientLight())
  await universe.add(new Floor({
    w: 200,
    h: 200
  }))

  await universe.add(new Actor({
    z: 10,
    y: 1.4
  }))

  await universe.add(new Actor({
    z: 4,
    camera: new Camera(),
    controls: {
      Mouse,
      Keyboard
    }
  }))

  await universe.add(new Actor({
    z: 3
  }))
  await universe.add(new Actor({
    x: 6
  }))
  await universe.add(new Actor({
    x: 4
  }))

  await universe.add(new Cube({
    y: 4,
    x: -1,
    z: -6
  }))

  await universe.add(new Cube({
    y: 4,
    x: 0,
    z: -10
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

  AnimationLoop.start() // This starts to render the layers.
})()

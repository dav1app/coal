import './style.css'
import { Layers, AmbientLight, PerspectiveCamera } from 'three'
import PointLight from './3d/components/light/PointLight'
import { RedLight } from './3d/components/light/RedLight'
import { Keyboard } from './3d/controls/keyboard'
import { Cube } from './3d/components/cube'
import { Camera } from './3d/components/camera'
import { Renderer } from './3d/components/renderer'
import { Scene } from './3d/components/scene'
import { Floor } from './3d/components/floor'
import { Mouse } from './3d/controls/mouse'
import { AnimationLoop } from './3d/components/animationLoop'
import { HUD } from './3d/components/hud'
import { Door } from './3d/components/door'
import { Howl } from 'howler'
import { GLTFModel } from './3d/components/GLTFModel'
import { RenderBloom } from './bloom'
import { Universe } from './3d/components/universe'
import { World } from './3d/components/world'
import { Actor } from './3d/components/actor'
import { Sizes } from './3d/configs/sizes'
import { Controls } from './3d/controls/controls'

async function setup () {
  // const sound = new Howl({
  //   src: 'dark-ambient.mp3',
  //   autoplay: true,
  //   loop: true
  // })

  // sound.play()

  new World()
  const scene = new Scene()
  const universe = new Universe()
  const hud = new HUD()
  const camera = new Camera(hud)

  const ambientLight = new AmbientLight(0x404040, 1)
  universe.graphics.add(ambientLight)

  const bloomLayer = new Layers()
  bloomLayer.set(1)

  const renderer = new Renderer()
  const floor = await new Floor()

  universe.add(floor)

  const actor = new Actor()
  universe.add(actor)

  const cube = await new Cube({
    y: 4,
    x: -1,
    z: -6
  })
  universe.add(cube)

  const cabin = await (new GLTFModel('cabin7.gltf', {
    x: 4.25
  }))

  scene.add(cabin)

  const cabinLight = new PointLight({
    x: 4,
    y: 0,
    z: 1
  })
  scene.add(cabinLight)

  const whiteLight = new PointLight({
    x: 0,
    y: 1,
    z: 50,
    i: 1
  })
  scene.add(whiteLight)

  const door1 = new Door({
    w: 2,
    h: 1,
    d: 1,
    x: 0,
    z: 50,
    c: 0xffffff
  })
  door1.layers.enable(1)
  scene.add(door1)

  const door2 = new Door({
    w: 1,
    h: 1,
    d: 1,
    x: 0,
    z: -50,
    c: 0xff0000
  })

  door2.layers.enable(1)
  scene.add(door2)

  scene.add(new RedLight({
    x: 0,
    y: 1,
    z: -50,
    i: 1
  }))

  new Controls()
  new Mouse()
  new Keyboard()

  RenderBloom({
    renderer,
    scene,
    camera,
    bloomLayer
  })

  AnimationLoop.add(() => {
    renderer.render(scene, camera)
  })

  AnimationLoop.start()
}

async function main () {
  setup()
}

main()

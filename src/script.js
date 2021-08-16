import './style.css'
import PointLight from './3d/components/light/PointLight'
import { Keyboard } from './3d/controls/keyboard'
import { Camera } from './3d/components/camera'
import { Cube } from './3d/components/cube'
import { Renderer } from './3d/components/renderer'
import { Scene } from './3d/components/scene'
import { Floor } from './3d/components/floor'
import { Mouse } from './3d/controls/mouse'
import { AnimationLoop } from './3d/components/animationLoop'
import { Sphere } from './3d/components/sphere'
// import { Physics } from './3d/physics'

async function setup () {
  new Renderer()
  const scene = new Scene()
  const camera = new Camera()

  scene.add(camera)
  scene.add(new PointLight())
  scene.add(new Floor())

  const cube = new Cube({
    x: 0,
    z: -4
  })

  const sphere = new Sphere({
    x: 0,
    z: -6,
    y: 4
  })

  scene.add(cube)
  scene.add(sphere)

  Mouse()
  Keyboard()

  AnimationLoop.add(() => {
    Renderer.current().render(Scene.current(), camera)
  })

  AnimationLoop.start()
}

async function main () {
  setup()
}

main()

import './style.css'
import { Vector2 } from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

import PointLight from './3d/components/light/PointLight'
import { RedLight } from './3d/components/light/RedLight'
import { Keyboard } from './3d/controls/keyboard'
import { Camera } from './3d/components/camera'
import { Cube } from './3d/components/cube'
import { Renderer } from './3d/components/renderer'
import { Scene } from './3d/components/scene'
import { Sizes } from './3d/configs/sizes'
import { Floor } from './3d/components/floor'
import { Mouse } from './3d/controls/mouse'
import { AnimationLoop } from './3d/components/animationLoop'
import { Sphere } from './3d/components/sphere'
// import { Physics } from './3d/physics'

async function setup () {
  const scene = new Scene()
  const camera = new Camera()
  camera.layers.enable(1)
  const renderer = new Renderer()

  scene.add(camera)
  scene.add(new RedLight({
    x: 0,
    y: 4,
    z: -2.25
  }))
  scene.add(new Floor())

  const sphere = new Sphere({
    w: 1,
    h: 1,
    d: 1,
    x: 0,
    y: 4,
    z: -2.25
  })
  sphere.layers.set(1)
  scene.add(sphere)

  Mouse()
  Keyboard()

  const renderScene = new RenderPass(scene, camera)

  const effectFXAA = new ShaderPass(FXAAShader)
  effectFXAA.uniforms.resolution.value.set(1 / Sizes.width, 1 / Sizes.height)

  const bloomPass = new UnrealBloomPass(new Vector2(Sizes.width, Sizes.height), 1.5, 0.4, 0.85)
  bloomPass.threshold = 0.21
  bloomPass.strength = 1.2
  bloomPass.radius = 0.55
  bloomPass.renderToScreen = true

  const composer = new EffectComposer(renderer)
  composer.setSize(Sizes.width, Sizes.height)
  composer.addPass(renderScene)
  composer.addPass(effectFXAA)
  composer.addPass(bloomPass)

  AnimationLoop.add(() => {
    renderer.clear()

    camera.layers.set(1)
    composer.render()

    renderer.clearDepth()
    camera.layers.set(0)
    renderer.render(scene, camera)
  })

  AnimationLoop.start()
}

async function main () {
  setup()
}

main()

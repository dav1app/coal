import './style.css'
import { Vector2, PerspectiveCamera, WebGLRenderer, Mesh, BoxGeometry, MeshBasicMaterial } from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'

// import PointLight from './3d/components/light/PointLight'
// import { Keyboard } from './3d/controls/keyboard'
import { Camera } from './3d/components/camera'
import { Renderer } from './3d/components/renderer'
// import { Cube } from './3d/components/cube'
import { Sizes } from './3d/configs/sizes'
import { Canvas } from './3d/components/canvas'
import { Scene } from './3d/components/scene'
import Sphere from './3d/components/sphere'
// import { Floor } from './3d/components/floor'
// import { Mouse } from './3d/controls/mouse'
// import { AnimationLoop } from './3d/components/animationLoop'
// import { Sphere } from './3d/components/sphere'
// import { Physics } from './3d/physics'

const scene = new Scene()
const camera = new Camera()
camera.layers.enable(1)
const renderer = new Renderer()

const sphere = new Sphere({
  w: 5,
  h: 5,
  d: 1,
  z: -2.25
})
sphere.layers.set(1)
scene.add(sphere)

/** COMPOSER */
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

render()
function render () {
  global.requestAnimationFrame(render)

  renderer.clear()

  camera.layers.set(1)
  composer.render()

  renderer.clearDepth()
  camera.layers.set(0)
  renderer.render(scene, camera)
}

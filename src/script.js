import './style.css'
import { Vector2, ShaderMaterial, Layers, MeshBasicMaterial, Mesh } from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
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
import { GlowingSphere } from './3d/components/glowingSphere'
import { Sphere } from './3d/components/sphere'
import { HUD } from './3d/components/hud'
// import { Physics } from './3d/physics'

async function setup () {
  const vertexShader = 'varying vec2 vUv;void main(){vUv = uv;gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );}'
  const fragmentShader = 'uniform sampler2D baseTexture;uniform sampler2D bloomTexture;varying vec2 vUv;void main() {	gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );}'
  const scene = new Scene()
  const materials = {}

  const bloomLayer = new Layers()
  bloomLayer.set(1)

  const camera = new Camera()
  const renderer = new Renderer()

  scene.add(camera)

  const hud = new HUD()
  hud.layers.enable(1)

  scene.add(hud)

  const pointlight = new PointLight({
    x: -30,
    y: 1,
    z: -4,
    i: 10
  })
  scene.add(pointlight)

  const floor = await new Floor()
  scene.add(floor)

  const glowingSphere = new GlowingSphere({
    w: 1,
    h: 1,
    d: 1,
    x: 0,
    y: 1,
    z: -2.25
  })

  glowingSphere.layers.enable(1)
  scene.add(glowingSphere)

  const redLight = new RedLight({
    x: 0,
    y: 1,
    z: -2.25,
    i: 1
  })

  scene.add(redLight)

  const sphere = new Sphere({
    w: 1,
    h: 1,
    d: 1,
    x: 2,
    y: 2,
    z: -2.25
  })

  scene.add(sphere)

  Mouse()
  Keyboard()

  const renderPass = new RenderPass(scene, camera)

  const bloomPass = new UnrealBloomPass(new Vector2(Sizes.width, Sizes.height), 1.5, 0.4, 0.85)
  bloomPass.threshold = 0.21
  bloomPass.strength = 1.2
  bloomPass.radius = 0.55

  const bloomComposer = new EffectComposer(renderer)
  bloomComposer.renderToScreen = false
  bloomComposer.addPass(renderPass)
  bloomComposer.addPass(bloomPass)

  scene.traverse((obj) => {
    if (obj.material) obj.material.dispose()
  })

  function darkenNonBloomed (obj) {
    if (obj.isMesh && obj.layers && !bloomLayer.test(obj.layers)) {
      materials[obj.uuid] = obj.material
      obj.material = new MeshBasicMaterial({ color: 0x0 })
    }
  }

  function restoreMaterial (obj) {
    if (materials[obj.uuid]) {
      obj.material = materials[obj.uuid]
      delete materials[obj.uuid]
    }
  }

  const shaderPass = new ShaderPass(
    new ShaderMaterial({
      uniforms: {
        baseTexture: { value: null },
        bloomTexture: { value: bloomComposer.renderTarget2.texture }
      },
      vertexShader,
      fragmentShader,
      defines: {}
    }),
    'baseTexture'
  )
  shaderPass.needsSwap = true

  const finalComposer = new EffectComposer(renderer)
  finalComposer.addPass(renderPass)
  finalComposer.addPass(shaderPass)

  AnimationLoop.add(() => {
    scene.traverse(darkenNonBloomed)
    bloomComposer.render()
    scene.traverse(restoreMaterial)
    finalComposer.render()
  })

  AnimationLoop.start()
}

async function main () {
  setup()
}

main()

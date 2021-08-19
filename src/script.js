import './style.css'
import { Vector2, ShaderMaterial, Layers, MeshBasicMaterial, Mesh, AmbientLight, Vector3 } from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import PointLight from './3d/components/light/PointLight'
import { RedLight } from './3d/components/light/RedLight'
import { Keyboard } from './3d/controls/keyboard'
import { Camera } from './3d/components/camera'
import { Renderer } from './3d/components/renderer'
import { Scene } from './3d/components/scene'
import { Sizes } from './3d/configs/sizes'
import { Floor } from './3d/components/floor'
import { Mouse } from './3d/controls/mouse'
import { AnimationLoop } from './3d/components/animationLoop'
import { HUD } from './3d/components/hud'
import { Door } from './3d/components/door'
import { Howl } from 'howler'
// import { Physics } from './3d/physics'

async function setup () {
  const sound = new Howl({
    src: 'dark-ambient.mp3',
    autoplay: true,
    loop: true
  })

  sound.play()
  const vertexShader = 'varying vec2 vUv;void main(){vUv = uv;gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );}'
  const fragmentShader = 'uniform sampler2D baseTexture;uniform sampler2D bloomTexture;varying vec2 vUv;void main() {	gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );}'
  const scene = new Scene()
  const materials = {}

  const ambientLight = new AmbientLight(0x404040, 0.5)
  scene.add(ambientLight)
  const bloomLayer = new Layers()
  bloomLayer.set(1)

  const hud = new HUD()

  const camera = new Camera(hud)
  scene.add(camera)

  const renderer = new Renderer()

  const floor = await new Floor()
  scene.add(floor)

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

  const redLight = new RedLight({
    x: 0,
    y: 1,
    z: -50,
    i: 1
  })

  scene.add(redLight)

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

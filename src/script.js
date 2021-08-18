import './style.css'
import { Vector2, ShaderMaterial, Layers } from 'three'
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
import { Sphere } from './3d/components/sphere'
import { HUD } from './3d/components/hud'
// import { Physics } from './3d/physics'

async function setup () {
  const scene = new Scene()

  const bloomLayer = new Layers()
  bloomLayer.set(1)

  const camera = new Camera()
  camera.layers.enable(1)
  const renderer = new Renderer()
  scene.add(camera)

  const hud = new HUD()

  scene.add(hud)

  const pointlight = new PointLight({
    x: -30,
    y: 1,
    z: -4
  })
  scene.add(pointlight)

  scene.add(new RedLight({
    x: 0,
    y: 1,
    z: -2.25,
    intensity: 0.5
  }))

  const floor = await new Floor()
  scene.add(floor)

  const sphere = new Sphere({
    w: 1,
    h: 1,
    d: 1,
    x: 0,
    y: 1,
    z: -2.25
  })
  sphere.layers.set(1)
  scene.add(sphere)

  Mouse()
  Keyboard()

  const renderPass = new RenderPass(scene, camera)

  const bloomPass = new UnrealBloomPass(new Vector2(Sizes.width, Sizes.height), 1.5, 0.4, 0.85)
  bloomPass.threshold = 0.21
  bloomPass.strength = 1.2
  bloomPass.radius = 0.55
  bloomPass.renderToScreen = true

  const bloomComposer = new EffectComposer(renderer)
  bloomComposer.renderToScreen = false
  bloomComposer.addPass(renderPass)
  bloomComposer.addPass(bloomPass)

  const shaderPass = new ShaderPass(
    new ShaderMaterial({
      uniforms: {
        baseTexture: { value: null },
        bloomTexture: { value: bloomComposer.renderTarget2.texture }
      },
      vertexShader: `
      varying vec2 vUv;

      void main() {

          vUv = uv;

          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }`,
      fragmentShader: `
      uniform sampler2D baseTexture;
			uniform sampler2D bloomTexture;

			varying vec2 vUv;

			void main() {

				gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );

			}
      `,
      defines: {}
    }),
    'baseTexture'
  )
  shaderPass.needsSwap = true

  const finalComposer = new EffectComposer(renderer)
  finalComposer.addPass(renderPass)
  finalComposer.addPass(shaderPass)

  AnimationLoop.add(() => {
    // scene.traverse(darkenNonBloomed)
    bloomComposer.render()
    // scene.traverse(restoreMaterial)
    finalComposer.render()
  })

  AnimationLoop.start()
}

async function main () {
  setup()
}

main()

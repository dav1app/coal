import { Vector2, ShaderMaterial, MeshBasicMaterial } from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { AnimationLoop } from './3d/components/animationLoop'
import { Sizes } from './3d/configs/sizes'

const materials = {}

const vertexShader = 'varying vec2 vUv;void main(){vUv = uv;gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );}'
const fragmentShader = 'uniform sampler2D baseTexture;uniform sampler2D bloomTexture;varying vec2 vUv;void main() {	gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );}'

export function RenderBloom ({
  renderer,
  scene,
  camera,
  bloomLayer
}) {
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
}

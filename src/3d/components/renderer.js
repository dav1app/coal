import { WebGLRenderer, PCFSoftShadowMap, sRGBEncoding, ACESFilmicToneMapping } from 'three'
import { Canvas } from './canvas'
import { Sizes } from '../configs/sizes'
import { pixelRatio, antialias } from '../configs/video'

let _renderer

export class Renderer {
  constructor () {
    const renderer = new WebGLRenderer({
      powerPreference: 'high-performance',
      antialias,
      canvas: Canvas
    })
    renderer.setPixelRatio(window.devicePixelRatio / pixelRatio)
    renderer.shadowMap.enabled = true
    // renderer.autoClear = false
    renderer.precision = 'lowp'
    renderer.toneMapping = ACESFilmicToneMapping
    renderer.shadowMapSoft = true
    // renderer.stencil = false
    // renderer.depth = false
    renderer.shadowMap.type = PCFSoftShadowMap
    renderer.physicallyCorrectLights = true
    renderer.gammaFactor = 2.2
    renderer.outputEncoding = sRGBEncoding
    renderer.setSize(Sizes.width, Sizes.height)
    renderer.setClearColor(0x0)
    _renderer = renderer

    window.addEventListener('resize', () => {
      _renderer.setSize(Sizes.width, Sizes.height)
    })

    return _renderer
  }

  static current () {
    return _renderer
  }
}

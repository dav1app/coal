import { WebGLRenderer, PCFSoftShadowMap, sRGBEncoding, ReinhardToneMapping } from 'three'
import { Canvas } from './canvas'
import { Sizes } from '../configs/sizes'

let _renderer

export class Renderer {
  constructor () {
    const renderer = new WebGLRenderer({
      alpha: false,
      powerPreference: 'high-performance',
      antialias: true,
      depthBuffer: false,
      canvas: Canvas
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    renderer.toneMapping = ReinhardToneMapping
    renderer.shadowMapSoft = true
    renderer.stencil = false
    renderer.depth = false
    renderer.shadowMap.type = PCFSoftShadowMap
    renderer.physicallyCorrectLights = true
    renderer.setClearColor(0xcce0ff, 0.5)
    renderer.gammaFactor = 2.2
    renderer.gammaInput = true
    renderer.gammaOutput = true
    renderer.outputEncoding = sRGBEncoding

    renderer.setSize(Sizes.width, Sizes.height)

    _renderer = renderer

    return _renderer
  }

  static current () {
    return _renderer
  }
}

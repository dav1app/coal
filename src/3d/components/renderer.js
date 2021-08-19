import { WebGLRenderer, PCFSoftShadowMap, sRGBEncoding, ACESFilmicToneMapping } from 'three'
import { Canvas } from './canvas'
import { Sizes } from '../configs/sizes'

let _renderer

export class Renderer {
  constructor () {
    const renderer = new WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: true,
      canvas: Canvas
    })
    renderer.setPixelRatio(window.devicePixelRatio / 1)
    renderer.shadowMap.enabled = true
    renderer.toneMapping = ACESFilmicToneMapping
    renderer.shadowMapSoft = true
    renderer.stencil = false
    renderer.depth = false
    renderer.shadowMap.type = PCFSoftShadowMap
    renderer.physicallyCorrectLights = true
    renderer.gammaFactor = 2.2
    renderer.gammaInput = true
    renderer.gammaOutput = true
    renderer.outputEncoding = sRGBEncoding
    renderer.setSize(Sizes.width, Sizes.height)
    renderer.setClearColor(0x0)
    _renderer = renderer

    return _renderer
  }

  static current () {
    return _renderer
  }
}

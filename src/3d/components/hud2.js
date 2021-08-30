
import { Scene, Texture, Mesh, MeshBasicMaterial, PlaneGeometry, Group } from 'three'
import { Sizes } from '../configs/sizes'

export class HUD2 {
  constructor () {
    const hudCanvas = document.createElement('div')
    hudCanvas.innerText = 'Another hud'
    hudCanvas.style.position = 'absolute'
  }
}

new HUD2()

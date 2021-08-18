
import { Scene, Texture, Mesh, MeshBasicMaterial, PlaneGeometry } from 'three'
import { Sizes } from '../configs/sizes'

export class HUD {
  constructor () {
    const hudCanvas = document.createElement('canvas')

    // Get 2D context and draw something supercool.
    const hudBitmap = hudCanvas.getContext('2d')
    hudBitmap.font = 'Normal 40px Times New Roman'
    hudBitmap.textAlign = 'center'
    hudBitmap.fillStyle = 'rgba(245,245,245,1)'
    hudBitmap.textBaseline = 'middle'
    hudBitmap.textAlign = 'center'
    const text = 'Initializing...'
    hudBitmap.fillText(text, hudBitmap.measureText(text).width / 2, 20)

    const hudTexture = new Texture(hudCanvas)
    hudTexture.needsUpdate = true

    const material = new MeshBasicMaterial({ map: hudTexture })
    material.transparent = true

    const planeGeometry = new PlaneGeometry(1, 1)
    const plane = new Mesh(planeGeometry, material)
    return plane
  }
}

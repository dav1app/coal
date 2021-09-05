
import { Texture, Mesh, MeshBasicMaterial, PlaneGeometry, Group } from 'three'

export class HUD {
  constructor () {
    const hudCanvas = document.createElement('canvas')

    // Get 2D context and draw something supercool.
    const hudBitmap = hudCanvas.getContext('2d')
    const fontSize = 20
    hudBitmap.fillStyle = 'white'
    hudBitmap.font = `Normal ${fontSize}px Times New Roman`

    const text = '<-- Chose your side -->'
    hudBitmap.fillText(text, 0, fontSize)

    const hudTexture = new Texture(hudCanvas)
    hudTexture.needsUpdate = true

    const material = new MeshBasicMaterial({
      map: hudTexture,
      color: 'white'
    })

    material.transparent = true

    const planeGeometry = new PlaneGeometry(0.5, 0.25)
    const group = new Group()
    const mesh = new Mesh(planeGeometry, material)
    mesh.layers.enable(1)
    group.add(mesh)

    return group
  }
}

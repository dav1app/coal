import { RepeatWrapping } from 'three'

export function fitTextureToGeometry ({
  texture,
  geometry,
  size: {
    x,
    y
  }
}) {
  texture.wrapS = RepeatWrapping
  texture.wrapT = RepeatWrapping
  geometry.computeBoundingBox()
  const bbox = geometry.boundingBox
  const dX = Math.abs(bbox.max.x - bbox.min.x)
  const dY = Math.abs(bbox.max.y - bbox.min.y)
  const dZ = Math.abs(bbox.max.z - bbox.min.z)
  texture.repeat.set(Math.max(dX, dY, dZ) / x, Math.max(dX, dY, dZ) / y)
  return texture
}

import { RepeatWrapping } from 'three'

export function fitTextureToGeometry ({
  texture,
  geometry,
  size
}) {
  texture.wrapS = RepeatWrapping
  texture.wrapT = RepeatWrapping
  geometry.computeBoundingBox()
  const bbox = geometry.boundingBox
  const dX = Math.abs(bbox.max.x - bbox.min.x)
  const dY = Math.abs(bbox.max.y - bbox.min.y)
  const dZ = Math.abs(bbox.max.z - bbox.min.z)
  const repeat = Math.max(dX, dY, dZ) / size
  texture.repeat.set(repeat, repeat)
  return texture
}

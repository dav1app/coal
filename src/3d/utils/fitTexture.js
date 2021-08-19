import { RepeatWrapping } from 'three'

export function fitTextureToGeometry ({
  texture,
  geometry,
  size: {
    w,
    h
  }
}) {
  texture.wrapS = RepeatWrapping
  texture.wrapT = RepeatWrapping
  geometry.computeBoundingBox()
  const bbox = geometry.boundingBox
  const dX = Math.abs(bbox.max.x - bbox.min.x)
  const dY = Math.abs(bbox.max.y - bbox.min.y)

  console.log(dX, dY)

  texture.repeat.set(dX / w, dY / h)

  return texture
}

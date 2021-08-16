import { Raycaster as _Raycaster, Vector3 } from 'three'

export const Raycaster = new _Raycaster(new Vector3(), new Vector3(0, -1, 0), 0, 10)

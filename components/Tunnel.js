
import { useEffect, useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three';

const Tunnel = ({ game }) => {
  const rings = useRef(),
        dim = game.level.dim,
        segs = Math.round(dim.run);
  
  const { vec, transform, positions } = useMemo(() => {
    const transform = new THREE.Matrix4()
    const positions = [...Array(segs)].map((_, i) => new THREE.Vector3(0, 0, dim.cam - i ))
    return { vec, transform, positions }
  }, [])

  useFrame(() => {
    for (let i = 0; i < segs; ++i) {
      const vec = positions[i];
      if (vec.z > dim.cam + 1) vec.setZ(vec.z - segs);
      vec.setZ(vec.z + 0.1);
      transform.setPosition(vec)
      rings.current.setMatrixAt(i, transform)
    }
    rings.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={rings} position={[0, 0, 0]} rotation={[0, 0, Math.PI/4]} args={[null, null, segs]}>
      <torusGeometry args={[Math.sqrt(((game.level.dim.rad + 0.5)**2)*2) + 0.5, 0.5, 4, 4]} />
      <meshStandardMaterial
        attach="material"
        color='#b4d4db'
        roughness={0.5}
        metalness={0.5}
      />
    </instancedMesh>
  )
}

export default Tunnel

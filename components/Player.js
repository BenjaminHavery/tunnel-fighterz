import { useEffect, useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three';
// import { lerp } from './util'


const Player = ({ cPos }) => {
  const player = useRef();
  
  const { cVec } = useMemo(() => {
    const cVec = new THREE.Vector3();
    return { cVec }
  }, [])
  
  useEffect(() => {
    cVec.setX(cPos.x);
    cVec.setY(cPos.y);
  }, [cPos])

  useFrame(() => {
    player.current.position.lerp(cVec, 0.1);
  })

  return (
    <mesh ref={player} position={[0, 0, 0]}>
      <pointLight intensity={1} position={[0, 0, 0]} />
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshStandardMaterial
        attach="material"
        color='#000000'
        roughness={0.5}
        metalness={0.5}
      />
    </mesh>
  )
}

export default Player

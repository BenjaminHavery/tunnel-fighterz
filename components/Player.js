import { useEffect, useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three';
// import { lerp } from './util'


const Player = ({ cPos }) => {
  const player = useRef();
  const { nodes } = useGLTF('/glb/ship-1.glb');
  
  console.log(nodes);

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
    <mesh ref={player} position={[0, 0, 0]} rotation={[0, Math.PI, 0]} scale={[2, 2, 2]}>
      <pointLight intensity={1} position={[0, 0, -0.5]} />
      {/* <sphereGeometry args={[0.5, 16, 16]} /> */}
      <bufferGeometry 
        attach="geometry"
        {...nodes.mesh_0.geometry}
        // args={[0.5, 16, 16]}
      />
      <meshStandardMaterial
        attach="material"
        color='#b4d4db'
        roughness={0.3}
        metalness={0.8}
      />
    </mesh>
  )
}

export default Player

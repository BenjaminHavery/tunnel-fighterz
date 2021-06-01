
import { useRef, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'


const Player = ({ game }) => {
  
  const player = useRef();

  useFrame(() => player.current.position.copy(game.player.vec))

  return (
    <mesh ref={player} position={[0, 0, 0]} rotation={[0, Math.PI, 0]} scale={[2, 2, 2]}>
      <Suspense 
        fallback={<sphereGeometry args={[0.25, 10, 10]} />}
        >
        <PlayerModel/>
      </Suspense>
      <meshStandardMaterial
        attach="material"
        color='#03a1fc'
        roughness={0.3}
        metalness={0.8}
      />
      <pointLight intensity={1} position={[0, 0, -0.5]} />
    </mesh>
  )
}

const PlayerModel = () => {
  const { nodes } = useGLTF('/glb/ship.glb');

  return (
    <bufferGeometry
      attach="geometry"
      {...nodes.mesh_0.geometry}
    />
  )
}

export default Player

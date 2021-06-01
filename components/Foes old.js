
import { useEffect, useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three';

const Foes = ({ num = 500, space, onDest = () => null, game }) => {
  const foes = useRef();

  const randomiseOrigin = (position) => {
    position.x = Math.round((Math.random() - 0.5) * space.size);
    position.y = Math.round((Math.random() - 0.5) * space.size);
    // position.z = -spawnDistance;
  }
  
  const { origin, position, scale, transforms } = useMemo(() => {
    const origin = new THREE.Matrix4().setPosition(0, 0, -space.dis);
    const position = new THREE.Vector3()
    const scale = new THREE.Vector3()

    const transforms = [...Array(num)].map((_, i) => {
      const transform = origin.clone();
      position.setFromMatrixPosition(transform);
      randomiseOrigin(position);
      position.z -= i;
      transform.setPosition(position)
      return transform;
    })
    return { position, origin, scale, transforms }
  }, [])

  useFrame(({ clock, delta }) => {
    for (let i = 0; i < num; ++i) {
      const transform = transforms[i];
      
      position.setFromMatrixPosition(transform);
      position.setZ(position.z + 0.1);
      transform.setPosition(position)

      if (Math.abs(position.z) < 0.05) {
        onDest({
          index: i,
          x: position.x,
          y: position.y,
        })
      }

      if (position.z >= 0) {
        scale.setFromMatrixScale(transform);
        scale.set(0.8, 0.8, 0.8);
        transform.scale(scale)
      }

      if (position.z >= 5) {
        transform.copy(origin);
        position.setFromMatrixPosition(transform);
        scale.setFromMatrixScale(transform);
        randomiseOrigin(position)
        transform.setPosition(position)
      }
      
      foes.current.setMatrixAt(i, transform)
    }
    foes.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={foes} position={[0, 0, 0]} args={[null, null, num]}>
      <sphereGeometry args={[0.5, 10, 10]} />
      <meshStandardMaterial
        attach="material"
        color='#fc4503'
        roughness={0.5}
        metalness={0.8}
      />
    </instancedMesh>
  )
}

export default Foes


import { useEffect, useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three';

const Foes = ({ game }) => {
  const foes = useRef();
  
  const { origin, transform, scale } = useMemo(() => {
    const origin = new THREE.Matrix4().setPosition(0, 0, 0),
          transform = origin.clone(),
          scale = new THREE.Vector3(0,0,0);
    return { origin, transform, scale }
  }, [])

  useFrame(() => {
    game.foes.all().forEach((foe, i) => {
      if (foe.dead) return;

      transform.copy(origin);
      transform.setPosition(foe.vec);
      if (foe.scale !== false) transform.scale(scale.set(foe.scale, foe.scale, foe.scale));

      foes.current.setMatrixAt(i, transform)
    });
    foes.current.instanceMatrix.needsUpdate = true;
  })

  return (
    <instancedMesh ref={foes} position={[0, 0, 0]} args={[null, null, game.foes.length]}>
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

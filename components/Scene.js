
import { useState } from 'react'
import Player from './Player'
import Tunnel from './Tunnel'
import Foes from './Foes'
import { OrbitControls } from '@react-three/drei'


const Scene = ({ space, cPos }) => {

  const [deaths, setDeaths] = useState(0);

  const checkCollision = (arg) => {
    if (arg.x === cPos.x && arg.y === cPos.y) {
      alert(`GAME OVER. Begin run ${deaths + 1}?`);
      setDeaths(deaths + 1);
    }
  }

  return (
    <>
        
      <ambientLight intensity={0.5} />
      {/* <pointLight intensity={1} position={[0, 0, -space.dis]} /> */}
      <fog attach="fog" args={['#ffffff', space.dis/4, space.dis]} />
      
      {/* <axesHelper args={[1.5, 1.5, 2]} /> */}
      {/* <OrbitControls /> */}


      <Player {...{ cPos }}/>
      <Foes key={`run--${deaths}`} onDest={(arg) => checkCollision(arg)} {...{ space }}/>
      <Tunnel x={0} y={0} {...{ space }}/>

      
      
    </>
  )
}

export default Scene

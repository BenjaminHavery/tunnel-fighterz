
import Player from './Player'
import Tunnel from './Tunnel'
import Foes from './Foes'
import { OrbitControls } from '@react-three/drei'


const Scene = ({ space, cPos }) => {

  

  return (
    <>
        
      <ambientLight intensity={0.5} />
      {/* <pointLight intensity={1} position={[0, 0, -space.dis]} /> */}
      <fog attach="fog" args={['#ffffff', space.dis/4, space.dis]} />
      
      {/* <axesHelper args={[1.5, 1.5, 2]} /> */}
      <OrbitControls />


      <Player x={cPos.x} y={cPos.y} {...{ cPos }}/>
      <Foes {...{ space }}/>
      <Tunnel x={0} y={0} size={space.size/2} {...{ space }}/>

      
      
    </>
  )
}

export default Scene

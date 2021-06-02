
import { useState } from 'react'
import Player from './Player'
import Tunnel from './Tunnel'
import Foes from './Foes'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'


const Scene = ({ game }) => {

  useFrame(() => game.advance())

  return (
    <>
      <ambientLight intensity={0.5} />
      {/* <pointLight intensity={1} position={[0, 0, -space.dis]} /> */}
      <fog attach="fog" args={['#ffffff', game.level.dim.dis/4, game.level.dim.dis]} />
      
      {/* <axesHelper args={[1.5, 1.5, 2]} /> */}
      {/* <OrbitControls /> */}


      <Player {...{ game }}/>
      <Foes {...{ game }} key={`foes--${game.foes.length}`}/>
      <Tunnel {...{ game }} key={`segs--${game.level.dim.run}`}/>

    </>
  )
}

export default Scene

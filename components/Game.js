import { useEffect } from 'react'

import { Canvas } from '@react-three/fiber'

import Scene from './Scene'
import { useGame } from '../data/game'

const space = {
  size: 5,
  scale: 1,
  dis: 50,
  cam: 5,
};
space.run = space.dis + space.cam;
space.cMax = (space.size - 1)/2;

const Game = () => {

  const game = useGame();

  useEffect(() => {
    game.load({
      foeMap: [
        [ 0,0,0,
          1,1,1,
          0,0,0, ],
        [],
        [ 0,0,1,
          0,1,0,
          1,0,0, ],
        [],
        [ 0,1,0,
          0,1,0,
          0,1,0, ],
        [],
        [ 1,0,0,
          0,1,0,
          0,0,1, ],
        [],
        [ 0,0,0,
          1,1,1,
          0,0,0, ],
        [],
        [ 0,0,1,
          0,1,0,
          1,0,0, ],
        [],
        [ 0,1,0,
          0,1,0,
          0,1,0, ],
        [],
        [ 1,0,0,
          0,1,0,
          0,0,1, ],
        [],
        [ 0,0,0,
          1,1,1,
          0,0,0, ],
      ]
    })
  }, [])

  console.log('render game', game);

  return (
    <div className='wrapper'>

      <Canvas className='canvas' camera={{ position: [0, game.level.dim.cam/4, game.level.dim.cam]}}>
        <Scene {...{ space, game }}/>
      </Canvas>
      
      <style jsx>{`
        
        .wrapper {
          position: relative;
          background: white;
          height: 100vh;
        }
        :global(.canvas) {
          height: 100vh;
          width: 100%;
        }

        @media screen and (min-width: 1000px) {}

      `}</style>
    </div>
  )
}

export default Game

import { useState } from 'react'
import { useKeyPress, useKeyboardActions } from './util'

import { Canvas } from '@react-three/fiber'
import Scene from './Scene'

const space = {
  size: 7,
  scale: 1,
  dis: 50,
  cam: 5,
};
space.run = space.dis + space.cam;

const Game = () => {

  const [cPos, setCPos] = useState({ x: 0, y: 0 })
  
  useKeyboardActions({
    ArrowUp: () => setCPos({ ...cPos, y: cPos.y + 1 }),
    ArrowRight: () => setCPos({ ...cPos, x: cPos.x + 1 }),
    ArrowDown: () => setCPos({ ...cPos, y: cPos.y - 1 }),
    ArrowLeft: () => setCPos({ ...cPos, x: cPos.x - 1 }),
  });

  return (
    <div className='wrapper'>

      <Canvas className='canvas' camera={{ position: [0, space.size/4, space.cam]}} onKeyDown={(e) => handleKeypress(e)}>
        <Scene {...{ space, cPos }}/>
      </Canvas>
      
      <style jsx>{`
        
        .wrapper {
          position: relative;
          background: lightblue;
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

import { useState } from 'react'
import { useKeyboardActions } from './util'

import { Canvas } from '@react-three/fiber'
import Scene from './Scene'

const space = {
  size: 5,
  scale: 1,
  dis: 50,
  cam: 5,
};
space.run = space.dis + space.cam;
space.cMax = (space.size - 1)/2;

const Game = () => {

  const [cPos, setCPos] = useState({ x: 0, y: 0 }),
        updateCPos = (newPos) => {
          if (
            Math.abs(newPos.x) <= space.cMax &&
            Math.abs(newPos.y) <= space.cMax &&
            newPos.x + newPos.y !== cPos.x + cPos.y
          ) setCPos(newPos);
        };

  useKeyboardActions({
    ArrowUp: () => updateCPos({ ...cPos, y: cPos.y + 1 }),
    ArrowRight: () => updateCPos({ ...cPos, x: cPos.x + 1 }),
    ArrowDown: () => updateCPos({ ...cPos, y: cPos.y - 1 }),
    ArrowLeft: () => updateCPos({ ...cPos, x: cPos.x - 1 }),
  });

  return (
    <div className='wrapper'>

      <Canvas className='canvas' camera={{ position: [0, space.size/4, space.cam]}}>
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

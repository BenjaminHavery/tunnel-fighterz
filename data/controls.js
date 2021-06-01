
import * as THREE from 'three';

import { useState, useRef, useMemo } from 'react'

import { useKeyboardActions } from './keyboard'
import { useTouchActions } from './touch'

export const useControls = () => {
  
  const [pos, setPos] = useState({ x: 0, y: 0 }),
        getPos = () => pos;

  const { vec } = useMemo(() => {
    const vec = new THREE.Vector3(0, 0, 0);
    return { vec }
  }, []);

  const controls = useRef(Controls({ vec, getPos, setPos }));
  
  useKeyboardActions({
    ArrowUp: () => controls.current.up(),
    ArrowDown: () => controls.current.down(),
    ArrowRight: () => controls.current.right(),
    ArrowLeft: () => controls.current.left(),
  });

  useTouchActions({
    SwipeUp: () => controls.current.up(),
    SwipeRight: () => controls.current.right(),
    SwipeDown: () => controls.current.down(),
    SwipeLeft: () => controls.current.left(),
  });

  return controls.current;
}


const Controls = ({ vec, getPos, setPos }) => {
  return {
    game: {},
    bind(game) { this.game = game },
    
    vec,
    
    pos: getPos(),
    setPos,
    updatePos(newPos) {
      this.vec.setX(newPos.x);
      this.vec.setY(newPos.y);
      this.pos = newPos;
      this.setPos({...newPos});
    },

    max: 2,
    setMax(newMax) { this.max = newMax },
    clamp(val) { return Math.min(Math.max(val, -this.max), this.max) },

    move(movement) {
      const newPos = { ...this.pos, ...movement };
      newPos.x = this.clamp(newPos.x);
      newPos.y = this.clamp(newPos.y);
      this.updatePos(newPos);
    },
    up() { this.move({ y: this.pos.y + 1 }) },
    down() { this.move({ y: this.pos.y - 1 }) },
    right() { this.move({ x: this.pos.x + 1 }) },
    left() { this.move({ x: this.pos.x - 1 }) },
  } 
}

import * as THREE from 'three';

import { useState, useRef, useMemo } from 'react'


export const usePlayer = () => {

  const { vec } = useMemo(() => {
    const vec = new THREE.Vector3(0, 0, 0);
    return { vec }
  }, []);

  const player = useRef(Player({ vec }));

  return player.current;
}


const Player = ({ vec }) => {
  return {
    game: {},
    bind(game) { this.game = game },

    vec,
    advance() {
      this.vec.lerp(this.game.controls.vec, 0.1);
    }
  } 
}
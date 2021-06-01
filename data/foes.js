
import { nanoid } from 'nanoid'
import * as THREE from 'three';

import { useState, useRef, useMemo } from 'react'


export const useFoes = () => {
  const [length, setLength] = useState(0),
        getLength = () => length;

  const foes = useRef(Foes({ getLength, setLength }));

  return foes.current;
}


const Foes = ({ getLength, setLength }) => {
  return {
    game: {},
    bind(game) { this.game = game },

    length: getLength(),
    updateLength(num) {
      this.length = num;
      setLength(num);
    },

    foes: [],

    advance() {
      this.all().forEach(foe => foe.advance())
    },
    
    all() { return this.foes },
    
    load(newFoes) {
      this.updateLength(0);
      this.foes = newFoes.map((foe) => Foe({...foe, z: (foe.z || 0) - this.game.level.dim.dis, game: this.game}));
      this.updateLength(this.foes.length);
    },
  } 
}

const Foe = (innit = {}) => {
  const base = {
    x: 0, y: 0, z: -5,
    health: 1,
    ...innit
  };
  return {
    ...base,

    id: nanoid(),
    vec: new THREE.Vector3(base.x, base.y, base.z),
    scale: false,
    alive: true,
    dead: false,
    loop: true,

    x() { return this.vec.x },
    y() { return this.vec.y },
    z() { return this.vec.z },

    advance() {
      if (this.dead) return;

      this.vec.setZ(this.vec.z + 0.1);
      
      if (Math.abs(this.vec.z) < 0.05) this.checkCollision(this.game.player)

      if (this.vec.z > 1 || !this.alive) this.die();
    
    },

    checkCollision(target) {
      if (this.vec.distanceTo(target.vec) < 0.9) this.collide(target);
    },
    collide(target) {
      this.die()
      console.log('collided with', target)
    },

    die() {
      if (this.alive) {
        this.alive = false;
        this.scale = 1;
      }
      if (this.scale === 0) {
        this.dead = true;
        this.scale = false;
        if (this.loop) this.reset();
      } else if (this.scale > 0) this.scale -= 0.1;
      else this.scale = 0;
    },

    reset() {
      this.vec.setZ(this.vec.z - this.game.level.dim.dis);
      this.alive = true;
      this.dead = false;
    }
  }
}

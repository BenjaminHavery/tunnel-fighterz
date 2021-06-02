
import { useState, useRef, useMemo } from 'react'


export const useLevel = () => {
  const [number, setNumber] = useState(0),
        getNumber = () => number;

  const level = useRef(Level({ getNumber, setNumber }));

  return level.current;
}


const Level = ({ getNumber, setNumber }) => {
  return {
    game: {},
    bind(game) { this.game = game },
    
    number: getNumber(),
    updateNumber(num) {
      this.number = num;
      setNumber(num);
    },

    dim: {
      rad: 1,
      siz: 3,
      dis: 30,
      cam: 3,
      run: 33,
    },

    foeMap: [],

    load(newLevel) {
      this.dim = { ...this.dim, ...newLevel.dim }
      this.dim.siz = 2*this.dim.rad + 1;
      this.dim.cam = 2*this.dim.rad + 1;
      this.dim.run = this.dim.dis + this.dim.cam;

      this.foeMap = [...(newLevel.foeMap || [])];
      this.game.foes.load(this.foeMap);

      this.updateNumber(newLevel.number || this.number + 1);
    }
  } 
}
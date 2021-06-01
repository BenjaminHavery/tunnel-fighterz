
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
      rad: 2,
      dis: 50,
      cam: 5,
    },

    load(newLevel) {
      this.dim = { ...this.dim, ...newLevel.dim }
      this.updateNumber(newLevel.number || this.number + 1);
    }
  } 
}
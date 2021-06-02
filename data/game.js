
import { useState, useRef, useMemo } from 'react'
import * as THREE from 'three';

import { useControls } from './controls'
import { usePlayer } from './player'
import { useLevel } from './level'
import { useFoes } from './foes'

export const useGame = () => {

  const controls = useControls();
  const player = usePlayer();
  const level = useLevel();
  const foes = useFoes();

  const game = useRef(Game({ controls, player, level, foes }));

  return game.current;
}


const Game = ({ controls, player, level, foes }) => {
  const game = {
    controls,
    player,
    level,
    foes,

    init() {
      controls.bind(this);
      player.bind(this);
      level.bind(this);
      foes.bind(this);
      return this;
    },
    // load(base = {}) {
    //   const newLevel = base.level || {},
    //         newFoes = base.foes || [];
    //   console.log('load game', newLevel, newFoes);
    //   this.level.load(newLevel);
    //   this.foes.load(newFoes);
    // },
    load(newLevel) {
      console.log('load game', newLevel);
      this.level.load(newLevel);
    },
    advance() {
      this.player.advance(this);
      this.foes.advance(this);
    }
  };
  return game.init()
}
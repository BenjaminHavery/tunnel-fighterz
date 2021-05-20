import { useState, useEffect } from "react";

export const useKeyPress = function(targetKey, action = (key) => console.log('pressed key', key)) {

  function downHandler({ key }) {
    console.log(key);
    if (key === targetKey) action(key);
  }

  useEffect(() => {
    if (!!window) {
      window.addEventListener("keydown", downHandler);

      return () => {
        window.removeEventListener("keydown", downHandler);
      };
    }
  });
};

export const useKeyboardActions = function(actions = {}) {

  function downHandler({ key }) {
    const action = actions[key] || function() { console.log(`No action assigned to ${key}`) };
    action();
  }

  useEffect(() => {
    if (!!window) {
      window.addEventListener("keydown", downHandler);

      return () => {
        window.removeEventListener("keydown", downHandler);
      };
    }
  });
};

export const lerp = (a, b, t) => ((1 - t) * a + t * b);
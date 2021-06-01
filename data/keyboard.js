
import { useEffect } from 'react'

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

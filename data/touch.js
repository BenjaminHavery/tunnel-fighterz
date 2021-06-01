
import { useRef, useEffect } from 'react'

export const useTouchActions = function(actions = {}) {

  const tStart = useRef({ x: 0, y: 0 }),
        swThres = 50,
        allActions = {
          Tap: () => console.log('tapped'),
          SwipeUp: () => console.log('swiped up'),
          SwipeRight: () => console.log('swiped right'),
          SwipeDown: () => console.log('swiped down'),
          SwipeLeft: () => console.log('swiped left'),
          ...actions,
        };

  function startHandler(e) {
    const touch = e.touches[0];
    tStart.current = { x: touch.screenX, y: touch.screenY }
    // console.log('start', tStart);
  }
  function endHandler(e) {
    const tEnd = e.changedTouches[0],
          dif = {
            x: tEnd.screenX - tStart.current.x,
            y: tEnd.screenY - tStart.current.y,
          };
    // console.log('end', dif)
    if (Math.abs(dif.y) > swThres) Math.sign(dif.y) === 1 ? allActions.SwipeDown() : allActions.SwipeUp();
    else if (Math.abs(dif.x) > swThres) Math.sign(dif.x) === 1 ? allActions.SwipeRight() : allActions.SwipeLeft();
  }

  useEffect(() => {
    if (!!window) {
      window.addEventListener("touchstart", startHandler);
      window.addEventListener("touchend", endHandler);

      return () => {
        window.removeEventListener("touchstart", startHandler);
        window.removeEventListener("touchend", endHandler);
      };
    }
  }, []);
};

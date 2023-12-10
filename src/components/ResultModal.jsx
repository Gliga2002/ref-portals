import { forwardRef, useImperativeHandle, useRef } from "react";
import {createPortal} from 'react-dom';

const ResultModal = forwardRef(function ResultModal({targetTime, remainingTime, onReset}, ref) {
  const dialog = useRef();

  // new computed value
  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100); 

  useImperativeHandle(ref, () => {
    return {
      open() {  
        dialog.current.showModal();
      }
    }
  });

  return createPortal(
    <dialog ref={dialog} className='result-modal' onClose={onReset}>
      {userLost && <h2>You Lost</h2>}
      {!userLost && <h2>Your Score: {score}</h2>}
      <p>The target time was <strong>{targetTime} seconds.</strong></p>
      {userLost && <p>You haven't stop the timer on target time, be faster!!</p>}
      {!userLost && <p>You stopped the timmer with <strong>{formattedRemainingTime} seconds left</strong></p>} 
      <form method="dialog" onSubmit={onReset}>
        <button>Close</button>
      </form>
    </dialog>,
    document.querySelector("#modal")
    
  )
})

export default ResultModal;
import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({title, targetTime}) {
  const timer = useRef();
  const dialog = useRef();

  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);

  // this is new derived state, new derived value, based on the state
  const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

  // here if the timer expired, we lost!!
  if (timeRemaining <= 0) {
    clearInterval(timer.current);
    // be aware of this danger when calling state update f direclty in function component
    // here is ok because is inside if
    dialog.current.open();
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
  }


  function handleStart() {
    timer.current = setInterval(() => {
      setTimeRemaining(prevTimeRemaining => prevTimeRemaining - 10);
    }, 10);
  }

  // here we manually stop the timer, so we won
  function handleStop() {
    clearInterval(timer.current);
    dialog.current.open();
  }

  return (
    <>
      {/* koristi dialog element koji je specifan, pojavice se samo ako showModal() (built in broswer method) u suprotnom ga nema */}
      <ResultModal
        ref={dialog} 
        targetTime={targetTime} 
        remainingTime={timeRemaining} 
        onReset={handleReset}
      />
      {/* koristicemo derived state -> timerIsActive to update UI approprietly */}
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challange-time">
          {targetTime} second{targetTime > 1 ? 's' : ''}
        </p>
        <p>
          <button onClick={timerIsActive ? handleStop : handleStart}>
            {timerIsActive ? 'Stop' : 'Start'} Challange
          </button>
        </p>
        <p className={timerIsActive ? 'active' : undefined}>
          {timerIsActive ? 'Time is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  )
}
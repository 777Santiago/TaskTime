import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Importa Link de react-router-dom


function PomodoroPage() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [cycles, setCycles] = useState(0);
  const [showBreakButton, setShowBreakButton] = useState(false);
  const [showStartButton, setShowStartButton] = useState(true);
  const [completedCycle, setCompletedCycle] = useState(false);


  useEffect(() => {
    let timer;

    if (!isPaused) {
      timer = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Pomodoro cycle or break completed
            clearInterval(timer);
            setIsPaused(true);

            // Enable break button and hide start button after completing a cycle
            setShowBreakButton(true);
            setShowStartButton(false);

            if(!completedCycle){
            // Set the next session duration (short break, long break, or Pomodoro)
            if ((cycles + 1) % 4 === 0) {
              // Long break after every 4 cycles
              setMinutes(15);
              setSeconds(0);
            } else {
              // Short break after each Pomodoro cycle
              setMinutes(5);
              setSeconds(0);
            }

            setCycles(cycles + 1); // Increment cycles after setting the next duration
            setCompletedCycle(true);
            }else{
                setShowBreakButton(false)
                setShowStartButton(true)
                setMinutes(25);
                setCompletedCycle(false);
            }
            // You can add a notification or any other logic when a cycle is completed
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
            setCompletedCycle(false);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isPaused, minutes, seconds, cycles]);

  const handleStartPause = () => {
    setIsPaused(!isPaused);
    setShowBreakButton(false);
    setShowStartButton(true);
  };

  const handleReset = () => {
    setIsPaused(true);
    setMinutes(25);
    setSeconds(0);
    setShowBreakButton(false);
    setShowStartButton(true);
    setCycles(0);
  };

  const handleTakeBreak = () => {
    setIsPaused(false);
    setShowBreakButton(false);
    setShowStartButton(true);
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md text-center">
        <h2 className="text-4xl mb-4">Pomodoro</h2>
        <p className="text-2xl mb-4">Cycles completed: {cycles}</p>
        <p className="text-6xl mb-4">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </p>
        <div className="flex gap-4">
          {showStartButton && (
            <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleStartPause}>
              {isPaused ? 'Start' : 'Pause'}
            </button>
          )}
          {showBreakButton && (
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={handleTakeBreak}
              disabled={!isPaused}
            >
              Take a Break
            </button>
          )}
          <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleReset}>
            Reset
          </button>
        </div>
        {/* Botón para redirigir a otra página */}
        <div
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
          }}
        >
          <Link to="/tasks">
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Back to tasks
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PomodoroPage;

import React, {FC, memo, useEffect, useRef, useState} from 'react';
import {Player} from "../../models/Player";
import {Colors} from "../../models/Colors";

interface ITimerProp {
  currentPlayer: Player | null;
  restart: () => void
}

const Timer: FC<ITimerProp> = ({currentPlayer, restart}) => {
  const [blackTime, setBlackTime] = useState(300)
  const [whiteTime, setWhiteTime] = useState(300)

  const timer = useRef<null | ReturnType<typeof setInterval>>(null)
  const startTimer = () => {
    if(timer.current){
      clearInterval(timer.current)
    }
    const callback = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer
    timer.current = setInterval(callback,1000)
  }
  const decrementBlackTimer = () => {
    setBlackTime(prev => prev - 1)
  }
  const decrementWhiteTimer = () => {
    setWhiteTime(prev => prev - 1)
  }

  const handleRestart = () =>{
    setWhiteTime(300)
    setBlackTime(300)
    restart()
  }

  useEffect(()=>{
      startTimer()
  },[currentPlayer])
  return (
    <div className=''>
      <div>
        <button onClick={handleRestart}>Restart game</button>
      </div>
      <h2>Черные - {blackTime}</h2>
      <h2>Белые - {whiteTime}</h2>
    </div>
  );
};

export default memo(Timer);
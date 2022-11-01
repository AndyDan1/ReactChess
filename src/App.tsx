import React, {useEffect, useState} from 'react';
import './App.scss';
import BoardComp from "./components/BoardComp";
import {Board} from "./models/Board";
import {Player} from "./models/Player";
import {Colors} from "./models/Colors";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";

function App() {
  const [board, setBoard] = useState(new Board())
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

  const restart = () => {
    const newBoard = new Board();
    newBoard.initCells()
    newBoard.addFigures()
    setBoard(newBoard)
  }

  const swapPlayer = () => {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  useEffect(() => {
    restart()
    setCurrentPlayer(whitePlayer)
  }, [])

  return (
    <div className='App'>
      <Timer
        currentPlayer={currentPlayer}
        restart={restart}
      />
      <BoardComp
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}

      />
      <div>
        <LostFigures
          title="Черные фигуры"
          figures={board.lostBlackFigure}
        />
        <LostFigures
          title="Белые фигуры"
          figures={board.lostWhiteFigure}
        />
      </div>
    </div>
  );
}

export default App;

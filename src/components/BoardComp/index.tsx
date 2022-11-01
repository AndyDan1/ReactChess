import React, {FC, memo, useEffect, useState} from 'react';
import classes from './style.module.scss';
import {Board} from "../../models/Board";
import CellComp from "../CellComp";
import {Cell} from "../../models/Cell";
import {Player} from "../../models/Player";

interface IBoardCompProp {
  board: Board;
  setBoard: (board: Board) => void
  currentPlayer: Player | null
  swapPlayer: () => void
}

const BoardComp: FC<IBoardCompProp> = ({
                                         board,
                                         setBoard,
                                         currentPlayer,
                                         swapPlayer
                                       }) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

  const click = (cell: Cell) => {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
      swapPlayer()
      setSelectedCell(null);
      updateBoard()
    } else {
      if(cell.figure?.color === currentPlayer?.color){
        setSelectedCell(cell)
      }
    }
  }

  const highLightCells = () => {
    board.highLightCells(selectedCell)
    updateBoard()
  }

  const updateBoard = () => {
    const newBoard = board.getCopyBoard()
    setBoard(newBoard)
  }


  useEffect(() => {
    highLightCells()
  }, [selectedCell])
  return (
   <div>
     <h2>Tекущий игрок: {currentPlayer?.color}</h2>

     <div className="board">
       {board.cells.map((row, index) =>
         <React.Fragment key={index}>
           {row.map(cell =>
             <CellComp
               click={click}
               cell={cell}
               key={cell.id}
               selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
             />
           )}
         </React.Fragment>
       )}
     </div>
   </div>
  );
};

export default memo(BoardComp);
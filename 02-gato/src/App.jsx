import { useState } from "react"
import confetti from "canvas-confetti"
import { Square } from "./components/Square.jsx"
import {TURNS, WINNER_COMBOS} from "./components/constans.js"
import { checkWinner, checkEndGame } from "./logic/board.js"
import { WinnerModal } from "./components/WinnerModal.jsx"
import { saveGameToStorage, resetGameStorage  } from "./logic/storage/index.js"


function App() {
  // const [board, setBoard] = useState(['x','x','x','o','o','x','x','o','o'])
  const [board, setBoard] = useState(()=>{
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
  })
  
  const [turn, setTurn] = useState(()=>{
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null) // Null = No hay ganador, False = Empate 
  

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
    
    resetGameStorage()
  }
  

  const updateBoard = (index) => {
    // No actualizar si ya hay algo en esa posición
    if (board[index]  || winner) return
    
    // Actualizar el tablero
    const newBoard = [... board]
    newBoard[index] = turn
    setBoard(newBoard)

    // Cambiar el turno
    const newTurn = turn ===TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
   
    saveGameToStorage({
      board:newBoard,
      turn:newTurn
    })
    // Revisar si hay ganador
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    } else if(checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  return (
    <main className="board">
    <button onClick={resetGame}>Resetear el juego</button>
      <h1>Juego de Gato</h1>

      <section className="game">
        {
          board.map((_,index) => {
            return(
              <Square
                key={index}
                index={index}
                updateBoard = {updateBoard}
              >
                {board[index]}
               </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected = {turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected = {turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner}/>

    </main>


)
}

export default App

import { useState } from 'react'
import './App.css'

function Square({ value, onClick }) {
  return (
    <button className={`h-20 w-20 sm:h-30 sm:w-30 text-5xl sm:text-7xl font-bold rounded-lg box-effect bg-dark-500 ${value === "X"? "text-blue": ""}`} onClick={onClick}> 
      {value} 
    </button>
  )
}

function Board() {
  const [count, setCount] = useState(0)
  const [value, setValue] = useState(Array(9).fill(null));

  function handleClick(i) {
    if (value[i] || calculateWin(value)) return;
    setCount(count + 1);
    const nextValue = value.slice(); // copy array
    count % 2 == 0? nextValue[i] = "X": nextValue[i] = "O";
    setValue(nextValue);
  }

  const winner = calculateWin(value);
  let status;
  let highlightText;
  if (winner) {
    status = "Winner: ";
    highlightText = winner;
  } else {
    status = "Next Player: ";
    highlightText = (count % 2 == 0? "X": "O")
  }

  return (
    <>
      <div className="flex flex-row gap-3 mb-2 items-center"> 
        <span> {status} </span>
        <span className={`text-3xl font-bold text-shadow-sm ${highlightText === "X"? "text-blue": ""}`}> {highlightText} </span> 
      </div>
      <div className="flex flex-row gap-2">
        <Square value={value[0]} onClick={() => handleClick(0)} />
        <Square value={value[1]} onClick={() => handleClick(1)} />
        <Square value={value[2]} onClick={() => handleClick(2)} />
      </div>
      <div className="flex flex-row gap-2">
        <Square value={value[3]} onClick={() => handleClick(3)} />
        <Square value={value[4]} onClick={() => handleClick(4)} />
        <Square value={value[5]} onClick={() => handleClick(5)} />
      </div>
      <div className="flex flex-row gap-2">
        <Square value={value[6]} onClick={() => handleClick(6)} />
        <Square value={value[7]} onClick={() => handleClick(7)} />
        <Square value={value[8]} onClick={() => handleClick(8)} />
      </div>
    </>
  )
}

function calculateWin(value) {
  const winLogic = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  
  for (let [a, b, c] of winLogic) {
    if (value[a] && value[a] === value[b] && value[a] === value[c]) {
      return value[a];
    }
  }
  return null;
}

function App() {
  return (
    <>
      <div className="flex flex-col gap-10 items-center justify-center min-h-screen">
        <h1 className="text-center text-4xl sm:text-5xl font-bold">Tick Tac Toe</h1>
        <div className="flex flex-col gap-2">
          <Board />
        </div>
      </div>
    </>
  )
}

export default App

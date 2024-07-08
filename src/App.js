import React, { useState, useEffect } from "react";
import "./App.css";
import Table from "./components/Table";
import Commands from "./components/Commands";
import Counter from "./components/Counter";

const createEmptyMatrix = () => {
  return Array.from({ length: 10 }, () => Array(10).fill(""));
};

const generateShips = () => {
  const ships = [];
  while (ships.length < 5) {
    const isHorizontal = Math.random() >= 0.5;
    const row = Math.floor(Math.random() * 10);
    const col = Math.floor(Math.random() * 10);
    const positions = [];

    for (let i = 0; i < 4; i++) {
      const r = isHorizontal ? row : row + i;
      const c = isHorizontal ? col + i : col;
      if (r >= 10 || c >= 10) break;
      positions.push({ r, c });
    }

    if (
      positions.length === 4 &&
      positions.every(
        (p) =>
          !ships.some((ship) =>
            ship.some((pos) => pos.r === p.r && pos.c === p.c)
          )
      )
    ) {
      ships.push(positions);
    }
  }
  return ships;
};

const App = () => {
  const [matrix, setMatrix] = useState(createEmptyMatrix());
  const [ships, setShips] = useState([]);
  const [input, setInput] = useState("");
  const [sunkShips, setSunkShips] = useState(0);

  useEffect(() => {
    setShips(generateShips());
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value.toUpperCase());
  };

  const executeCommand = () => {
    const row = input.charCodeAt(0) - 65;
    const col = parseInt(input.slice(1)) - 1;
    if (
      row >= 0 &&
      row < 10 &&
      col >= 0 &&
      col < 10 &&
      matrix[row][col] === ""
    ) {
      const newMatrix = [...matrix];
      if (
        ships.some((ship) => ship.some((pos) => pos.r === row && pos.c === col))
      ) {
        newMatrix[row][col] = "O";
      } else {
        newMatrix[row][col] = "X";
      }
      setMatrix(newMatrix);
      setInput("");
      checkSunkShips(newMatrix);
    }
  };

  const checkSunkShips = (newMatrix) => {
    let sunkCount = 0;
    ships.forEach((ship) => {
      if (ship.every((pos) => newMatrix[pos.r][pos.c] === "O")) {
        sunkCount += 1;
      }
    });
    setSunkShips(sunkCount);
  };

  const resetGame = () => {
    setMatrix(createEmptyMatrix());
    setShips(generateShips());
    setSunkShips(0);
    setInput("");
  };

  return (
    <div className="App">
      <h3>Astucia Naval</h3>
      <div className="headerContainer">
        <Counter sunkShips={sunkShips} />
        <p>Comandos</p>
        <Commands
          input={input}
          onInputChange={handleInputChange}
          onExecute={executeCommand}
          onReset={resetGame}
        />
      </div>

      <Table matrix={matrix} />
    </div>
  );
};

export default App;

import React from "react";

const Counter = ({ sunkShips }) => {
  return (
    <div className="counter">
      <p>Barcos destruidos: {sunkShips}</p>
      {sunkShips === 5 && <p>¡Juego terminado!</p>}
    </div>
  );
};

export default Counter;

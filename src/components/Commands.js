import React from "react";

const Commands = ({ input, onInputChange, onExecute, onReset }) => {
  return (
    <div className="commands">
      <input value={input} onChange={onInputChange} />
      <div>
        <button onClick={onExecute}>Ejecutar</button>
        <button onClick={onReset}>Reiniciar Juego</button>
      </div>
    </div>
  );
};

export default Commands;

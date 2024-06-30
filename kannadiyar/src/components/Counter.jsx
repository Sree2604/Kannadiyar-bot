import React from "react";

function Counter({ increase, decrease, quantity, disableDecrease }) {
  return (
    <div className="flex items-center">
      <button
        onClick={decrease}
        disabled={disableDecrease}
        className={`px-3 py-1 ${disableDecrease ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        -
      </button>
      <span className="px-3">{quantity}</span>
      <button onClick={increase} className="px-3 py-1">
        +
      </button>
    </div>
  );
}

export default Counter;

import React from "react";

function Counter({ increase, decrease, quantity, disableDecrease }) {
  return (
    <div className="flex items-center rounded-lg p-2">
      <button
        onClick={decrease}
        disabled={disableDecrease}
        className={`bg-orange-100 rounded-lg text-primecolor px-3 py-1 ${disableDecrease ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        -
      </button>
      <span className="px-3 text-primecolor">{quantity}</span>
      <button onClick={increase} className="px-3 py-1 bg-orange-100 rounded-lg text-primecolor">
        +
      </button>
    </div>
  );
}

export default Counter;

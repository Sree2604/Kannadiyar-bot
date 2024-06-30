import React from "react";
import { useState } from "react";
// import Wishlistitems from './Wishlistitems1';
import OrderItems from "./OrderItems";

const Slider = () => {
  const [Slide, setSlide] = useState("Completed Orders");

  return (
    // <div className="w-full mx-auto mt-52 items-center justify-center bg-gray-100">
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {/* <div className="flex justify-center items-center">
       </div>
            <div className="flex flex-col  items-center py-4 space-y-4">
            <div className="flex"> */}
      <button
        onClick={() => setSlide("Completed Orders")}
        className={`${
          Slide === "Completed Orders"
            ? " bg-green-500 text-white"
            : "bg-gray-200 text-gray-700"
        } px-4 py-2 rounded-l cursor-pointer`}
      >
        Completed Order
      </button>
      <button
        onClick={() => setSlide("Upcoming Orders")}
        className={`${
          Slide === "Upcoming Orders"
            ? "bg-green-500 text-white"
            : "bg-gray-200 text-gray-700"
        } px-4 py-2 rounded-r cursor-pointer`}
      >
        Upcoming Order
      </button>
      {/* </div> */}
      {Slide === "Completed Orders" && <OrderItems />}
      {Slide === "Upcoming Orders" && <OrderItems />}
    </div>
    //   </div>
    //   </div>
  );
};
export default Slider;

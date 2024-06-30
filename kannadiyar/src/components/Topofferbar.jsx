import React from "react";

function Topofferbar() {
  return (
    <>
      <div className="">
        <div className="bg-orange-100">
          <h1 className="sm: text-primecolor p-2  text-l text-center font-semibold font-content">
            Madurai Customers Order above ₹500 and Get Free Delivery
          </h1>
        </div>
        <div className=" border-b-2 border-primecolor">
          <div className=" lg:flex lg:flex-row lg:p-2 ">
            <h1 className="sm: text-xs sm: ml-32  sm: mt-1 sm: font-content text-primecolor  md:ml-80 lg:font-content lg:ml-52  lg:space-x-72 lg:text-sm">
              Support Mon-Sat, 10 AM - 6 PM
            </h1>
            <div className="sm: text-xs sm: font-content sm: space-x-36  sm:mt-1 md:flex md:flex-row  md:space-x-80 md:ml-2 lg:flex lg:flex-row lg:text-sm lg:space-x-44 lg:ml-96">
              <a className="text-primecolor font-content cursor-pointer">
                Shipping
              </a>
              <a className="text-primecolor font-content cursor-pointer">
                Return
              </a>
              <a className="text-primecolor font-content cursor-pointer">FAQ</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
// flex flex-row space-x-44 ml-96

export default Topofferbar;

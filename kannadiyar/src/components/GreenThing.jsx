import React from "react";
import { Link } from "react-router-dom";

const GreenThing = ({ header }) => {
  const custId = sessionStorage.getItem("custId");
  return (
    <div className="sm: border-1 sm: mt-3 sm: bg-orange-100 sm: ml-1 sm: rounded-lg sm; mr-1 lg:border-1 lg:bg-orange-100 md:mt-2 lg:h-48 lg:w-9/12 lg:ml-48 lg:mt-7 lg:rounded-lg lg:p-4 p-4">
      <h1 className="sm: ml-2 font-content lg:text-4xl text-primecolor lg:ml-2 lg:mt-10">
        {header}
      </h1>
      <p className="ml-2 mt-2 text-primecolor">
        <Link
          to={`/home/${custId}`}
          className="hover:underline text-primecolor"
        >
          Home
        </Link>{" "}
        &gt; {header}
      </p>
    </div>
  );
};

export default GreenThing;

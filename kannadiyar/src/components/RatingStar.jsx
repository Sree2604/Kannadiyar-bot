import React from "react";

const RatingStar = ({ rating }) => {
  // Calculate the percentage for the star rating
  const percentage = (rating / 5) * 100;

  return (
    <div className="flex items-center">
      <div className="mr-2 text-base font-bold">{rating.toFixed(1)}</div>
      <div className="flex items-center">
        <div className="relative flex items-center">
          <div className="flex absolute">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                className={`h-6 w-6 text-yellow-400 fill-current ${
                  index < Math.floor(percentage / 20)
                    ? "opacity-100"
                    : "opacity-30"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M10 1l2.4 6.8h7.6l-6 4.8 2.4 6.8-6-4.8-6 4.8 2.4-6.8-6-4.8h7.6z" />
              </svg>
            ))}
          </div>
          <div className="w-full h-full flex">
            <div
              className="h-6 bg-gray-200"
              style={{ width: `${percentage.toFixed(0)}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingStar;

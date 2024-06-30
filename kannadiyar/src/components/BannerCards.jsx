import React from "react";

function BannerCards() {
  return (
    <>
      <div className=" ml-12 space-y-6">
        <div className="w-80 border rounded-lg">
          <a href="/Products">
            <img
              src="src/assets/wp9212184-agriculture-4k-wallpapers.jpg"
              alt=""
              className=" rounded-lg"
            />
          </a>
        </div>
        <div className="w-80 border rounded-lg">
          <a href="/Reviews">
            <img
              src="src/assets/wp9212184-agriculture-4k-wallpapers.jpg"
              alt=""
              className=" rounded-lg"
            />
          </a>
        </div>
      </div>
    </>
  );
}

export default BannerCards;

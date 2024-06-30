import React, { useState } from "react";
import RatingsAndForm from "./Ratings";

const BoxWithHeadings = ({ productData }) => {
  const [activeHeading, setActiveHeading] = useState(1);

  // Dummy data for headings and descriptions
  const headings = ["DESCRIPTION", "HOW TO USE", "WHY KANNADIYAR", "REVIEWS"];
  const descriptions = [
    <>
      {productData.map((val) => (<>{val.description}</>))}
    </>,
    '---  ',
    `For more than three generations, Kannadiyar.com takes pride in reviving some of the ancient Siddha formulations under the name Kannadiyar. The company is actively engaged in selling quality Siddha and Ayurveda products, which includes raw materials, seeds, powders, roots, lehiyams, juices, health & hygiene products, hair oils and more.

    All products available with us are eco-friendly and without side-effects. Our passion lies in the supply of quality products in the best possible lowest price.`,
    <RatingsAndForm ratingDetails={productData} />,
  ];

  return (
    <div className="sm: flex sm: flex-col sm: p-5 sm: border-gray-100 sm: border-1 sm: m-5 lg:p-5 lg:border-gray-100 lg:border-1 lg:m-5">
      <div className=" lg:space-x-64">
        {headings.map((heading, index) => (
          <button
            key={index}
            onClick={() => setActiveHeading(index + 1)}
            style={{
              padding: "7px",
              borderRadius: "5px",
              marginRight: "2px",
              fontSize: "16px",
              color:index + 1 === activeHeading ? "#FFEDD5" : "#704214",
              background: index + 1 === activeHeading ? "#704214" : "white",
            }}
          >
            <div className="font-content">{heading}</div> 
          </button>
        ))}
      </div>
      <p className="lg:mt-16 font-content lg:text-2xl">{descriptions[activeHeading - 1]}</p>
    </div>
  );
};

export default BoxWithHeadings;

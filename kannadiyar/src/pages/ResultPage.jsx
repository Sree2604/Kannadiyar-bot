import React, { useEffect, useState } from "react";
import Topnavbar from "../components/Topnavbar";
import Footer from "../components/Footer";
import ProductProCards from "../components/ProductProCards";
import ListComponents from "../components/ListComponents";
import Halmark from "../components/Halmark";
import GreenThing from "../components/GreenThing";

function ResultPage() {
    const [productData, setProductData] = useState([]);

   

  useEffect(() => {
    const result = sessionStorage.getItem('result');

    if (result) {
      const suggestions = JSON.parse(result);

      let newData = [];

      if (suggestions.hasOwnProperty('topSuggestions')) {
        newData = suggestions.topSuggestions.map((val) => val.product);
      } else {
        newData = suggestions;
      }
      setProductData(newData)
      
    }
  }, []);

  return (
    <>
      <Topnavbar />
      <GreenThing header={"Products"} />
      <div className=" lg:flex lg:flex-col">
        <div className="lg:flex lg:flex-row lg:grid-rows-2 lg:gap-11">
          <ListComponents />
          <div className="">
            <ProductProCards product={productData}/>
          </div>
        </div>

        <div className="lg:flex lg:flex-row-reverse lg:mr-44"></div>
      </div>
      <div className=" lg:mt-10">
        <Halmark />
      </div>
      <Footer />
    </>
  );
}

export default ResultPage;

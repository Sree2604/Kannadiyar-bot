import React from "react";
import Topnavbar from "../components/Topnavbar";
import Footer from "../components/Footer";
import ProductProCards from "../components/ProductProCards";
import ListComponents from "../components/ListComponents";
import Halmark from "../components/Halmark";
import GreenThing from "../components/GreenThing";
import Topofferbar from "../components/Topofferbar";
function Products() {
  return (
    <>
      <Topofferbar />
      <Topnavbar />

      <GreenThing header={"Products"} />
      <div className=" lg:flex lg:flex-col">
        <h1 className="lg:mt-5 lg:ml-44 font-semibold text-primecolor text-2xl p-2">
          Categories
        </h1>
        <div className="lg:flex lg:flex-row lg:grid-rows-2 lg:gap-11">
          <ListComponents />
          <div className=" sm: flex sm: flex-col lg:flex lg:flex-row">
            <ProductProCards />
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

export default Products;

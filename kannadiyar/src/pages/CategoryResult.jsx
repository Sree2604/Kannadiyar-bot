import React, { useEffect, useState } from "react";
import Topnavbar from "../components/Topnavbar";
import Footer from "../components/Footer";
import ProductProCards from "../components/ProductProCards";
import ListComponents from "../components/ListComponents";
import Halmark from "../components/Halmark";
import GreenThing from "../components/GreenThing";
import { useParams, useNavigate } from "react-router-dom";
import Share from "../components/Share";
import Topofferbar from "../components/Topofferbar";

function CategoryResult() {
  const [productData, setProductData] = useState([]);
  const { category, subCategory } = useParams();
  const baseurl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        let url = `${baseurl}getCategoryProducts`;

        if (category === "null") {
          url += `?category=null&subCategory=${subCategory}`;
        } else {
          url += `?category=${category}&subCategory=null`;
        }

        const res = await fetch(url);
        const data = await res.json();
        setProductData(data);
      } catch (error) {
        console.error("Error fetching category products:", error);
      }
    };

    fetchCategoryProducts();
    console.log(productData);
  }, [category, subCategory]);

  return (
    <>
    <Topofferbar/>
      <Topnavbar />
      <GreenThing header={"Products"} />
      <div className="lg:flex lg:flex-col">
        <div className="lg:flex lg:flex-row lg:grid-rows-2 lg:gap-11">
          <ListComponents />
          <div className="">
            <ProductProCards product={productData} />
          </div>
        </div>
        <div className="lg:flex lg:flex-row-reverse lg:mr-44"></div>
      </div>
      <div className="lg:mt-10">
        <Halmark />
      </div>
      <Footer />
      <Share/>
    </>
  );
}

export default CategoryResult;

import React from "react";
import Topnavbar from "../components/Topnavbar";
import Topofferbar from "../components/Topofferbar";
import Carousels from "../components/Carousels";
import CategoryCard from "../components/CategoryCard";
import ProductCards from "../components/ProductCards";
import TopPicksCards from "../components/TopPicksCards";
import Footer from "../components/Footer";
import Halmark from "../components/Halmark";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Share from "../components/Share";

function Home() {
  const baseurl = import.meta.env.VITE_API_URL;
  const [productData, setProductData] = useState([]);
  const token = sessionStorage.getItem("token");
  const { custId } = useParams();
  sessionStorage.setItem("custId", custId);
  const navigate = useNavigate();
  const [tokenExist, setTokenExist] = useState(false);

  useEffect(() => {
    if (custId != 0) {
      if (token) {
        setTokenExist(true);
      } else {
        alert("Unauthorized access");
        navigate("/signup");
      }
    } else {
      setTokenExist(true);
    }
  }, []);
  useEffect(() => {
    const getProductsFromServer = async () => {
      const productsFromServer = await fetchProducts();
      setProductData(productsFromServer);
    };
    getProductsFromServer();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch(`${baseurl}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"), // Add token if required
      },
    });
    const data = await res.json();
    return data;
  };
  return (
    <>
      <div className="">
        {tokenExist && (
          <>
            <Topofferbar />

            <Topnavbar />
            <div>
              <Carousels />
            </div>
            <h1 className="sm:mt-10 sm:font-content  sm: ml-3 lg:mt-5 lg:text-2xl sm:text-lg lg:font-semibold lg:ml-44 text-primecolor">
              Shop by Category
            </h1>

            <div className=" lg:block">
              <CategoryCard />
            </div>
            <div className="flex"></div>

            <TopPicksCards product={productData} />
            <h1 className=" font-content  sm: ml-5 mb-3 lg:mt-6 mt-6 lg:text-2xl text-xl lg:font-semibold lg:ml-44 text-primecolor">
              Popular Products
            </h1>
            <ProductCards product={productData} />
            <Halmark />
            <Footer />
            <Share />
          </>
        )}
      </div>
    </>
  );
}

export default Home;

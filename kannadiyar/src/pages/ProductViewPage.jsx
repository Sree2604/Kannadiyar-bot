import Topnavbar from "../components/Topnavbar";
import Topofferbar from "../components/Topofferbar";
import Footer from "../components/Footer";
import ProductCards from "../components/ProductCards";
import ProductContent from "../components/ProductContent";
import ProductImage from "../components/ProductImage";
import DescriptionBox from "../components/DescriptionBox";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Share from "../components/Share";

function ProductViewPage() {
  const [product, setProduct] = useState([]);
  const [productData, setProductData] = useState([]);
  const { prodId } = useParams();
  const baseurl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const getProductsFromServer = async () => {
      const productsFromServer = await fetchProducts();
      setProductData(productsFromServer);
    };
    getProductsFromServer();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch(`${baseurl}`);
    const data = await res.json();
    return data;
  };

  const token = sessionStorage.getItem("token");

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!token) {
  //     alert("Unauthorized access");
  //     navigate("/");
  //   }
  // }, []);

  useEffect(() => {
    const fetchProductsFromServer = async () => {
      const productFromServer = await fetchProduct(prodId);
      setProduct(productFromServer);
    };
    fetchProductsFromServer();
  }, []);

  const fetchProduct = async (id) => {
    const res = await fetch(`${baseurl}getProduct/${id}`);
    const data = await res.json();
    return data;
  };
  return (
    <>
      <Topofferbar />
      <Topnavbar />
      <div>
        <div className=" lg:flex lg:flex-col lg:mt-3">
          <div className="lg:flex lg:flex-row lg:ml-10 ">
            <ProductImage productData={product} />
            <div className="lg:flex lg:flex-col lg:ml-10 lg:mt-10">
              <ProductContent productData={product} />
            </div>
          </div>
        </div>
        <DescriptionBox productData={product} />

        <div className=" lg:mt-10">
          <h1 className="lg:text-2xl lg:ml-11 lg:font-semibold">
            Frequently Purchased
          </h1>
          <ProductCards product={productData} />
        </div>
        <Footer />
        <Share/>
      </div>
    </>
  );
}

export default ProductViewPage;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ViewData from "./ViewProducts";

const Home = () => {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();
  const [tokenExist, setTokenExist] = useState(false);
  const baseUrl = import.meta.env.VITE_API;
  useEffect(() => {
    if (token) {
      setTokenExist(true);
    } else {
      alert("Unauthorized access");
      navigate("/");
    }
    const clearTokenOnUnload = () => {
      sessionStorage.removeItem("token");
    };
    window.addEventListener("beforeunload", clearTokenOnUnload);
    return () => {
      window.removeEventListener("beforeunload", clearTokenOnUnload);
    };
  }, []);

  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      const products = await fetchProducts();
      setProductData(products);
    };
    fetchDetails();
  }, []);

  const fetchProducts = async () => {
    const res = await fetch(`${baseUrl}`);
    const data = res.json();
    return data;
  };
  const addProduct = async (data) => {
    const formData = new FormData();
    formData.append("productName", data.productName);
    formData.append("productCategory", data.productCategory);
    formData.append("subCategory", data.subCategory);
    formData.append("productMrp", data.productMrp);
    formData.append("productWeight", data.productWeight);
    formData.append("createdAt", data.createdAt);
    formData.append("modifyAt", data.modifyAt);
    formData.append("description", data.description);
    formData.append("stock", data.stock);
    formData.append("tax", data.tax);
    formData.append("tamilName", data.tamilName);
    formData.append("botanicalName", data.botanicalName);
    formData.append("discountPrice", data.discountPrice);
    formData.append("coverImage", data.coverImage);
    if (data.images && data.images.length > 0) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append("images", data.images[i]);
      }
    }
    const res = await fetch("http://localhost:4000/add", {
      method: "POST",
      body: formData,
    });
    const result = await res.json();
    setProductData([...productData, result]);
    console.log(result);
    // console.log(data);
  };

  const UpdateProduct = async (details, id) => {
    const res = await fetch(`http://localhost:4000/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(details),
    });
    const resp = await res.json();
    setProductData(
      productData.map((product) =>
        product.id === id ? { ...product, resp } : product
      )
    );
  };
  const deleteProduct = async (id) => {
    await fetch(`http://localhost:4000/deleteProduct/${id}`, {
      method: "DELETE",
    });
    setProductData(productData.filter((val) => val.id !== id, console.log(id)));
  };

  return (
    <>{tokenExist && <ViewData pData={productData} remove={deleteProduct} />}</>
  );
};

export default Home;

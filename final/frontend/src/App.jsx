import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Form } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddDetails from "./pages/AddProduct";
import ViewData from "./pages/ViewProducts";
import Update from "./pages/Update";
import ProductSearch from "./components/Search";
import SignUp from "./pages/SignUp";
import RatingSize from "./components/RatingSize";
import Dummy from "./components/Dummy";
import AddCategory from "./pages/AddCategory";
import AddCarousels from "./components/AddCarousels";
import EditCategory from "./components/EditCategory";
import ReplyReviews from "./pages/ReplyReviews";

function App() {
  const [productData, setProductData] = useState([]);
  const [token, setToken] = useState("");

  const baseUrl = import.meta.env.VITE_API;
  console.log(baseUrl);

  useEffect(() => {
    const value = sessionStorage.getItem("token");
    setToken(value);
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
    formData.append("weights", JSON.stringify(data.weights));
    formData.append("createdAt", data.createdAt);
    formData.append("modifyAt", data.modifyAt);
    formData.append("description", data.description);
    formData.append("stock", data.stock);
    formData.append("tax", data.tax);
    formData.append("tamilName", data.tamilName);
    formData.append("botanicalName", data.botanicalName);
    formData.append("discountPrice", data.discountPrice);
    formData.append("actualWeight", data.actualWeight);
    formData.append("netWeight", data.netWeight);
    formData.append("coverImage", data.coverImage);
    if (data.images && data.images.length > 0) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append("images", data.images[i]);
      }
    }
    const res = await fetch(`${baseUrl}add`, {
      method: "POST",
      body: formData,
    });
    const result = await res.json();
    setProductData([...productData, result]);
    console.log(result);
    // console.log(data);
  };

  const UpdateProduct = async (details, id) => {
    const res = await fetch(`${baseUrl}update/${id}`, {
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
    await fetch(`${baseUrl}deleteProduct/${id}`, {
      method: "DELETE",
    });
    setProductData(productData.filter((val) => val.id !== id, console.log(id)));
  };

  const addCategory = async (data) => {
    try {
      console.log(data.coverImage);
      const res = await fetch(`http://localhost:4000/addCategory`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          category: data.category,
          subCategory: data.subCategory,
        }),
      });
      const { id } = await res.json();

      const formData = new FormData();
      formData.append("id", id);
      formData.append("coverImage", data.coverImage);
      const imageRes = await fetch(`http://localhost:4000/addCatImage`, {
        method: "POST",
        body: formData,
      });
      const result = await imageRes.json();
      if (imageRes.ok) {
        alert("Category added successfully...!!");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const submitImages = async (data) => {
    const formData = new FormData();
    formData.append("carouselImage1", data.carouselImage1);
    formData.append("carouselImage2", data.carouselImage2);
    formData.append("carouselImage3", data.carouselImage3);
    formData.append("poster1", data.poster1);
    formData.append("poster2", data.poster2);
    formData.append("productName1", data.productName1);
    formData.append("productName2", data.productName2);
    formData.append("productName3", data.productName3);
    formData.append("productName4", data.productName4);
    formData.append("productName5", data.productName5);
    const res = await fetch(`${baseUrl}addcarousels`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const result = await res.json();
      console.log(result);
    }
  };

  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<Home verify={token} />} />
          <Route path="/" element={<Login />} />
          <Route path="/add" element={<AddDetails data={addProduct} />} />
          <Route
            path="/banner"
            element={<AddCarousels addImages={submitImages} />}
          />
          <Route path="/editcat" element={<EditCategory />} />
          <Route
            path="/view"
            element={<ViewData pData={productData} remove={deleteProduct} />}
          />
          <Route path="/update" element={<Update update={UpdateProduct} />} />
          <Route path="sign" element={<SignUp />} />
          <Route path="/Search" element={<ProductSearch />} />
          <Route path="/rating" element={<RatingSize />} />
          <Route path="/test" element={<Dummy />} />
          <Route path="/reply" element={<ReplyReviews />} />
          <Route
            path="/addCategory"
            element={<AddCategory onSubmitData={addCategory} />}
          />
          {/* <Route path="/test1" element={<AnotherDummy data={addTestProduct}/>}/> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;

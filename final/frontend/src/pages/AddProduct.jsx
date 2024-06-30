import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const AddDetails = ({ data }) => {
  const [categories, setCategories] = useState([]);

  const baseUrl = import.meta.env.VITE_API;
  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getCategories();
      setCategories(result);
    };
    fetchCategories();
  }, []);

  const getCategories = async () => {
    const req = await fetch(`${baseUrl}categories`);
    const data = await req.json();
    return data;
  };

  const navigate = useNavigate();
  const token = sessionStorage.getItem("token");
  const [tokenExist, setTokenExist] = useState(false);
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

  const [productName, setProductName] = useState();
  const [productCategory, setProductCategory] = useState();
  const [productMrp, setProductMrp] = useState();
  const [productWeight, setProductWeight] = useState();
  const [images, setSelectedFile] = useState();
  const [stock, setProductStock] = useState();
  const [description, setProductDescription] = useState();
  const [tax, setProductTax] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [coverImage, setCoverImage] = useState();
  const [subCategory, setSubCategory] = useState("");
  const [botanicalName, setBotanicalName] = useState("");
  const [tamilName, setTamilName] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [measure, setMeasure] = useState("");
  const [weightInNumber, setWeightInNumber] = useState();

  const handleAdditionalPhotosChange = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files); // Convert FileList to an array
    setAdditionalPhotos(filesArray);
  };

  const getTimeStamp = () => {
    const d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var day = d.getDate();
    var hour = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    const currentTimeStamp = getTimeStamp();
    const formData = new FormData();
    var createdAt = currentTimeStamp;
    var modifyAt = currentTimeStamp;
    const finalWeight = `${weightInNumber} ${measure}`;
    setProductWeight(finalWeight);
    data({
      productName,
      productCategory,
      productMrp,
      productWeight,
      createdAt,
      modifyAt,
      stock,
      description,
      tax,
      tamilName,
      botanicalName,
      discountPrice,
      coverImage,
      subCategory,
      images,
    });
    setProductName("");
    setProductCategory("");
    setProductMrp("");
    setSelectedFile(null);
    setCoverImage(null);
    setTamilName("");
    setBotanicalName("");
    setDiscountPrice("");
    setProductWeight("");
    setProductDescription("");
    setProductStock("");
    setProductTax("");
  };

  const handleCategoryChange = (e) => {
    const categoryName = e.target.value;
    setSelectedCategory(categoryName);
    const selectedCategory = categories.find(
      (category) => category.category === categoryName
    );
    if (selectedCategory) {
      setProductCategory(categoryName);
      setSubCategories(selectedCategory.sub_category);
    } else {
      setSubCategories([]);
    }
  };

  const handleWeight = (e) => {
    const { value } = e.target;
    setMeasure(value);
  };
  return (
    <>
      {tokenExist && (
        <>
          <NavBar />
          <div className="flex justify-center">
            <h1 className="text-xl font-semibold font-content text-primecolor mt-2">
              Add your new product here
            </h1>
          </div>
          <div className="flex justify-center mt-6">
            <div className="flex flex-col">
              <form
                onSubmit={handleSubmission}
                className=" bg-orange-100 p-7 rounded-lg"
              >
                <label
                  className="text-l font-semibold font-content text-primecolor mr-3"
                  for="productName"
                >
                  Product Name: &nbsp;
                </label>
                <input
                  className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 bg-gray-50 font-content  focus:outline-brown"
                  type="text"
                  placeholder="Enter the product name:"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
                <br></br>
                <div className="flex flex-row">
                  <div className="flex flex-row">
                    <label
                      className="text-l mt-4 mr-4 font-semibold font-content text-primecolor"
                      for="productName"
                    >
                      Category: &nbsp;
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                      className="w-full shadow-md rounded py-2 px-3 mt-1 mb-4 ml-11  bg-gray-50 font-content  focus:outline-brown"
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.category}
                        </option>
                      ))}
                    </select>
                    <br></br>
                  </div>

                  <div className="flex flex-row">
                    <label
                      className="text-l font-semibold font-content text-primecolor ml-56"
                      for="productName"
                    >
                      Sub Category: &nbsp;
                    </label>
                    <select
                      onChange={(e) => setSubCategory(e.target.value)}
                      className="w-full shadow-md rounded py-2 px-3 mt-1 m-4 bg-gray-50 font-content  focus:outline-brown"
                    >
                      <option value="">Select Subcategory</option>
                      {subCategories.map((subcategory) => (
                        <option key={subcategory} value={subcategory}>
                          {subcategory}
                        </option>
                      ))}
                    </select>
                  </div>
                  <br></br>
                </div>
                <div className="flex flex-row">
                  <label
                    className="text-l font-semibold mt-3 font-content text-primecolor"
                    for="productMrp"
                  >
                    MRP: &nbsp;
                  </label>
                  <input
                    className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 bg-gray-50 font-content ml-24  focus:outline-brown"
                    type="text"
                    placeholder="Enter the MRP"
                    value={productMrp}
                    onChange={(e) => setProductMrp(e.target.value)}
                    required
                  />
                  <br></br>
                  <label
                    className="text-l font-semibold font-content mt-3 text-primecolor ml-16"
                    for="productWeight"
                  >
                    Weight: &nbsp;
                  </label>
                  <input
                    className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 bg-gray-50 font-content ml-8  focus:outline-brown"
                    type="text"
                    placeholder="Enter the weight"
                    value={weightInNumber}
                    onChange={(e) => setWeightInNumber(e.target.value)}
                    required
                  />
                  <select
                    value={measure}
                    required
                    onChange={handleWeight}
                    className="w-full shadow-md rounded py-2 px-3 mt-1 m-4 bg-gray-50 font-content  focus:outline-brown"
                  >
                    <option value="">Select measure</option>
                    <option value="gm">gm</option>
                    <option value="kg">kg</option>
                  </select>
                  <br></br>
                </div>
                <div className="flex flex-row">
                  <label
                    className="text-l font-semibold font-content mt-3 text-primecolor"
                    for="productdescription"
                  >
                    Description: &nbsp;
                  </label>
                  <input
                    className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 ml-9 bg-gray-50 font-content  focus:outline-brown"
                    type="text"
                    placeholder="Enter the description"
                    value={description}
                    onChange={(e) => setProductDescription(e.target.value)}
                    required
                  />
                  <br></br>
                  <label
                    className="text-l mt-3 font-semibold font-content text-primecolor ml-16"
                    for="productstock"
                  >
                    Stock: &nbsp;
                  </label>
                  <input
                    className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 ml-12 bg-gray-50 font-content  focus:outline-brown"
                    type="text"
                    placeholder="Enter the stock"
                    value={stock}
                    onChange={(e) => setProductStock(e.target.value)}
                    required
                  />
                  <br></br>
                </div>
                <div className="flex flex-row">
                  <label
                    className="text-l font-semibold font-content mt-3 text-primecolor"
                    for="productstock"
                  >
                    Botanical Name: &nbsp;
                  </label>
                  <input
                    className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 bg-gray-50 font-content  focus:outline-brown"
                    type="text"
                    placeholder="Enter the botanical name"
                    value={botanicalName}
                    onChange={(e) => setBotanicalName(e.target.value)}
                    required
                  />
                  <br></br>
                  <label
                    className="text-l font-semibold mt-3 font-content text-primecolor ml-16"
                    for="productstock"
                  >
                    Tamil Name: &nbsp;
                  </label>
                  <input
                    className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 bg-gray-50 font-content  focus:outline-brown"
                    type="text"
                    placeholder="Enter the tamil name"
                    value={tamilName}
                    onChange={(e) => setTamilName(e.target.value)}
                    required
                  />
                  <br></br>
                </div>
                <div className="flex flex-row">
                  <label
                    className="text-l font-semibold font-content mt-3 text-primecolor"
                    for="productstock"
                  >
                    Discount Price: &nbsp;
                  </label>
                  <input
                    className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 ml-4 bg-gray-50 font-content  focus:outline-brown"
                    type="text"
                    placeholder="Enter the discount price"
                    value={discountPrice}
                    onChange={(e) => setDiscountPrice(e.target.value)}
                    required
                  />
                  <br></br>
                  <label
                    className="text-l font-semibold mt-3 font-content text-primecolor ml-16"
                    for="productTax"
                  >
                    Tax: &nbsp;
                  </label>
                  <input
                    className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 ml-16 bg-gray-50 font-content  focus:outline-brown"
                    type="text"
                    placeholder="Enter the tax"
                    value={tax}
                    onChange={(e) => setProductTax(e.target.value)}
                    required
                  />
                  <br></br>
                </div>
                <div className="flex flex-row">
                  <label
                    className="text-l font-semibold font-content mt-3 text-primecolor"
                    for="productImage"
                  >
                    Product Images: &nbsp;
                  </label>
                  <input
                    className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 bg-gray-50 font-contetnt  focus:outline-brown"
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files)}
                    multiple
                    required
                  />
                  <br></br>
                  <label
                    className="text-l font-semibold mt-3 font-content text-primecolor ml-10"
                    for="productImage"
                  >
                    Cover Image: &nbsp;
                  </label>
                  <input
                    className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 ml-4 bg-gray-50 font-admin  focus:outline-brown"
                    type="file"
                    onChange={(e) => setCoverImage(e.target.files[0])}
                    required
                  />
                  <br></br>
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="w-1/2 shadow-md rounded py-2 px-3 mt-3 text-primecolor bg-gray-50 font-content focus:outline-brown hover:bg-primecolor hover:text-white"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default AddDetails;

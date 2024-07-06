import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

const AddDetails = ({ data }) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [tokenExist, setTokenExist] = useState(false);

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

  useEffect(() => {
    const token = sessionStorage.getItem("token");
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

  const navigate = useNavigate();

  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productMrp, setProductMrp] = useState("");
  const [images, setSelectedFile] = useState([]);
  const [stock, setProductStock] = useState("");
  const [description, setProductDescription] = useState("");
  const [tax, setProductTax] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [subCategory, setSubCategory] = useState("");
  const [botanicalName, setBotanicalName] = useState("");
  const [tamilName, setTamilName] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [weights, setWeights] = useState([{ value: "", measure: "" }]);
  const [actualWeight, setActualWeight] = useState("");
  const [netWeight, setNetWeight] = useState("");

  const handleAdditionalPhotosChange = (event) => {
    const files = event.target.files;
    const filesArray = Array.from(files); // Convert FileList to an array
    setSelectedFile(filesArray);
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
    const createdAt = currentTimeStamp;
    const modifyAt = currentTimeStamp;

    data({
      productName,
      productCategory,
      productMrp,
      weights,
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
      actualWeight,
      netWeight,
    });

    // Clear form fields after submission
    setProductName("");
    setProductCategory("");
    setProductMrp("");
    setSelectedFile([]);
    setCoverImage(null);
    setTamilName("");
    setBotanicalName("");
    setDiscountPrice("");
    setWeights([{ value: "", measure: "" }]);
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

  const handleWeightChange = (index, value, measure) => {
    const newWeights = [...weights];
    newWeights[index] = { value, measure };
    setWeights(newWeights);
  };

  const addWeight = () => {
    setWeights([...weights, { value: "", measure: "" }]);
  };

  const removeWeight = (index) => {
    const newWeights = [...weights];
    newWeights.splice(index, 1);
    setWeights(newWeights);
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
                className="bg-orange-100 p-7 rounded-lg"
              >
                <label
                  className="text-l font-semibold font-content text-primecolor mr-3"
                  htmlFor="productName"
                >
                  Product Name: &nbsp;
                </label>
                <input
                  className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 bg-gray-50 font-content focus:outline-brown"
                  type="text"
                  placeholder="Enter the product name:"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
                <br />
                <div className="flex flex-row">
                  <div className="flex flex-row">
                    <label
                      className="text-l mt-4 mr-4 font-semibold font-content text-primecolor"
                      htmlFor="productCategory"
                    >
                      Category: &nbsp;
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                      className="w-full shadow-md rounded py-2 px-3 mt-1 mb-4 ml-11 bg-gray-50 font-content focus:outline-brown"
                    >
                      <option value="">Select Category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.category}>
                          {category.category}
                        </option>
                      ))}
                    </select>
                    <br />
                  </div>

                  <div className="flex flex-row">
                    <label
                      className="text-l font-semibold font-content text-primecolor ml-56"
                      htmlFor="subCategory"
                    >
                      Sub Category: &nbsp;
                    </label>
                    <select
                      onChange={(e) => setSubCategory(e.target.value)}
                      className="w-full shadow-md rounded py-2 px-3 mt-1 m-4 bg-gray-50 font-content focus:outline-brown"
                    >
                      <option value="">Select Subcategory</option>
                      {subCategories.map((subcategory) => (
                        <option key={subcategory} value={subcategory}>
                          {subcategory}
                        </option>
                      ))}
                    </select>
                  </div>
                  <br />
                </div>
                <div className="flex flex-row">
                  <label
                    className="text-l font-semibold font-content mt-3 text-primecolor"
                    htmlFor="productMrp"
                  >
                    MRP: &nbsp;
                  </label>
                  <input
                    className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 bg-gray-50 font-content ml-24 focus:outline-brown"
                    type="text"
                    placeholder="Enter the MRP"
                    value={productMrp}
                    onChange={(e) => setProductMrp(e.target.value)}
                    required
                  />
                  <br />
                </div>

                <div className="flex flex-col">
                  <label
                    className="text-l font-semibold font-content mt-3 text-primecolor"
                    htmlFor="productWeight"
                  >
                    Weights: &nbsp;
                  </label>
                  {weights.map((weight, index) => (
                    <div key={index} className="flex flex-row mb-2">
                      <input
                        className="w-1/2 shadow-md rounded py-2 px-3 bg-gray-50 font-content focus:outline-brown"
                        type="text"
                        placeholder="Enter the weight"
                        value={weight.value}
                        onChange={(e) =>
                          handleWeightChange(
                            index,
                            e.target.value,
                            weight.measure
                          )
                        }
                        required
                      />
                      <select
                        value={weight.measure}
                        onChange={(e) =>
                          handleWeightChange(
                            index,
                            weight.value,
                            e.target.value
                          )
                        }
                        className="w-1/4 shadow-md rounded py-2 px-3 ml-2 bg-gray-50 font-content focus:outline-brown"
                      >
                        <option value="">Select measure</option>
                        <option value="gm">gm</option>
                        <option value="kg">kg</option>
                        <option value="packet/box">packet/box</option>
                        <option value="ml">ml</option>
                      </select>
                      <button type="button" onClick={() => removeWeight(index)}>
                        Remove
                      </button>
                    </div>
                  ))}

                  <button type="button" onClick={addWeight}>
                    Add Weight
                  </button>
                </div>

                <div className="flex flex-row">
                  <label
                    className="text-l font-semibold font-content mt-3 text-primecolor"
                    htmlFor="productDescription"
                  >
                    Description: &nbsp;
                  </label>
                  <input
                    className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 ml-9 bg-gray-50 font-content focus:outline-brown"
                    type="text"
                    placeholder="Enter the description"
                    value={description}
                    onChange={(e) => setProductDescription(e.target.value)}
                    required
                  />
                  <br />
                  <label
                    className="text-l mt-3 font-semibold font-content text-primecolor ml-16"
                    htmlFor="productStock"
                  >
                    Stock: &nbsp;
                  </label>
                  <input
                    className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 ml-12 bg-gray-50 font-content focus:outline-brown"
                    type="text"
                    placeholder="Enter the stock"
                    value={stock}
                    onChange={(e) => setProductStock(e.target.value)}
                    required
                  />
                  <br />
                </div>
                <div className="flex flex-row">
                  <label
                    className="text-l font-semibold font-content mt-3 text-primecolor"
                    htmlFor="botanicalName"
                  >
                    Botanical Name: &nbsp;
                  </label>
                  <input
                    className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 bg-gray-50 font-content focus:outline-brown"
                    type="text"
                    placeholder="Enter the botanical name"
                    value={botanicalName}
                    onChange={(e) => setBotanicalName(e.target.value)}
                    required
                  />
                  <br />
                  <label
                    className="text-l font-semibold mt-3 font-content text-primecolor ml-16"
                    htmlFor="tamilName"
                  >
                    Tamil Name: &nbsp;
                  </label>
                  <input
                    className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 bg-gray-50 font-content focus:outline-brown"
                    type="text"
                    placeholder="Enter the tamil name"
                    value={tamilName}
                    onChange={(e) => setTamilName(e.target.value)}
                    required
                  />
                  <br />
                </div>
                <div className="flex flex-row">
                  <label
                    className="text-l font-semibold font-content mt-3 text-primecolor"
                    htmlFor="discountPrice"
                  >
                    Discount Price: &nbsp;
                  </label>
                  <input
                    className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 ml-4 bg-gray-50 font-content focus:outline-brown"
                    type="text"
                    placeholder="Enter the discount price"
                    value={discountPrice}
                    onChange={(e) => setDiscountPrice(e.target.value)}
                    required
                  />
                  <br />
                  <label
                    className="text-l font-semibold mt-3 font-content text-primecolor ml-16"
                    htmlFor="tax"
                  >
                    Tax: &nbsp;
                  </label>
                  <input
                    className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 ml-16 bg-gray-50 font-content focus:outline-brown"
                    type="text"
                    placeholder="Enter the tax"
                    value={tax}
                    onChange={(e) => setProductTax(e.target.value)}
                    required
                  />
                  <br />
                </div>
                <div className="flex flex-row">
                  <label
                    className="text-l font-semibold font-content mt-3 text-primecolor"
                    htmlFor="actualWeight"
                  >
                    Actual Product Weight: &nbsp;
                  </label>
                  <input
                    className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 ml-4 bg-gray-50 font-content focus:outline-brown"
                    type="text"
                    placeholder="Enter the actual weight"
                    value={actualWeight}
                    onChange={(e) => setActualWeight(e.target.value)}
                    required
                  />
                  <br />
                  <label
                    className="text-l font-semibold mt-3 font-content text-primecolor ml-16"
                    htmlFor="tax"
                  >
                    Product Net Weight: &nbsp;
                  </label>
                  <input
                    className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 ml-16 bg-gray-50 font-content focus:outline-brown"
                    type="text"
                    placeholder="Enter the net weight"
                    value={netWeight}
                    onChange={(e) => setNetWeight(e.target.value)}
                    required
                  />
                  <br />
                </div>
                <div className="flex flex-row">
                  <label
                    className="text-l font-semibold font-content mt-3 text-primecolor"
                    htmlFor="productImages"
                  >
                    Product Images: &nbsp;
                  </label>
                  <input
                    className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 bg-gray-50 font-content focus:outline-brown"
                    type="file"
                    onChange={handleAdditionalPhotosChange}
                    multiple
                    required
                  />
                  <br />
                  <label
                    className="text-l font-semibold mt-3 font-content text-primecolor ml-10"
                    htmlFor="coverImage"
                  >
                    Cover Image: &nbsp;
                  </label>
                  <input
                    className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 ml-4 bg-gray-50 font-content focus:outline-brown"
                    type="file"
                    onChange={(e) => setCoverImage(e.target.files[0])}
                    required
                  />
                  <br />
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

import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "react-crud-icons";
import NavBar from "../components/NavBar";

function Update({ update }) {
  const navigate = useNavigate();

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

  const sid = JSON.parse(sessionStorage.getItem("update_main"))["product_id"];
  const sname = JSON.parse(sessionStorage.getItem("update_main"))[
    "product_name"
  ];
  const scat = JSON.parse(sessionStorage.getItem("update_main"))[
    "product_category"
  ];
  const sweight = JSON.parse(sessionStorage.getItem("update_main"))["weight"];
  const smrp = JSON.parse(sessionStorage.getItem("update_main"))["mrp"];
  const sdesc = JSON.parse(sessionStorage.getItem("update_main"))["desc"];
  const sqty = JSON.parse(sessionStorage.getItem("update_main"))["stock"];
  const stax = JSON.parse(sessionStorage.getItem("update_main"))["tax"];
  const sBotanicalName = JSON.parse(sessionStorage.getItem("update_main"))[
    "botanicalName"
  ];
  const sTamilName = JSON.parse(sessionStorage.getItem("update_main"))[
    "tamilName"
  ];
  const sDiscountPrice = JSON.parse(sessionStorage.getItem("update_main"))[
    "discountPrice"
  ];

  const [productName, setProductName] = useState(sname);
  const [productCategory, setProductCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [productWeight, setProductWeight] = useState(sweight);
  const [productMrp, setProductMrp] = useState(smrp);
  const [description, setProductDescription] = useState(sdesc);
  const [stock, setProductStock] = useState(sqty);
  const [tax, setProductTax] = useState(stax);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [botanicalName, setBotanicalName] = useState(sBotanicalName);
  const [tamilName, setTamilName] = useState(sTamilName);
  const [discountPrice, setDiscountPrice] = useState(sDiscountPrice);

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

  const handleSubmission = (e) => {
    e.preventDefault();
    update(
      {
        productName,
        productCategory,
        productWeight,
        productMrp,
        description,
        stock,
        tax,
        subCategory,
        botanicalName,
        tamilName,
        discountPrice,
      },
      sid
    );
    window.location.href = "/view";
  };
  return (
    <>
      <NavBar />
      <div className="flex justify-center">
        <h1 className="text-xl font-semibold font-content text-primecolor mt-2">
          Update your product here
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
                value={productWeight}
                onChange={(e) => setProductWeight(e.target.value)}
                required
              />
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
  );
}

export default Update;

import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

const AddCategory = ({ onSubmitData, onSubmitImage }) => {
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState([]);
  const [coverImage, setCoverImage] = useState(null);

  const handleSubCategoryChange = (index, value) => {
    const updatedSubcategory = [...subCategory];
    updatedSubcategory[index] = value;
    setSubCategory(updatedSubcategory);
  };

  const addSubCategoryInput = () => {
    setSubCategory([...subCategory, ""]);
  };

  const removeSubCategoryInput = (index) => {
    const updatedSubCategories = [...subCategory];
    updatedSubCategories.splice(index, 1);
    setSubCategory(updatedSubCategories);
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    onSubmitData({
      category,
      subCategory,
      coverImage,
    });
    setCategory("");
    setSubCategory([]);
    setCoverImage(null);
  };

  return (
    <>
      <NavBar />
      <div className="flex justify-center">
        <h1 className="text-xl font-semibold font-content text-primecolor mt-2">
          Add your new Category
        </h1>
      </div>
      <div className="flex justify-center mt-6">
        <form
          onSubmit={handleSubmission}
          className=" bg-orange-100 p-7 rounded-lg"
        >
          <label
            className="text-l font-semibold font-content text-primecolor mr-7"
            htmlFor="productName"
          >
            Category: &nbsp;
          </label>
          <input
            type="text"
            className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 bg-gray-50 font-content  focus:outline-brown"
            value={category}
            placeholder="Category name"
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <div className="mb-4">
            <div className="relative w-full">
              <label
                htmlFor="Sub Category"
                className="text-l font-semibold font-content text-primecolor mr-3"
              >
                Sub Category
              </label>
              <div className="absolute inset-y-0 right-0 flex text-2xl items-center pr-3 cursor-pointer">
                <ion-icon
                  name="add-outline"
                  onClick={addSubCategoryInput}
                ></ion-icon>
              </div>
            </div>
            <div>
              {subCategory.map((item, index) => (
                <div key={index} className="relative w-full">
                  <textarea
                    id={`reuse_${index}`}
                    placeholder={`Enter Sub Category ${index + 1} Method`}
                    value={item}
                    onChange={(e) =>
                      handleSubCategoryChange(index, e.target.value)
                    }
                    className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 bg-gray-50 font-content  focus:outline-brown"
                    required
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer">
                    <ion-icon
                      size="small"
                      name="close-outline"
                      onClick={() => removeSubCategoryInput(index)}
                      className="cursor-pointer"
                    ></ion-icon>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <label
            className="text-l font-semibold font-content text-primecolor "
            for="productImage"
          >
            Cover Image: &nbsp;
          </label>
          <input
            className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 bg-gray-50 font-content  focus:outline-brown"
            type="file"
            onChange={(e) => setCoverImage(e.target.files[0])}
            required
          />
          <br></br>
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
    </>
  );
};

export default AddCategory;

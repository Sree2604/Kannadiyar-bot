import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";

const AnotherDummy = ({ data }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await getCategories();
      setCategories(result);
    };
    fetchCategories();
  }, []);

  const getCategories = async () => {
    const req = await fetch("http://localhost:4000/categories");
    const data = await req.json();
    return data;
  };

  const [tokenExist, setTokenExist] = useState(true);
  const [productCategory, setProductCategory] = useState();
  const [images, setSelectedFile] = useState();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [coverImage, setCoverImage] = useState();
  const [subCategory, setSubCategory] = useState("");

  const handleSubmission = async (e) => {
    console.log(images);
    e.preventDefault();
    data({
      productCategory,
      subCategory,
      images,
      coverImage,
    });
    setProductCategory("");
    setSubCategory("");
    setSelectedFile();
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

  return (
    <>
      {tokenExist && (
        <>
          <NavBar />
          <div className="flex mt-36 justify-center">
            <form onSubmit={handleSubmission}>
              <div className="w-full p-8 shadow-xl max-w-prose ">
                <div>
                  <div>
                    <label for="productName">Category: &nbsp;</label>
                    <select
                      value={selectedCategory}
                      onChange={handleCategoryChange}
                      className="w-full shadow-md rounded py-2 px-3 mt-1 mb-4 bg-gray-50 font-admin  focus:outline-none"
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
                  <div>
                    <label for="productName">Sub Category: &nbsp;</label>
                    <select
                      onChange={(e) => setSubCategory(e.target.value)}
                      className="w-full shadow-md rounded py-2 px-3 mt-1 mb-4 bg-gray-50 font-admin  focus:outline-none"
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
                  <label for="productImage">Image Path: &nbsp;</label>
                  <input
                    className="w-full shadow-md rounded py-2 px-3 mt-1 mb-4 bg-gray-50 font-admin  focus:outline-none"
                    type="file"
                    onChange={(e) => setSelectedFile(e.target.files)}
                    multiple
                    required
                  />
                         <br></br>
                  <label for="productImage">Cover Image: &nbsp;</label>
                  <input
                    className="w-full shadow-md rounded py-2 px-3 mt-1 mb-4 bg-gray-50 font-admin  focus:outline-none"
                    type="file"
                    onChange={(e) => setCoverImage(e.target.files[0])}
                    required
                  />
                         <br></br>
                </div>
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="w-1/2 shadow-md rounded py-2 px-3 mt-1 bg-gray-50 font-admin  focus:outline-none"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </>
      )}
    </>
  );
};

export default AnotherDummy;

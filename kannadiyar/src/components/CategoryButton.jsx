import React, { useEffect, useState } from "react";
import Dropdown from "react-multilevel-dropdown";
import { useNavigate } from "react-router-dom";
// import c1 from "../assets/c1.jpg";
// import c2 from "../assets/c2.jpg";
// import c5 from "../assets/c5.jpg";
// import c10 from "../assets/c10.jpg";
// import c4 from "../assets/c4.jpg";
// import c15 from "../assets/c15.jpg";
// import c16 from "../assets/c16.jpg";
// import c20 from "../assets/c20.jpg";

//
const baseurl = import.meta.env.VITE_API_URL;

const CategoryButton = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const handleCategoryClick = (category) => {
    // const category
    navigate(`/categoryResult/${category.category}/null`);
  };

  const handleSubCategoryClick = (subcategory) => {
    navigate(`/categoryResult/null/${subcategory}`);
  };

  // console.log(categories)

  useEffect(() => {
    const getCategoriesFromServer = async () => {
      const categoriesFromServer = await fetchCategories();
      setCategories(categoriesFromServer);
    };
    getCategoriesFromServer();
  }, []);

  const fetchCategories = async () => {
    const res = await fetch(`${baseurl}categories`);
    const data = await res.json();
    return data;
  };

  return (
    <div className="flex justify-center items-center">
      <Dropdown
        title="⇄ All Categories"
        className="font-content font-semibold rounded-md relative p-2 border mt-2 mb-2 lg:ml-64 ml-24 bg-orange-100 text-primecolor hover:bg-primecolor hover:text-orange-100"
      >
        {categories.map((category) => (
          <Dropdown.Item
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className="lg:mr-12 lg:gap-2 mr-12"
          >
            <img
              src={`http://localhost:4000/categories/${category.image}`}
              className="rounded-full w-10 h-10"
              alt={category.name}
            />
            {category.category}
            <Dropdown.Submenu position="right">
              {category.sub_category.map((subcategory, index) => (
                <Dropdown.Item
                  onClick={() => handleSubCategoryClick(subcategory)}
                  key={index}
                >
                  {subcategory}
                </Dropdown.Item>
              ))}
            </Dropdown.Submenu>
          </Dropdown.Item>
        ))}
      </Dropdown>
    </div>
  );
};

export default CategoryButton;

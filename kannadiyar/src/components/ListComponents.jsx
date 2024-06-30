import ListGroup from "react-bootstrap/ListGroup";
import Dropdown from "react-multilevel-dropdown";
import { useState, useEffect } from "react";

function ListComponents() {
  const baseurl = import.meta.env.VITE_API_URL;

  const handleCategoryClick = (category) => {
    // const category
    window.location.href = `#/categoryResult/${category.category}/null`;
  };

  const handleSubCategoryClick = (subcategory, event) => {
    event.stopPropagation(); // Stop event propagation
    window.location.href = `#/categoryResult/null/${subcategory}`;
  };
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategoriesFromServer = async () => {
      const categoriesFromServer = await fetchCategories();
      setCategories(categoriesFromServer);
    };
    getCategoriesFromServer();
  }, []);

  // console.log(categories)

  const fetchCategories = async () => {
    const res = await fetch(`${baseurl}categories`);
    const data = await res.json();
    return data;
  };

  return (
    <div className="sm: mt-3">
      <div className="sm: mt-3 sm: w-[300px] sm: ml-2  lg:mt-5 lg:ml-40 lg:flex lg:flex-col border-collapse border-2">
        {categories.map((category) => (
          <Dropdown.Item
            key={category.id}
            onClick={() => handleCategoryClick(category)}
            className="lg:mr-12 lg:gap-2 text-primecolor"
          >
            <img
              src={`${baseurl}categories/${category.image}`}
              className="rounded-full w-10 h-10"
              alt={category.name}
            />
            {category.category}
            <Dropdown.Submenu className="text-primecolor" position="right">
              {category.sub_category.map((subcategory, index) => (
                <Dropdown.Item
                  onClick={(event) =>
                    handleSubCategoryClick(subcategory, event)
                  }
                  key={index}
                  className="text-primecolor"
                >
                  {subcategory}
                </Dropdown.Item>
              ))}
            </Dropdown.Submenu>
          </Dropdown.Item>
        ))}

        {/* </Dropdown> */}
      </div>
    </div>
  );
}

export default ListComponents;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const baseurl = import.meta.env.VITE_API_URL;

const Card = ({ details, color }) => {
  const navigate = useNavigate();

  return (
    <div className="flex-shrink-0 w-64 p-4 m-8  text-center font-semibold text-sm rounded-lg">
      <div
        className={color + " p-4 rounded-md cursor-pointer"}
        onClick={() => navigate(`#/categoryResult/${details.category}/null`)}
      >
        <img
          className="rounded-full w-64 h-40 p-2 "
          src={`${baseurl}categories/${details.image}`}
          alt=""
        />{" "}
        {details.category}
      </div>
    </div>
  );
};

const CategoryCard = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const assignColorToCategories = (categories) => {
    const colors = [
      "bg-cyan-100",
      "bg-purple-200",
      "bg-sky-200",
      "bg-violet-200",
      "bg-indigo-200",
      "bg-teal-200",
      "bg-pink-200",
      "bg-indigo-200",
    ];

    return categories.map((category, index) => {
      const colorIndex = index % colors.length;
      const cardColor = colors[colorIndex];
      return {
        details: category,
        color: cardColor,
      };
    });
  };
  const [slideIndex, setSlideIndex] = useState(0);

  const handleNextSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex + 1.2) % Math.ceil(9));
  };

  const handlePrevSlide = () => {
    setSlideIndex((prevIndex) => (prevIndex - 1.2) % Math.ceil(9));
  };

  const cardWidth = 280; // Adjust based on the actual width of your cards

  const transformValue = `translateX(-${slideIndex * cardWidth}px)`;

  const handleCategoryClick = (category) => {
    navigate(`/categoryResult/${category.category}/null`);
  };

  const handleSubCategoryClick = (subcategory) => {
    navigate(`/categoryResult/null/${subcategory}`);
  };

  useEffect(() => {
    const getCategoriesFromServer = async () => {
      try {
        const categoriesFromServer = await fetchCategories();
        const categoriesWithColors =
          assignColorToCategories(categoriesFromServer);
        setCategories(categoriesWithColors);
      } catch (error) {
        // Handle error fetching categories
        console.error("Error fetching categories:", error);
      }
    };
    getCategoriesFromServer();
  }, []);

  const fetchCategories = async () => {
    const res = await fetch(`${baseurl}categories`);
    const data = await res.json();
    return data;
  };
  return (
    <div className="sm: ml-0  lg:ml-10 lg:mr-10">
      <div className="flex items-center">
        <div className="">
          <button
            className="bg-orange-100 text-primecolor lg:text-2xl sm: text-md font-bold p-3 px-4 rounded-full hover:bg-primecolor hover:text-orange-100"
            onClick={handlePrevSlide}
          >
            <ion-icon name="arrow-back-outline"></ion-icon>
          </button>
        </div>
        <div className="overflow-hidden flex">
          <div
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: transformValue }}
          >
            {/* Cards with colors */}
            {categories.map((category, index) => (
              <Card
                key={index}
                details={category.details}
                color={category.color}
              />
            ))}
          </div>
        </div>

        <div className="ml-4">
          <button
            className="bg-orange-100 text-primecolor lg:text-2xl sm: text-md font-bold p-3 px-4 rounded-full hover:bg-primecolor hover:text-orange-100"
            onClick={handleNextSlide}
          >
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </button>
        </div>
        {/* Next slide button */}
      </div>
    </div>
  );
};

export default CategoryCard;

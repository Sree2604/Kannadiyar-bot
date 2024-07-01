import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CategoryButton from "./CategoryButton";
import logo from "../assets/logo.png";
import Form from "react-bootstrap/Form";
import WishlistOffCanvas from "./WishlistOffCanvas";

export default function Topnavbar() {
  const [searchInput, setSearchInput] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [suggestions, setSuggestions] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(0);
  const wrapperRef = useRef(null);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const baseurl = import.meta.env.VITE_API_URL;
  // Fetch product names when the component mounts
  useEffect(() => {
    const fetchProductsName = async () => {
      try {
        const response = await fetch(`${baseurl}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const productNames = data.map((element) => element.product_name);
        setProductDetails(productNames);
        setFilteredProducts(productNames); // Initialize filtered products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProductsName();
  }, []);
  // console.log(searchInput);

  // Handle search input change
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchInput(query);
    filterProducts(query);
    setActiveSuggestion(0); // Reset active suggestion
    setSuggestions(true); // Show suggestions on input change
  };

  // Filter products based on search query
  const filterProducts = (query) => {
    if (!query) {
      setFilteredProducts(productDetails);
    } else {
      const filtered = productDetails.filter((product) =>
        product.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(filtered.slice(0, 5)); // Limit to 5 suggestions
    }
  };

  // Handle search submission
  const handleSubmission = async () => {
    try {
      const response = await fetch(`${baseurl}search/${searchInput}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      sessionStorage.setItem("result", JSON.stringify(data));
      window.location.href = "/result";
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  // Check for customer ID in session storage and show login if not present
  const navigate = useNavigate();
  const custId = sessionStorage.getItem("custId");

  useEffect(() => {
    if (custId === "0" || custId === null) {
      setShowLogin(true);
    }
    const fetchCount = async () => {
      const cartDetails = await fetch(`${baseurl}api/cart/${custId}`);
      const cartData = await cartDetails.json();
      setCartCount(cartData.length);
      const wishlistDetails = await fetch(`${baseurl}api/wishlist/${custId}`);
      const wishlistData = await wishlistDetails.json();
      setWishlistCount(wishlistData.length);
    };
    fetchCount();
  }, [custId]);
  // Handle menu toggle for mobile view
  const { pathname } = useLocation();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const menuLinks = [
    { to: `/${custId}`, text: "Home" },
    { to: "/Products", text: "Products" },
    { to: "/About", text: "About Us" },
    { to: "/Contact", text: "Contact" },
    { to: "/Reviews", text: "Reviews" },
  ];

  // Handle showing suggestions
  const handleSuggestion = () => {
    setSuggestions(true);
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      if (activeSuggestion < filteredProducts.length - 1) {
        setActiveSuggestion(activeSuggestion + 1);
      }
    } else if (e.key === "ArrowUp") {
      if (activeSuggestion > 0) {
        setActiveSuggestion(activeSuggestion - 1);
      }
    } else if (e.key === "Enter") {
      setSearchInput(filteredProducts[activeSuggestion]);
      setSuggestions(false);
    }
  };

  return (
    <nav className=" bg-primecolor border-b-2 border-primecolor sticky top-0 z-50 ">
      <div className="flex flex-row ">
        <a href="/">
          <img
            src={logo}
            alt="kannadiyar-logo"
            className="lg:ml-72 ml-2 mt-2 mr-1 lg:mr-28 w-12"
          />
        </a>
        <Form
          className="flex flex-row h-11 ml-2 w-72 lg:w-80 relative"
          ref={wrapperRef}
        >
          <Form.Control
            type="search"
            placeholder="Search for Products"
            value={searchInput}
            onClick={handleSuggestion}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
            className="me-2 font-content mt-2"
            aria-label="Search"
          />
          <div className="border p-2 mt-2 rounded-lg bg-orange-100 hover:bg-primecolor text-primecolor hover:text-orange-100 lg:text-2xl cursor-pointer">
            <ion-icon
              name="search-outline"
              onClick={handleSubmission}
            ></ion-icon>
          </div>
          {suggestions && (
            <ul className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-md max-h-48 overflow-auto z-10">
              {filteredProducts.map((suggestion, index) => (
                <li
                  key={index}
                  className={`p-2 cursor-pointer ${
                    activeSuggestion === index ? "bg-gray-200" : ""
                  }`}
                  onClick={() => {
                    setSearchInput(suggestion);
                    setSuggestions(false);
                  }}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </Form>
        {/* place holder ends */}
        {showLogin && (
          <div className="flex flex-col ml-1 lg:ml-28">
            <button
              className="text-sm lg:text-lg bg-orange-100 text-primecolor hover:bg-primecolor font-content lg:font-semibold px-4 py-2 rounded-lg ml-4 mt-1 hover:text-orange-100 cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Login
            </button>
          </div>
        )}
        <div className="relative border mt-2 p-2 ml-28 mr-4 rounded-full w-10 h-11 text-2xl cursor-pointer text-primecolor bg-orange-100 hover:text-orange-100 hover:bg-primecolor lg:block hidden">
          <ion-icon
            onClick={() => navigate("/MyAccount")}
            name="person-outline"
          ></ion-icon>
        </div>
        <div className="relative border p-2 mt-2 ml-2 mr-4 rounded-full w-10 h-11 text-2xl cursor-pointer text-primecolor bg-orange-100 hover:text-orange-100 hover:bg-primecolor lg:block hidden">
          <ion-icon
            onClick={() => navigate("/Wishlist")}
            name="heart-outline"
          ></ion-icon>
          <div className="absolute -top-1 mt-2 right-0 left-7 w-5 h-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
            {wishlistCount}
          </div>
        </div>
        <div className="relative flex">
          <div className="hidden lg:block p-2 relative mt-2">
            <WishlistOffCanvas />
            <div className="absolute top-0 left-10 w-5 h-5 rounded-full bg-red-600 text-white text-xs flex items-center justify-center">
              {cartCount}
            </div>
          </div>
        </div>
      </div>
      <div className="lg:container lg:mx-auto lg:flex lg:justify-between ">
        <div className="flex -ml-2 space-x-40">
          <div>
            <CategoryButton />
          </div>
          <button
            onClick={toggleMenu}
            className="text-letter focus:outline-none text-2xl lg:hidden "
          >
            ☰
          </button>
        </div>
        <div
          className={`lg:flex lg:items-center lg:w-auto ${
            isMenuOpen ? "block" : "hidden"
          }`}
        >
          <div className="hidden lg:block mr-32">
            <ul className="  lg:flex lg:space-x-24  text-lg space-y-0 font-content">
              {menuLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.to}
                    className={`text-letter ${
                      pathname === link.to ? "font-bold" : ""
                    }`}
                  >
                    {link.text}
                  </a>
                </li>
              ))}
              <li className="lg:space-y-0 space-y-4 lg:hidden">
                <div className="text-letter cursor-pointer lg:hidden">
                  <h1 onClick={() => navigate("/MyAccount")}>My Account</h1>
                </div>
                <div className="text-letter cursor-pointer lg:hidden">
                  <h1 onClick={() => navigate("/Wishlist")}>Wishlist</h1>
                </div>
                <div className="text-letter cursor-pointer lg:hidden">
                  <h1 onClick={() => navigate("/booking")}>Cart</h1>
                </div>
              </li>
            </ul>
          </div>
          <ul className="lg:flex lg:space-x-4  lg:space-y-0 ml-28 font-content">
            <div className="lg:hidden space-y-2 -ml-16  mb-2 mt-2">
              {menuLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.to}
                    className={`text-letter ${
                      pathname === link.to ? "font-bold " : ""
                    }`}
                  >
                    {link.text}
                  </a>
                </li>
              ))}
              <li className="lg:space-y-0 space-y-4">
                <div className="text-letter cursor-pointer lg:hidden">
                  <h1 onClick={() => navigate("/MyAccount")}>My Account</h1>
                </div>
                <div className="text-letter cursor-pointer lg:hidden">
                  <h1 onClick={() => navigate("/Wishlist")}>Wishlist</h1>
                </div>
                <div className="text-letter cursor-pointer lg:hidden">
                  <h1 onClick={() => navigate("/booking")}>Cart</h1>
                </div>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

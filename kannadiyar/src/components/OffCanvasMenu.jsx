import React from "react";
import { Link } from "react-router-dom";

const OffCanvasMenu = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-50 ${
        isOpen ? "block" : "hidden"
      }`}
      onClick={onClose}
    >
      <div className="absolute left-0 top-0 h-full bg-orange-100 w-64 p-4 shadow-md text-primecolor">
        <div className="text-2xl font-bold mb-4">Menu</div>
        <hr className="border-[1px] mb-4 border-primecolor" />
        <div className=" mb-4">
          <Link to={`/`}>Home</Link>
        </div>
        <div className="mb-4">
          <Link to={`/products`}>Products</Link>
        </div>
        <div className="mb-4">
          <Link to={`/myaccount`}>My Account</Link>
        </div>
        <div className="mb-4">
          <Link to={`/wishlist`}>Wishlist</Link>
        </div>
        <div className="mb-4">
          <Link to={`/booking`}>Cart</Link>
        </div>
        <div className="mb-4">
          <Link to={`/reviews`}>Reviews</Link>
        </div>
        <div className="mb-4">
          <Link to={`/about`}>About Us</Link>
        </div>
        <div className="mb-4">
          <Link to={`/contact`}>Contact</Link>
        </div>
        <div className="mb-4">
          <Link to={`/`}>Logout</Link>
        </div>
        <div>
          
        </div>
      </div>
    </div>
  );
};

export default OffCanvasMenu;

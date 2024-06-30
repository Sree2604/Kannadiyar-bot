import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Drop from "./Drop";
import { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductProCards({ product }) {
  const [ratingsInfo, setRatingsInfo] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const baseurl = import.meta.env.VITE_API_URL;
  const custId = sessionStorage.getItem("custId");
  useEffect(() => {
    if (product) {
      product.forEach(async (val) => {
        try {
          const response = await fetch(`${baseurl}product/${val.id}/ratings`);
          const data = await response.json();
          const { rating_count, avg_rating } = data;

          setRatingsInfo((prevInfo) => [
            ...prevInfo,
            {
              id: val.id,
              count: rating_count,
              average: parseFloat(avg_rating).toFixed(1),
            },
          ]);
        } catch (error) {
          console.error("Error fetching ratings:", error);
        }
      });
    }
  }, [product]);

  const addToWishlist = async (productId) => {
    if (custId == "0" || custId == null) {
      toast.error("You are in guest mode", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      const response = await fetch(`${baseurl}wishlist/?action=add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          custId: custId,
          product: productId,
        }),
      });
      if (response.ok) {
        // If successful, update the local state to reflect the added item
        toast.success("Successfully added to wishlist...!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setWishlistItems([...wishlistItems, productId]);
      } else {
        toast.warning("Already in wishlist...!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const addToCart = async (productId) => {
    if (custId == "0" || custId == null) {
      toast.error("You are in guest mode", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      try {
        const response = await fetch(`${baseurl}addToCart/?action=add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            custId: custId,
            prodId: productId,
            quantity: 1,
          }),
        });
        if (response.ok) {
          // If successful, update the local state to reflect the added item
          toast.success("Successfully added to cart...!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          window.location.reload();
        } else {
          toast.warning("Already in cart...!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } catch (error) {
        console.error("Error adding item to wishlist:", error);
      }
    }
  };

  const isWishlist = (productId) => {
    return wishlistItems.includes(productId);
  };

  return (
    <>
      <ToastContainer />
      <div className="sm:mt-3 mt-6 font-content font-semibold sm:gap-4 lg:grid lg:grid-cols-3  lg:gap-4 lg:mt-20">
        {!product ? (
          <p className="sm: flex sm: flex-row text-primecolor font-semibold  font-content lg:text-2xl text-center p-2">
            Select any category of Products...
          </p>
        ) : (
          <>
            {product.map((val) => (
              <>
                {/* <div
                  key={val.id}
                  className="lg:mt-16 space-x-24 lg:gap-8 justify-center"
                > */}
                <Card
                  key={val.id}
                  style={{ width: "18rem" }}
                  className=" border-2 font-content border-gray-300 m-auto"
                >
                  <button
                    className="absolute top-0 right-0 m-2 bg-white  font-content rounded-full p-2 border border-gray-30 z-10"
                    onClick={() => addToWishlist(val.id)}
                  >
                    {/* Replace the heart icon below with your preferred wishlist icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 ${
                        isWishlist(val.id) ? "text-red-500" : "text-gray-500"
                      }`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="0"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18.342l-1.426-1.296C3.129 12.423 0 9.275 0 5.5 0 2.421 2.421 0 5.5 0 7.017 0 8.504.732 10 2.163 11.496.732 12.983 0 14.5 0 17.579 0 20 2.421 20 5.5c0 3.775-3.129 6.923-8.574 11.546L10 18.342z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <div className="" key={val.id}>
                    <Card.Img
                      className="p-2 h-48 object-cover object-right absolute overflow-hidden w-72"
                      src={`${baseurl}uploads/${val.image}`}
                      onClick={() =>
                        (window.location.href = `/Productpage/${val.id}`)
                      }
                    ></Card.Img>
                  </div>
                  <Card.Title className="font-content pl-2 mt-52">
                    {val.product_name}
                  </Card.Title>
                  <Card.Text className="font-content pl-2">
                    {val.sub_category}
                  </Card.Text>
                  <Card.Body>
                    <div className="flex ">
                      <Drop weight={val.weight} />
                    </div>
                    <div className=" font-content flex flex-nowrap gap-20">
                      <Card.Title className="font-content  text-red-700 pt-2">
                        ₹{val.mrp}
                      </Card.Title>
                      <div className="pt-2 font-content">
                        <Rating
                          name="simple-controlled"
                          value={
                            ratingsInfo.find((item) => item.id === val.id)
                              ?.average || 0
                          }
                          readOnly
                          precision={0.5}
                          size="small"
                        />{" "}
                        (
                        {ratingsInfo.find((item) => item.id === val.id)
                          ?.count || 0}
                        )
                      </div>
                    </div>
                    <div className="items-center font-content">
                      <Button
                        variant="success"
                        alt="placeholder"
                        onClick={() => addToCart(val.id)}
                        className="  w-60 bg-primecolor  hover:bg-opacity-75 text-orange-100 py-2 px-54 rounded inline-flex items-center"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 mr-2 mx-12"
                          viewBox="0 0 512 512"
                        >
                          <path
                            d="M80 176a16 16 0 00-16 16v216c0 30.24 25.76 56 56 56h272c30.24 0 56-24.51 56-54.75V192a16 16 0 00-16-16zM160 176v-32a96 96 0 0196-96h0a96 96 0 0196 96v32"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="32"
                          />
                          <path
                            d="M160 224v16a96 96 0 0096 96h0a96 96 0 0096-96v-16"
                            fill="none"
                          />
                        </svg>
                        <span className="text-white">Add to Bag</span>
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
                {/* </div> */}
              </>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default ProductProCards;

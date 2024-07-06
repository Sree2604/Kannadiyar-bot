import { useState, useEffect, useCallback } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Rating } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import Drop from "./Drop";
import "react-toastify/dist/ReactToastify.css";

function ProductCards({ product }) {
  const custId = sessionStorage.getItem("custId");
  const [ratingsInfo, setRatingsInfo] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const baseurl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (product && product.length > 0) {
      const shuffledProducts = [...product].sort(() => Math.random() - 0.5);
      const selectedProducts = shuffledProducts.slice(0, 4);
      setRandomProducts(selectedProducts);
    }
  }, [product]);

  useEffect(() => {
    const fetchRatings = async () => {
      const newRatingsInfo = await Promise.all(
        randomProducts.map(async (val) => {
          try {
            const response = await fetch(`${baseurl}product/${val.id}/ratings`);
            const data = await response.json();
            const { rating_count, avg_rating } = data;
            return {
              id: val.id,
              count: rating_count,
              average: parseFloat(avg_rating).toFixed(1),
            };
          } catch (error) {
            console.error("Error fetching ratings:", error);
            return { id: val.id, count: 0, average: 0 };
          }
        })
      );
      setRatingsInfo(newRatingsInfo);
    };

    if (randomProducts.length > 0) {
      fetchRatings();
    }
  }, [randomProducts, baseurl]);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      if (custId && custId !== "0") {
        try {
          const response = await fetch(`${baseurl}api/wishlist/${custId}`);
          const data = await response.json();
          setWishlistItems(
            Array.isArray(data) ? data.map((item) => item.id) : []
          );
        } catch (error) {
          console.error("Error fetching wishlist items:", error);
        }
      } else {
        setWishlistItems([]);
      }
    };

    fetchWishlistItems();
  }, [custId, baseurl]);

  const addToWishlist = useCallback(
    async (productId) => {
      if (!custId || custId === "0") {
        toast.error("You are in guest mode", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      try {
        const response = await fetch(`${baseurl}wishlist/?action=add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            custId,
            product: productId,
          }),
        });
        if (response.ok) {
          toast.success("Successfully added to wishlist...!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          // Update wishlist items state
          setWishlistItems((prevItems) => [...prevItems, productId]);
        } else {
          toast.warning("Already in wishlist...!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } catch (error) {
        console.error("Error adding item to wishlist:", error);
      }
    },
    [custId, baseurl]
  );

  const addToCart = useCallback(
    async (productId, selectedWeight) => {
      if (!custId || custId === "0") {
        toast.error("You are in guest mode", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      if (selectedWeight == null || undefined) {
        toast.error("Please select weight..!!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }
      try {
        const response = await fetch(`${baseurl}addToCart/?action=add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            custId,
            prodId: productId,
            weight: selectedWeight,
            quantity: 1,
          }),
        });
        if (response.ok) {
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
        console.error("Error adding item to cart:", error);
      }
    },
    [custId, baseurl]
  );

  const isWishlist = useCallback(
    (productId) => wishlistItems.includes(productId),
    [wishlistItems]
  );

  return (
    <>
      <ToastContainer />
      <div className="sm:flex sm:flex-col sm:mt-3 grid grid-col-2 font-content lg:grid lg:grid-cols-4 lg:gap-2 justify-around">
        {!product ? (
          <p className="text-gray-500">Select any category of Products...</p>
        ) : (
          randomProducts.map((val) => (
            <Card
              key={val.id}
              style={{ width: "18rem" }}
              className="sm:mt-0 border-2 font-content border-gray-300 m-2 relative"
            >
              <button
                className="absolute top-0 right-0 m-2 font-content bg-white rounded-full p-2 border border-gray-30 z-10"
                onClick={() => addToWishlist(val.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ${
                    isWishlist(val.id) ? "text-red-500" : "text-gray-500"
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18.342l-1.426-1.296C3.129 12.423 0 9.275 0 5.5 0 2.421 2.421 0 5.5 0 7.017 0 8.504.732 10 2.163 11.496.732 12.983 0 14.5 0 17.579 0 20 2.421 20 5.5c0 3.775-3.129 6.923-8.574 11.546L10 18.342z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <Card.Img
                className="p-2 h-48 object-cover object-right absolute overflow-hidden"
                src={`${baseurl}uploads/${val.image}`}
                onClick={() =>
                  (window.location.href = `/Productpage/${val.id}`)
                }
              />
              <Card.Title className="sm:ml-1 font-content pl-2 mt-52">
                {val.product_name}
              </Card.Title>
              <Card.Text className="sm:ml-1 pl-2">{val.sub_category}</Card.Text>
              <Card.Body>
                <div className="flex">
                  <Drop
                    weight={val.weights}
                    selectedItem={val.selectedWeight || ""}
                    setSelectedItem={(selectedItem) =>
                      (val.selectedWeight = selectedItem)
                    }
                  />
                </div>
                <div className="flex flex-nowrap gap-20">
                  <Card.Title className="text-red-700 font-content pt-2">
                    ₹{val.mrp}
                  </Card.Title>
                  <div className="pt-2">
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
                    {ratingsInfo.find((item) => item.id === val.id)?.count || 0}
                    )
                  </div>
                </div>
                <div className="items-center font-content">
                  <Button
                    variant="success"
                    alt="placeholder"
                    onClick={() => addToCart(val.id, val.selectedWeight)}
                    className="w-60 bg-primecolor hovertext-orange-100 py-2 px-54 rounded inline-flex items-center"
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
                    <span className="text-orange-100">Add to Bag</span>
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </>
  );
}

export default ProductCards;

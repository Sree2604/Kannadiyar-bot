import Footer from "../components/Footer";
import Myaddress from "../components/Myaddress";
import Topnavbar from "../components/Topnavbar";
import Topofferbar from "../components/Topofferbar";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Share from "../components/Share";

function OrderBooking() {
  const custId = sessionStorage.getItem("custId");
  const [loading, setLoading] = useState(false);
  const [isGuestMode, setIsGuestMode] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [selectedAddressId, setSelectedAddressId] = useState(null);
  const [couponCode, setCouponCode] = useState("");
  const [discountPrice, setDiscountPrice] = useState(0);
  const [subWeight, setSubWeight] = useState(0);
  const [deliveryCharge, setDeliveryCharge] = useState(60);
  const [order, setOrder] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(""); // Default to "Pay Now"
  const baseurl = import.meta.env.VITE_API_URL;

  const [userAddress, setUserAddress] = useState([]);
  const [getAddress, setGetAddress] = useState(false);
  const [showPaymentMethod, setShowPaymentMethod] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let totalMRP = 0;
    let totalWeight = 0;
    cartItems.forEach((item) => {
      totalMRP += parseFloat(item.mrp) * item.quantity;

      let weight = item.weight;
      let weightInKg = 0;

      // Handling weight with or without space between number and unit
      const match = weight.match(
        /(\d+\.?\d*)\s*(gm|grams|gram|kg|kilograms|kilogram)/i
      );
      if (match) {
        const weightValue = parseFloat(match[1]);
        const weightUnit = match[2].toLowerCase();

        if (
          weightUnit === "gm" ||
          weightUnit === "grams" ||
          weightUnit === "gram"
        ) {
          weightInKg = weightValue / 1000; // Convert grams to kilograms
        } else if (
          weightUnit === "kg" ||
          weightUnit === "kilograms" ||
          weightUnit === "kilogram"
        ) {
          weightInKg = weightValue; // Already in kilograms
        }
      }

      totalWeight += weightInKg * item.quantity;
    });

    totalMRP = totalMRP.toFixed(2);
    setSubTotal(parseFloat(totalMRP)); // Ensure subTotal is a number
    setSubWeight(totalWeight);
  }, [cartItems]);

  useEffect(() => {
    const getCartItems = async () => {
      const cartItemsFromServer = await fetchCartItems();
      setCartItems(cartItemsFromServer);
      setOrder(false);
    };
    getCartItems();
  }, [order]);

  useEffect(() => {
    calcluateDeliveryCharge();
  }, [selectedAddressId]);
  const fetchCartItems = async () => {
    const res = await fetch(`${baseurl}api/cart/${custId}`);
    const data = await res.json();
    return data;
  };

  const handleCheckout = async () => {
    if (!selectedAddressId) {
      toast.error("Please select an address", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    if (paymentMethod === "payNow") {
      try {
        const response = await fetch(`${baseurl}/pay?amount=${subTotal}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const data = await response.json();

        // console.log(data.paymentUrl);
      } catch (error) {
        console.error("Error during checkout:", error);
        toast.error("Error during checkout", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else if (paymentMethod === "cod") {
      try {
        setLoading(true); // Set loading to true before making the API call

        let usedCoupon = null; // Initialize usedCoupon variable

        if (discountPrice !== 0) {
          usedCoupon = couponCode; // Assign couponCode to usedCoupon if discountPrice is not 0
        }

        const response = await fetch(`${baseurl}codOrder`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            custId,
            addressId: selectedAddressId,
            cartItems,
            usedCoupon, // Pass usedCoupon in the request body
          }),
        });

        const data = await response.json();

        if (response.ok) {
          toast.success("Order placed successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
          setOrder(true);
        } else {
          toast.error(data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } catch (error) {
        console.error("Error during checkout:", error);
        toast.error("Error during checkout", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } finally {
        setLoading(false); // Set loading to false after API call completes (success or error)
      }
    }
  };

  const calcluateDeliveryCharge = async () => {
    try {
      const result = await fetch(
        `${baseurl}calcTariff?addressId=${selectedAddressId}&subWeight=${subWeight}`
      );
      const data = await result.json();
      setDeliveryCharge(data.deliveryCharge);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleApplyCoupon = async () => {
    if (!couponCode) {
      toast.error("Please enter a coupon code", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    if (subTotal === 0) {
      toast.info("Can't apply coupon to empty cart", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    try {
      const response = await fetch(`${baseurl}coupon`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          couponCode,
          purchaseValue: subTotal,
          custId,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        let temp = subTotal * (data.discount / 100);
        console.log(temp);
        setDiscountPrice(temp);
        setDeliveryCharge(0);
      } else {
        toast.error(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error during apply coupon:", error);
    }
  };

  useEffect(() => {
    if (custId === "0" || custId === null) {
      setIsGuestMode(true);
    }
  }, [custId]);

  if (isGuestMode) {
    return (
      <>
        <Topofferbar />
        <Topnavbar />
        <p className="mt-11 ml-4 text-2xl font-content">
          You are in guest mode...!!
        </p>
        <Footer />
      </>
    );
  }

  return (
    <>
      {loading && (
        <CircularProgress
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      )}
      <ToastContainer />
      <Topofferbar />
      <Topnavbar />
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-xl font-bold">Checkout</h2>
        <div className="w-4/5 flex flex-col sm:flex-row">
          <div className=" m-2 bg-white shadow-lg p-2 rounded-lg h-96 sm:hidden">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between mb-2">
                  <p>
                    {item.product_name} ({item.quantity})
                  </p>
                  <p>₹{(parseFloat(item.mrp) * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between mb-2">
              <p>Subtotal</p>
              <p>₹{subTotal.toFixed(2)}</p>
            </div>
            {discountPrice > 0 && (
              <div className="flex justify-between mb-2">
                <p>Discount</p>
                <p>-₹{discountPrice.toFixed(2)}</p>
              </div>
            )}
            <div className="flex justify-between mb-2">
              <p>Delivery Charge</p>
              <p>₹{deliveryCharge}</p>
            </div>
            <div className="flex justify-between font-bold mb-2">
              <p>Total</p>
              <p>₹{(subTotal + deliveryCharge).toFixed(2)}</p>
            </div>
          </div>
          <div className="w-full sm:w-4/6 m-2 flex flex-col gap-8">
            <div className="bg-primecolor rounded-lg shadow-lg p-2 w-full flex flex-col gap-3">
              <h3 className="text-lg font-semibold text-white">
                1. Select a Delivery Address
              </h3>
              {!getAddress && (
                <>
                  <div className="bg-white rounded-lg p-4">
                    <Myaddress
                      onAddressSelect={(id) => setSelectedAddressId(id)}
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      className="bg-white text-green-800 py-2 px-4 rounded hover:scale-105"
                      onClick={() => {
                        if (selectedAddressId) {
                          setGetAddress(true);
                        }
                        else{
                          toast.error("Please select any one of the address", {
          position: toast.POSITION.TOP_RIGHT,
        });
                        }
                      }}
                    >
                      Use this address
                    </button>
                  </div>
                </>
              )}
            </div>
            <div className="flex flex-col bg-primecolor rounded-lg shadow-lg p-2 w-full gap-3">
              <h3 className="text-lg font-semibold text-white">
                2. Select a Payment Method
              </h3>
              {getAddress && !showPaymentMethod && (
                <div className="bg-white rounded-lg p-4">
                  <button
                    className="bg-green-800 text-white py-2 px-4 rounded m-2"
                    onClick={() => {
                      setPaymentMethod("payNow");
                      setShowPaymentMethod(true);
                    }}
                  >
                    Pay Now
                  </button>
                  <button
                    className="bg-green-800 text-white py-2 px-4 rounded m-2"
                    onClick={() => {
                      setPaymentMethod("cod");
                      setShowPaymentMethod(true);
                    }}
                  >
                    Cash on Delivery
                  </button>
                </div>
              )}

              {showPaymentMethod && (
                <div className="bg-white rounded-lg p-2">
                  <p className="text-lg font-semibold">
                    Payment Method: {paymentMethod}
                  </p>
                  <p className="text-base">
                    (we'll Contact soon to confirm your booking)
                  </p>
                </div>
              )}
            </div>

            {showPaymentMethod && (
              <div className="bg-primecolor rounded-lg shadow-lg p-2 w-full">
                <h3 className="text-lg font-semibold text-white">
                  3. Apply Coupon and Place Order
                </h3>
                <div className="bg-white rounded-lg p-2">
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Coupon Code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="border rounded py-2 px-3 mb-2 w-full"
                    />
                    <button
                      onClick={handleApplyCoupon}
                      disabled={discountPrice !== 0}
                      className="bg-[#ffedd5] text-black py-2 px-4 rounded w-full"
                    >
                      Apply Coupon
                    </button>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="bg-[#ffedd5] text-black py-2 px-4 rounded w-full"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="w-2/6 m-2 bg-white shadow-lg p-2 rounded-lg h-96 hidden sm:flex sm:flex-col">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between mb-2">
                  <p>
                    {item.product_name} ({item.quantity})
                  </p>
                  <p>₹{(parseFloat(item.mrp) * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between mb-2">
              <p>Subtotal</p>
              <p>₹{subTotal.toFixed(2)}</p>
            </div>
            {discountPrice > 0 && (
              <div className="flex justify-between mb-2">
                <p>Discount</p>
                <p>-₹{discountPrice.toFixed(2)}</p>
              </div>
            )}
            <div className="flex justify-between mb-2">
              <p>Delivery Charge</p>
              {deliveryCharge == 0 ? (
                <p>
                  free <span className="line-through">₹{deliveryCharge}</span>
                </p>
              ) : (
                <p>₹{deliveryCharge}</p>
              )}
            </div>
            <div className="flex justify-between font-bold mb-2">
              <p>Total</p>
              <p>₹{(subTotal + deliveryCharge - discountPrice).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <Share/>
    </>
  );
}

export default OrderBooking;

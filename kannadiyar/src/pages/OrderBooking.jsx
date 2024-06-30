import Footer from "../components/Footer";
import Myaddress from "../components/Myaddress";
import Topnavbar from "../components/Topnavbar";
import Topofferbar from "../components/Topofferbar";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function OrderBooking() {
  const custId = sessionStorage.getItem("custId");
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
      let weightArray = item.weight.split(" ");
      totalWeight += parseInt(weightArray[0]) * item.quantity;
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

  const fetchCartItems = async () => {
    const res = await fetch(`${baseurl}api/cart/${custId}`);
    const data = await res.json();
    return data;
  };

  const increaseQuantity = async (itemId) => {
    try {
      const updatedCart = cartItems.map((item) => {
        if (item.id === itemId) {
          const updatedItem = { ...item, quantity: item.quantity + 1 };
          updateCartItemQuantity(updatedItem);
          return updatedItem;
        }
        return item;
      });

      setCartItems(updatedCart);
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  const decreaseQuantity = async (itemId) => {
    try {
      const updatedCart = cartItems.map((item) => {
        if (item.id === itemId && item.quantity > 1) {
          const updatedItem = { ...item, quantity: item.quantity - 1 };
          updateCartItemQuantity(updatedItem);
          return updatedItem;
        }
        return item;
      });

      setCartItems(updatedCart);
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  const updateCartItemQuantity = async (updatedItem) => {
    try {
      await fetch(
        `${baseurl}updateQuantity/?prodId=${updatedItem.id}&custId=${custId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ quantity: updatedItem.quantity }),
        }
      );
    } catch (error) {
      console.error("Error updating quantity in the backend:", error);
    }
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

        console.log(data.paymentUrl);
      } catch (error) {
        console.error("Error during checkout:", error);
        toast.error("Error during checkout", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else if (paymentMethod === "cod") {
      try {
        const response = await fetch(`${baseurl}codOrder`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            custId,
            addressId: selectedAddressId,
            cartItems,
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
      }
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
        }),
      });
      const data = await response.json();
      if (response.ok) {
        let temp = subTotal * (data.discount / 100);
        setDiscountPrice(temp);
        setSubTotal(subTotal - temp);
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
      <ToastContainer />
      <Topofferbar />
      <Topnavbar />
      <div className="flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold">Checkout</h2>
        <div className="w-full flex">
          <div className="w-4/6 m-3 flex flex-col gap-8">
            <div className="bg-[#638759] rounded-lg shadow-lg p-4 w-full flex flex-col gap-3">
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
                      className="bg-white text-green-800 py-2 px-4 rounded hover:scale-110"
                      onClick={() => {
                        if (selectedAddressId) {
                          setGetAddress(true);
                        }
                      }}
                    >
                      Use this address
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-col bg-[#638759] rounded-lg shadow-lg p-4 w-full gap-3">
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
                <div className="bg-white rounded-lg p-4">
                  <p className="text-lg font-semibold">
                    Payment Method: {paymentMethod}
                  </p>
                </div>
              )}
            </div>

            {showPaymentMethod && (
              <div className="bg-[#638759] rounded-lg shadow-lg p-4 w-full">
                <h3 className="text-lg font-semibold text-white">
                  3. Apply Coupon and Place Order
                </h3>
                <div className="bg-white rounded-lg p-4">
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
                      className="bg-green-800 text-white py-2 px-4 rounded w-full"
                    >
                      Apply Coupon
                    </button>
                  </div>
                  <button
                    onClick={handleCheckout}
                    className="bg-green-800 text-white py-2 px-4 rounded w-full"
                  >
                    Place Order
                  </button>
                </div>
              </div>
            )}
          </div>
          <div className="w-2/6 m-3 bg-white shadow-lg p-4 rounded-lg h-96">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between mb-2">
                  <p>
                    {item.name} ({item.quantity})
                  </p>
                  <p>${(parseFloat(item.mrp) * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-between mb-2">
              <p>Subtotal</p>
              <p>${subTotal.toFixed(2)}</p>
            </div>
            {discountPrice > 0 && (
              <div className="flex justify-between mb-2">
                <p>Discount</p>
                <p>-${discountPrice.toFixed(2)}</p>
              </div>
            )}
            <div className="flex justify-between mb-2">
              <p>Delivery Charge</p>
              <p>${deliveryCharge}</p>
            </div>
            <div className="flex justify-between font-bold mb-2">
              <p>Total</p>
              <p>${(subTotal + deliveryCharge - discountPrice).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default OrderBooking;

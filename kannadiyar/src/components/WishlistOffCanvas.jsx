import { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Counter from "./Counter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function WishlistOffCanvas() {
  const [show, setShow] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [isGuestMode, setIsGuestMode] = useState(false);
  const baseurl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const custId = sessionStorage.getItem("custId");

  useEffect(() => {
    if (custId === "0" || custId === null) {
      setIsGuestMode(true);
    } else {
      fetchCartItems();
    }
  }, [custId]);

  useEffect(() => {
    calculateSubTotal();
  }, [cartItems]);

  const fetchCartItems = async () => {
    try {
      const res = await fetch(`${baseurl}api/cart/${custId}`);
      const data = await res.json();
      setCartItems(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCartItems([]);
    }
  };

  const calculateSubTotal = () => {
    const total = cartItems.reduce(
      (acc, item) => acc + parseFloat(item.mrp) * item.quantity,
      0
    );
    setSubTotal(total.toFixed(2));
  };

  const handleCheckout = async () => {
    try {
      const response = await fetch(`${baseurl}create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cartItems }),
      });

      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {
      console.error("Error during checkout:", error);
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

  const handleQuantityChange = async (itemId, change) => {
    try {
      const updatedCart = cartItems.map((item) => {
        if (item.id === itemId && item.quantity + change > 0) {
          const updatedItem = { ...item, quantity: item.quantity + change };
          updateCartItemQuantity(updatedItem);
          return updatedItem;
        }
        return item;
      });

      setCartItems(updatedCart);
    } catch (error) {
      console.error(`Error changing quantity: ${error}`);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      const res = await fetch(`${baseurl}addToCart/?action=delete`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ custId, prodId: itemId }),
      });

      if (res.ok) {
        toast.success("Product Removed!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        setCartItems(cartItems.filter((item) => item.id !== itemId));
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const goToLogin = () => {
    navigate("/");
  };

  return (
    <>
      <ToastContainer />
      <a
        className="border p-2 mr-10 w-10 h-11 rounded-full text-2xl cursor-pointer text-primecolor bg-orange-100 hover:text-orange-100 hover:bg-primecolor"
        onClick={handleShow}
      >
        <ion-icon name="cart-outline"></ion-icon>
      </a>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {isGuestMode ? (
            <>
              <h1>You are in guest mode</h1>
              <div className="flex flex-col">
                <button
                  className="border items-center border-black px-4 py-2 rounded mt-4 cursor-pointer"
                  onClick={goToLogin}
                >
                  Sign Up/Login
                </button>
              </div>
            </>
          ) : (
            <>
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="lg:flex lg:flex-row lg:mt-5 font-content"
                  >
                    <img
                      className="lg:h-20 lg:w-20 lg:rounded-full lg:mt-2"
                      src={`${baseurl}uploads/${item.image}`}
                      alt={item.product_name}
                    />
                    <div className="lg:flex lg:flex-col lg:ml-4">
                      <h1 className="lg:text-xl">{item.product_name}</h1>
                      <h1 className="lg:text-lg">₹{item.mrp}</h1>
                      <Counter
                        increase={() => handleQuantityChange(item.id, 1)}
                        decrease={() => handleQuantityChange(item.id, -1)}
                        quantity={item.quantity}
                      />
                    </div>
                    <h2 className="lg:text-lg lg:ml-20 lg:mt-5 lg:font-semibold">
                      ₹{item.mrp}
                    </h2>
                    <ion-icon
                      name="trash-outline"
                      onClick={() => handleRemove(item.id)}
                    ></ion-icon>
                  </div>
                ))
              ) : (
                <p>Your cart is empty.</p>
              )}
              <div className="flex flex-row mt-7">
                <h2 className="text-xl font-bold font-content">Subtotal</h2>
                <h2 className="ml-6 text-xl font-semibold">₹{subTotal}</h2>
              </div>
              <div className="flex flex-col">
                <button
                  onClick={() => navigate("/booking")}
                  className="bg-primecolor hover:opacity-60 items-center text-orange-100 px-4 py-2 rounded mt-4 cursor-pointer"
                >
                  Checkout
                </button>
              </div>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default WishlistOffCanvas;

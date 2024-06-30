import { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Counter from "./Counter";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function WishlistOffCanvas() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const custId = sessionStorage.getItem("custId");
  const baseurl = import.meta.env.VITE_API_URL;
  const [cartItems, setCartItems] = useState([]);
  const [subTotal, setSubTotal] = useState();
  const [isGuestMode, setIsGuestMode] = useState(false);
  useEffect(() => {
    const getCartItems = async () => {
      const cartItemsFromServer = await fetchCartItems();
      setCartItems(cartItemsFromServer);
    };
    getCartItems();
    // console.log(cartItems);
  }, []);

  useEffect(() => {
    const custId = sessionStorage.getItem("custId");
    if (custId === "0" || custId === null) {
      setIsGuestMode(true);
    }
  }, []);

  useEffect(() => {
    let totalMRP = 0;
    let cartLength = cartItems.length;
    cartItems.forEach((item) => {
      totalMRP += parseFloat(item.mrp) * item.quantity; // Assuming 'mrp' is a string representing price
    });
    totalMRP = totalMRP.toFixed(2);
    setSubTotal(totalMRP);
    // sessionStorage.setItem('cartDetails', JSON.stringify({cartLength,totalMRP}));
  }, [cartItems]);

  const fetchCartItems = async () => {
    const res = await fetch(`${baseurl}api/cart/${custId}`);
    const data = await res.json();
    return data;
  };

  const handleCheckout = async () => {
    // console.log(cartItems)
    try {
      const response = await fetch(`${baseurl}create-checkout-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cartItems }), // Send cartItems to backend
      });

      const data = await response.json();

      // Redirect to the checkout URL returned by the backend
      window.location.href = data.url;
    } catch (error) {
      console.error("Error during checkout:", error);
      // Handle error
    }
  };

  const increaseQuantity = async (itemId) => {
    try {
      const updatedCart = cartItems.map((item) => {
        if (item.id === itemId) {
          const updatedItem = { ...item, quantity: item.quantity + 1 };
          // Update quantity in the database using a fetch/axios PUT request
          updateCartItemQuantity(updatedItem); // Implement this function to update quantity in the backend
          return updatedItem;
        }
        return item;
      });

      setCartItems(updatedCart);
    } catch (error) {
      console.error("Error increasing quantity:", error);
      // Handle error
    }
  };

  const decreaseQuantity = async (itemId) => {
    try {
      const updatedCart = cartItems.map((item) => {
        if (item.id === itemId && item.quantity > 1) {
          const updatedItem = { ...item, quantity: item.quantity - 1 };
          // Update quantity in the database using a fetch/axios PUT request
          updateCartItemQuantity(updatedItem); // Implement this function to update quantity in the backend
          return updatedItem;
        }
        return item;
      });

      setCartItems(updatedCart);
    } catch (error) {
      console.error("Error decreasing quantity:", error);
      // Handle error
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
      // Handle error
    }
  };
  const handleRemove = async (itemid) => {
    const res = await fetch(`${baseurl}addToCart/?action=delete`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ custId: custId, prodId: itemid }),
    });
    if (res.ok) {
      toast.success("Product Removed !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      window.location.reload();
    }
  };
  const navigate = useNavigate();
  if (isGuestMode) {
    return (
      <>
        <a className="border mr-10 w-10 h-11 p-2 rounded-full text-2xl cursor-pointer text-primecolor bg-orange-100 hover:text-orange-100 hover:bg-primecolor">
          <ion-icon onClick={handleShow} name="cart-outline"></ion-icon>
        </a>

        <Offcanvas show={show} onHide={handleClose} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className="">Shopping Cart</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <h1>You are in guest mode</h1>
            <div className="flex flex-col">
              <button
                className="border items-center border-black px-4 py-2 rounded mt-4 cursor-pointer"
                onClick={() => clicked("/")}
              >
                Sign Up/Login
              </button>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }
  function clicked(path) {
    navigate(path);
  }

  return (
    <>
      <a className="border p-2 mr-10 w-10 h-11 rounded-full text-2xl cursor-pointer text-primecolor bg-orange-100 hover:text-orange-100 hover:bg-primecolor">
        <ion-icon onClick={handleShow} name="cart-outline"></ion-icon>
      </a>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title className="">Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cartItems.map((item) => (
            <div className="lg:flex lg:flex-row lg:mt-5 font-content">
              <img
                className="lg:h-20 lg:w-20 lg:rounded-full lg:mt-2"
                src={`${baseurl}uploads/${item.image}`}
                alt=""
              />
              <div className="lg:flex lg:flex-col lg:ml-4">
                <h1 className="lg:text-xl">{item.product_name} </h1>
                <h1 className="lg:text-lg">₹{item.mrp}</h1>
                <Counter
                  increase={() => increaseQuantity(item.id)}
                  decrease={() => decreaseQuantity(item.id)}
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
          ))}
          <div className="flex flex-row mt-7">
            <h2 className=" text-xl font-bold font-content">Subtotal</h2>
            <h2 className="ml-6 text-xl font-semibold">₹{subTotal}</h2>
          </div>
          <div className="flex flex-col">
            <button
              onClick={() => navigate("/booking")}
              className="bg-primecolor hover:opacity-60  items-center text-orange-100 px-4 py-2 rounded mt-4 cursor-pointer"
            >
              Checkout
            </button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default WishlistOffCanvas;

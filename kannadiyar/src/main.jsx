import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createHashRouter } from "react-router-dom";
import "./index.css";

// Import pages/components
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Reviews from "./pages/Reviews";
import ProductViewPage from "./pages/ProductViewPage";
import MyAccount from "./pages/MyAccount";
import Wishlist from "./pages/Wishlist";
import MyOrders from "./pages/MyOrders";
import MyAddress from "./pages/MyAddress";
import SignUp from "./pages/SignUp";
import OrderBooking from "./pages/OrderBooking";
import ResultPage from "./pages/ResultPage";
import CategoryResult from "./pages/CategoryResult";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";
import ForgetPassword from "./components/ForgetPassword";
import Test from "./components/Test";
import ErrorPage from "./pages/ErrorPage";

// Define routes
const router = createHashRouter([
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/Products",
    element: <Products />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/reviews",
    element: <Reviews />,
  },
  {
    path: "/productpage/:prodId",
    element: <ProductViewPage />,
  },
  {
    path: "/myaccount",
    element: <MyAccount />,
  },
  {
    path: "/address",
    element: <MyAddress />,
  },
  {
    path: "/order",
    element: <MyOrders />,
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
  },
  {
    path: "/:custId",
    element: <Home />,
  },

  {
    path: "/",
    to: "/0",
    element: <Home />,
  },
  {
    path: "/booking",
    element: <OrderBooking />,
  },
  {
    path: "/result",
    element: <ResultPage />,
  },
  {
    path: "/categoryresult/:category/:subCategory",
    element: <CategoryResult />,
  },
  {
    path: "/success",
    element: <Success />,
  },
  {
    path: "/cancel",
    element: <Cancel />,
  },
  {
    path: "/FGP",
    element: <ForgetPassword />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

// Render the application
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

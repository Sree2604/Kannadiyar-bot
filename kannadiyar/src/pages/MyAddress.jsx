import React from "react";
import Topnavbar from "../components/Topnavbar";
import Footer from "../components/Footer";
import Myaddress from "../components/Myaddress";
import AccountList from "../components/AccountList";
import Topofferbar from "../components/Topofferbar";
import GreenThing from "../components/GreenThing";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


function MyAddress() {
  const token = sessionStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      alert("Unauthorized access");
      navigate("/");
    }
  }, []);
  return (
    <>
      <Topofferbar />
      <Topnavbar />

      {/* <div className=" sm:h-8 sm:w-full bg-primecolor mt-4 rounded-lg ml-2 md:h-8 md:w-full md:rounded-lg md:bg-primecolor lg:h-48 lg:w-9/12 lg:mt-7 lg:ml-48  lg:rounded-lg">
        <h1 className="sm: ml-2 text-2xl  sm: text-white md:text-white lg:text-4xl lg:ml-2 lg:mt-7 lg:px-10 lg:py-20 lg:text-white">MyAddress</h1>
      </div> */}
      <GreenThing header={"MyAddress"} />
      <div className=" sm:mt-4 ml-2  lg:flex lg:flex-row">
        <div className=" lg:flex lg:flex-col lg:ml-48 lg:mt-14">
          <AccountList />
        </div>
        <div className=" lg:flex lg:flex-col lg:ml-9 lg:mt-16 lg:w-1/2">
          <Myaddress />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default MyAddress;

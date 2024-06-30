import React, { useEffect } from "react";
import Topnavbar from "../components/Topnavbar";
import Footer from "../components/Footer";
import Contactbox from "../components/Contactbox";

function Contact() {
  return (
    <>
      <Topnavbar />
      <div className="sm: flex sm: flex-col font-content text-primecolor md:flex md:flex-row lg:flex lg:flex-row lg:ml-96 ml-12">
        <div className="sm: w-12 md:ml-8  lg:flex lg:flex-col lg:w-96 lg:ml-28">
          <div className=" sm: mt-4 sm: bg-orange-100 sm: p-4 sm: w-[300px] sm: ml-3 sm: rounded-lg sm: shadow-sm lg:mt-4   lg:p-4 lg:rounded-md lg:w-96 lg:h-[32rem]">
            <div className="flex flex-row text-2xl px-1 justify-center">
              <ion-icon name="call-outline"></ion-icon>
              <h1 className="text-semibold text-xl ml-2">Customer Support</h1>
            </div>
            <p className="text-normal justify-center text-xl mt-4">
              Available from 10 am - 6 pm IST, (Mon-Sat.)
            </p>
            <div className="flex flex-row text-xl pt-4 text-green-400">
              <div className="mt-2 text-2xl">
                <ion-icon name="logo-whatsapp"></ion-icon>
              </div>
              <h1 className="text-semibold text-xl ml-2 pt-2">Whatsapp Only</h1>
            </div>
            <h3 className="text-black font-content text-l p-2 px-4">
              +91 709 210 7272
            </h3>
            <hr></hr>
            <div className="flex flex-row text-xl p-2">
              <div className="mt-2 text-2xl ">
                {" "}
                <ion-icon name="mail-unread-outline"></ion-icon>{" "}
              </div>
              <h1 className="text-semibold text-xl ml-2 pt-2 font-semibold">
                Write to Us
              </h1>
            </div>
            <p className="text-semibold text-xl px-4">
              198/262, East Masi Street, Madurai - 625 001, Tamil Nadu.
            </p>
            <div className="flex flex-row">
              <h1 className="text-semibold text-xl ml-2 pt-4">
                Customer Support
              </h1>
            </div>
            <a
              href="mailto:support@kannadiyar.com"
              className="text-normal text-xl ml-2 pt-2"
            >
              support@kannadiyar.com
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Contact;

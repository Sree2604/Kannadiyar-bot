import React, { useEffect } from "react";
import Topnavbar from "../components/Topnavbar";
import Footer from "../components/Footer";
import Share from "../components/Share";
import Topofferbar from "../components/Topofferbar";
import Halmark from "../components/Halmark";


function Contact() {
  return (
    <>
    <Topofferbar/>
      <Topnavbar />
      <div className="flex lg:flex-row flex-col">
      <section className="text-primecolor body-font relative">
      <form action="mailto:support@kannadiyar.com">
        <div className="container lg:px-5 py-4 lg:py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-primecolor">
              Contact Us
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Whatever your issues bing with us
              .
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
          
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                 
                  <label for="name" className="leading-7 text-sm text-primecolor">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    name="name"
                    className="w-full bg-orange-50 rounded border border-gray-300 focus:border-primecolor text-base outline-none text-primecolor py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    for="email"
                    className="leading-7 text-sm text-primecolor"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-orange-50 rounded border border-gray-300 focus:border-primecolor text-base outline-none text-primecolor py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    for="message"
                    className="leading-7 text-sm text-primecolor"
                  >
                    Message
                  </label>
                  <textarea
                  required
                    id="message"
                    name="message"
                    className="w-full bg-orange-50 rounded border border-gray-300 focus:border-primecolor h-32 text-base outline-none text-primecolor py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <input type="submit" value="Submit" className="flex mx-auto text-primecolor bg-orange-100 border-0 py-2 px-8 focus:outline-none hover:bg-primecolor hover:text-orange-100 rounded text-lg"
                />
              </div>
              
              </div>
              
            </div>
          </div>
          </form>
      </section>
    
      <div className="sm: flex sm: flex-col font-content text-primecolor md:flex md:flex-row lg:flex lg:flex-row lg:py-16 ml-12">
        <div className="sm: w-12  lg:flex lg:flex-col lg:w-96 ">
          <div className=" sm: mt- sm: bg-orange-100 sm: p-4 sm: w-[300px] sm: ml-3 sm: rounded-lg sm: shadow-sm   lg:p-4 lg:rounded-md lg:w-96 lg:h-[24rem]">
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
      </div>
      <Halmark/>
      <Footer />
      <Share/>
    </>
  );
}

export default Contact;

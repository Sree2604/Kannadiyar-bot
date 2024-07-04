import React from "react";
import Topnavbar from "../components/Topnavbar";
import Topofferbar from "../components/Topofferbar";
import Footer from "../components/Footer";
import Halmark from "../components/Halmark";
import GreenThing from "../components/GreenThing";
import Share from "../components/Share";

function About() {
  return (
    <>
      <Topofferbar />
      <Topnavbar />
      {/* <div className="sm: border-2 sm:w-fit border-1 sm: bg-green-200 sm: mt-3 sm: font-content lg:bg-green-200 md:mt-2 lg:h-48 lg:w-9/12 lg:ml-48 lg:mt-7 rounded-lg">
      <h1 className="sm: ml-2  lg:text-4xl lg:ml-8  lg:mt-16">About Us</h1>
    </div> */}
      <GreenThing header={"About Us"} />
      <div className=" sm: ml-2 sm: mr-2 lg:flex lg:flex-row p-4">
        <div className="lg:flex lg:flex-col">
          <h1 className="sm: font-content sm: mt-3 sm: text-xl sm: font-semibold lg:mt-10 lg:font-bold lg:text-2xl lg:ml-32">
            About our Store
          </h1>
          <h2 className=" sm: mt-3 lg:mt-5 font-content lg:text-justify lg:ml-32 lg:w-8/12 lg:leading-loose">
            Kannadiyar Nattumarunthu Kadai takes pride in reviving some of the
            ancient Siddha formulations under the brand name of Kannadiyar. For
            more than three generations, the company has been actively engaged
            in manufacturing and selling of quality Siddha and Ayurveda
            products. <br />
            <br />
            We have our own processing, manufacturing and packing units equiped
            with latest machineries and highly qualified staffs. The medicines
            in our units are prepared in a clean and hygiene environment by
            adopting highest quality measures, so that our customers always get
            quality products in the best possible lowest price. All products are
            eco-friendly and chemical free. Our passion lies in the supply of
            products that have customer delight as a top priority.
          </h2>
        </div>

        <img
          src="src/assets/ab-i4 1.png"
          className="flex  flex-col ml-14  mt-4 w-60 h-60 rounded-lg lg:w-64 lg:mr-14 lg:h-130 lg:mt-7 lg:rounded-bl-3xl lg:rounded-tr-3xl"
          alt=""
        />

        <img
          src="src/assets/ab-i3 1.png"
          className="w-60 h-60 sm: mt-3 ml-14 lg:ml-0 rounded-lg lg:w-64 lg:h-130 lg:mt-7 lg:mr-14 lg:rounded-tl-3xl lg:rounded-br-3xl"
          alt=""
        />
      </div>
      <div className="  lg:bg-slate-100 lg:mt-5 lg:pb-5">
        <img
          className="sm:ml-20 sm: mt-3 md:ml-72 lg:pt-2 lg:w-32 lg:h-32 lg:ml-[700px] ml-[150px]"
          src="src/assets/trust.png"
          alt=""
        />
        <h1 className="sm:ml-4 md:ml-56 lg:pt-2 font-content lg:ml-[630px] font-semibold ml-[70px] mt-2">
          Discover the Power of Nature with our
        </h1>
        <h1 className="sm:ml-24 md:ml-80 lg:pt-2 lg:ml-[700px] font-content font-semibold ml-[150px]">
          Herbal Products
        </h1>

        <div className=" sm: flex sm: flex-col lg:flex lg:flex-row lg:ml-60 lg:mt-5 p-4">
          <div className="sm: flex sm: flex-col sm: bg-gray-200 sm: ml-2 sm: mr-2 sm: mt-2 sm: rounded-md sm: shadow-md lg:flex lg:flex-col lg:mr-28 lg:bg-white lg:w-1/3 lg:h-96 lg:rounded-md lg:shadow-md">
            <h2 className=" font-semibold text-2xl p-4 font-content text-primecolor">
              Our Aim
            </h2>
            <p className=" px-5 pb-2 text-justify font-content">
              * To provide a complete nutritional solution to all Humans beings.
            </p>
            <p className=" px-5 pb-2 text-justify font-content">
              * To educate the society, by bringing back, the natural way of
              living, with the help of natural herbs.
            </p>
            <p className=" px-5 pb-2 text-justify font-content">
              * To extend the old and traditional herbal values to the current
              and fore coming generations.
            </p>
            <p className=" px-5 pb-2 text-justify font-content">
              * To develop green farms in large numbers and increase
              agricultural productivity.
            </p>
          </div>
          <div className="sm: flex sm: flex-col sm: mt-3 sm: bg-gray-200 sm: ml-2 sm: mr-2 sm: rounded-md sm: shadow-md  lg:flex lg:flex-col lg:ml-40 lg:bg-white lg:w-1/3 lg:h-96 lg:rounded-md lg:shadow-md ">
            <h2 className="font-semibold font-content text-2xl p-4 text-primecolor">
              Our Strength
            </h2>
            <p className=" px-5 pb-2 text-justify font-content">
              * To provide a complete nutritional solution to all Humans beings.
            </p>
            <p className=" px-5 pb-2 text-justify font-content">
              * To educate the society, by bringing back, the natural way of
              living, with the help of natural herbs.
            </p>
            <p className=" px-5 pb-2 text-justify font-content">
              * To extend the old and traditional herbal values to the current
              and fore coming generations.
            </p>
            <p className=" px-5 pb-2 text-justify font-content">
              * To develop green farms in large numbers and increase
              agricultural productivity.
            </p>
          </div>
        </div>
      </div>
      <div className="lg:flex lg:flex-row lg:ml-16">
        <img
          src="src/assets/ab-i1 1.png"
          className="sm: mt-3 h-60 w-60  sm:w-11/12 ml-16 rounded-lg lg:w-64 lg:ml-14 lg:h-130 lg:mt-7 lg:rounded-bl-3xl lg:rounded-tr-3xl"
          alt=""
        />

        <img
          src="src/assets/ab-i2 1.png"
          className=" sm: mt-3 h-60 w-60 rounded-lg ml-16 lg:w-64 lg:h-130 lg:mt-7 lg:ml-14 lg:rounded-tl-3xl lg:rounded-br-3xl"
          alt=""
        />
        <div className="sm: mt-3 lg:flex lg:flex-col p-4">
          <h1 className="sm: ml-1 sm: font-content sm: font-semibold -mt-2  lg:font-bold lg:text-2xl lg:ml-32">
            About Siddha Medicine
          </h1>
          <h2 className="sm: font-content sm: ml-1 sm: mt-3  g:mt-5 mb-20 lg:text-justify lg:ml-32 lg:w-8/12 lg:leading-loose">
            Siddha Medicine (Tamil Citta or Tamil-maruttuvam) is a system of
            traditional medicine originated in Tamil Nadu, South India.
            According to experts, there are 18 principal Siddhars who founded
            the Siddha system of medicine. Agastya is considered the first
            siddha and the guru of all siddhars. The siddha system is believed
            to have been handed over to him by Lord Murugan, son of Lord Shiva
            and Goddess Parvati. <br />
            <br />
            Principles of the Siddha medicine are very similar to Ayurveda; both
            of them say that, all living and non-living things in this universe
            are made up of a combination of pancha bhoothas. Among these
            traditional and natural medicines SIDDHA and AYURVEDA plays dominant
            role and these are glorious gifts for mankind rewarded by the MOTHER
            NATURE. Siddha formulations make extensive use of herbs, minerals
            and metals in their non toxic forms.
          </h2>
        </div>
      </div>
      <Halmark />
      <Footer />
      <Share/>
    </>
  );
}

export default About;

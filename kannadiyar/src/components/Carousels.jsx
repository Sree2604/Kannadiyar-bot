import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import photo1 from "../assets/carousel1.jpg";
import photo2 from "../assets/poster1.jpg";
import photo3 from "../assets/poster2.jpg";
import photo4 from "../assets/carousel2.jpg";
import photo5 from "../assets/carousel3.jpg";
// import { Carousel, initTWE } from "tw-elements";
// initTWE({ Carousel });
import Carousel from "react-bootstrap/Carousel";

const Carousels = () => {
  const [posters1, setPosters1] = useState([]);
  const [posters2, setPosters2] = useState({});
  const [posters3, setPosters3] = useState({});
  const navigate = useNavigate();

  const [currentIndex, setCurrentIndex] = useState(0);
  const baseurl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % posters1.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [posters1]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(`${baseurl}getCarousel`);
        const data1 = await response1.json();

        const response2 = await fetch(`${baseurl}getPoster`);
        const data2 = await response2.json();

        // Assuming data1 and data2 are arrays with appropriate structures
        setPosters1(data1);
        setPosters2(data2[0]); // Assuming data1 has at least one item
        setPosters3(data2[1]); // Assuming data2 has at least one item
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex sm:ml-4">
      {/* Carousel on the left */}
      <div className="sm:mt-2  sm:w-1/2 w-screen md:mt-10 lg:mt-2  lg:w-2/3 lg:overflow-hidden-carousel">
        {/* <img
          className="lg:w-full w-full sm:w-20 h-64 sm:h-10 lg:h-[526px]  transition-transform duration-300 transform rounded-md"
          src={photo1}
          alt={`Poster-1`}
          onClick={() =>
            navigate(`/Productpage/${posters1[currentIndex]?.pid}`)
          }
        /> */}
        <Carousel>
          <Carousel.Item>
            <img src={photo1} text="First slide" />
            <Carousel.Caption>
              <h3>First slide label</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={photo4} text="Second slide" />
            <Carousel.Caption>
              <h3>Second slide label</h3>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src={photo5} text="Third slide" />
            <Carousel.Caption>
              <h3>Third slide label</h3>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      {/* Posters on the right */}
      {/* <div className="">
      <div className="hidden lg:grid"> */}
      <div className="sm:ml-4 hidden lg:block lg:w-1/3 lg:p-4 lg:-mt-2">
        <div className="sm:w-16 sm:ml-2 md:ml-6 md:w-48 lg:w-full lg:mb-4">
          <img
            className="w-full mb-2 rounded-md h-32 lg:h-[17rem]"
            src={photo2}
            alt={`Poster 2`}
            onClick={() => navigate(`/Productpage/${posters2.pid}`)}
          />
        </div>
        <div className="sm:w-16 sm:ml-2 md:ml-6 md:w-48 lg:w-full lg:mb-4">
          <img
            className="lg:w-full sm:w-16  rounded-md h-32 lg:h-[17rem]"
            src={photo3}
            alt={`Poster 3`}
            onClick={() => navigate(`/Productpage/${posters3.pid}`)}
          />
        </div>
      </div>
      {/* </div>
      </div> */}
    </div>
  );
};

export default Carousels;

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
    <div className="w-fit  flex ">
      <Carousel>
        <Carousel.Item>
          <img src={photo1} text="First slide" className="lg:h-[500px] lg:w-screen h-[284px] w-screen" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={photo2} text="Second slide" className="lg:h-[500px] lg:w-screen h-[284px] w-screen"/>
        </Carousel.Item>
        <Carousel.Item>
          <img src={photo3} text="Third slide" className="lg:h-[500px] lg:w-screen h-[284px] w-screen"/>
        </Carousel.Item>
        <Carousel.Item>
          <img src={photo4} text="Third slide" className="lg:h-[500px] lg:w-screen h-[284px] w-screen"/>
        </Carousel.Item>
        <Carousel.Item>
          <img src={photo5} text="Third slide" className="lg:h-[500px] lg:w-screen h-[284px] w-screen"/>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Carousels;

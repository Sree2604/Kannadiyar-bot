import { useState } from "react";
import NavBar from "../components/NavBar";

const AddCarousels = ({ addImages }) => {
  const [carouselImage1, setCarouselImage1] = useState();
  const [carouselImage2, setCarouselImage2] = useState();
  const [carouselImage3, setCarouselImage3] = useState();
  const [poster1, setPoster1] = useState();
  const [poster2, setPoster2] = useState();
  const [productName1, setProductName1] = useState();
  const [productName2, setProductName2] = useState();
  const [productName3, setProductName3] = useState();
  const [productName4, setProductName4] = useState();
  const [productName5, setProductName5] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    addImages({
      carouselImage1,
      carouselImage2,
      carouselImage3,
      poster1,
      poster2,
      productName1,
      productName2,
      productName3,
      productName4,
      productName5,
    });
  };
  return (
    <>
          <NavBar />
          <div className="flex justify-center">
          <h1 className="text-xl font-semibold font-content text-primecolor mt-2">Add your Banner here</h1>
          </div>
          <div className="flex justify-center mt-6">
          <div className="flex flex-col">
            <form onSubmit={handleSubmit} className=" bg-orange-100 p-7 rounded-lg">
            <div className="flex flex-row">
              <label className="text-l font-semibold font-content text-primecolor mt-3 mr-3" htmlFor="carousel1">Carousel 1</label>
               <br />
              <input
                type="file"
                className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4  bg-gray-50 font-content  focus:outline-brown"
                onChange={(e) => setCarouselImage1(e.target.files[0])}
                required
              />
              <br />
              <label className="text-l font-semibold font-content text-primecolor mt-3 ml-5 mr-3"  htmlFor="carouselProductName">Product Name</label>
              <br />
              <input
                type="text"
                value={productName1}
                className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4  bg-gray-50 font-content  focus:outline-brown"
                onChange={(e) => setProductName1(e.target.value)}
                required
              />
              <br />
            </div>
            <div className="flex flex-row">
        <label className="text-l font-semibold font-content text-primecolor mt-3 mr-3" htmlFor="carousel2">Carousel 2</label>
        <br />
        <input
          type="file"
          className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4  bg-gray-50 font-content  focus:outline-brown"
          onChange={(e) => setCarouselImage2(e.target.files[0])}
          required
        />
        <br />
        <label className="text-l font-semibold font-content text-primecolor mt-3 mr-3  ml-5" htmlFor="carouselProductName">Product Name</label>
        <br />
        <input
          type="text"
          value={productName2}
          className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4  bg-gray-50 font-content  focus:outline-brown"
          onChange={(e) => setProductName2(e.target.value)}
          required
        />
        <br />
        </div>
        <div className="flex flex-row">
        <label className="text-l font-semibold font-content text-primecolor mt-3 mr-3" htmlFor="carousel3">Carousel 3</label>
        <br />
        <input
          type="file"
          className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4  bg-gray-50 font-content  focus:outline-brown"
          onChange={(e) => setCarouselImage3(e.target.files[0])}
          required
        />
        <br />
        <label className="text-l font-semibold font-content text-primecolor mt-3 mr-3  ml-5" htmlFor="carouselProductName">Product Name</label>
        <br />
        <input
          type="text"
          className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4  bg-gray-50 font-content  focus:outline-brown"
          value={productName3}
          onChange={(e) => setProductName3(e.target.value)}
          required
        />
        <br />
        </div>
        <div className="flex flex-row">
        <label className="text-l font-semibold font-content text-primecolor mt-3 mr-3" htmlFor="poster1">Poster-1</label>
        <br />
        <input
          type="file"
          className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 ml-5  bg-gray-50 font-content  focus:outline-brown"
          onChange={(e) => setPoster1(e.target.files[0])}
          required
        />
        <br />
        <label className="text-l font-semibold font-content text-primecolor mt-3 mr-3  ml-5" htmlFor="carouselProductName">Product Name</label>
        <br />
        <input
          type="text"
          value={productName4}
          className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 bg-gray-50 font-content  focus:outline-brown"
          onChange={(e) => setProductName4(e.target.value)}
          required
        />
        <br />
        </div>
        <div className="flex flex-row">
        <label className="text-l font-semibold font-content text-primecolor mt-3 mr-3" htmlFor="poster2">Poster-2</label>
        <br />
        <input
          type="file"
          className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4 ml-5 bg-gray-50 font-content  focus:outline-brown"
          onChange={(e) => setPoster2(e.target.files[0])}
          required
        />
        <br />
        <label className="text-l font-semibold font-content text-primecolor mt-3 mr-3 ml-5" htmlFor="carouselProductName">Product Name</label>
        <br />
        <input
          type="text"
          className="w-96 shadow-md rounded py-2 px-3 mt-1 mb-4  bg-gray-50 font-content  focus:outline-brown"
          value={productName5}
          onChange={(e) => setProductName5(e.target.value)}
          required
        />
        <br />
        </div>
        <div className="flex justify-center">
        <input type="submit" className="w-1/2 shadow-md rounded py-2 px-3 mt-3 text-primecolor bg-gray-50 font-content focus:outline-brown hover:bg-primecolor hover:text-white" value="submit" />
        </div>
      </form>
      </div>
      </div>
    </>
  );
};
export default AddCarousels;
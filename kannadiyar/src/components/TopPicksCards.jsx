import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";

function TopPicksCards({ product }) {
  const custId = sessionStorage.getItem("custId");
  const [randomProducts, setRandomProducts] = useState([]);
  const baseurl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    if (product && product.length > 0) {
      const shuffledProducts = product.sort(() => Math.random() - 0.5);
      const selectedProducts = shuffledProducts.slice(0, 4);
      setRandomProducts(selectedProducts);
    }
  }, [product]);

  return (
    <>
      <h1 className="font-content  sm: ml-5 mb-3 lg:mt-6 mt-6 lg:text-2xl text-xl lg:font-semibold lg:ml-44 text-primecolor">
        Our Top Picks
      </h1>
      <div className="sm:flex sm:flex-col sm:mt-3 grid grid-col-2 font-content lg:grid lg:grid-cols-4 gap-6 lg:gap-2 justify-around lg:ml-24">
        {product && product.length === 0 ? (
          <p className="text-gray-500">Select any category of Products...</p>
        ) : (
          randomProducts.map((val, index) => (
            <Card
              key={index}
              className="sm:mt-3 sm:ml-5 sm:mr-5  lg:m-auto lg:w-52 bg-orange-100 lg:ml-2 lg:-mr-2 cursor-pointer"
              onClick={() =>
                (window.location.href = `/Productpage/${val.id}`)
              }
            >
              <div className="lg:flex-col flex">
                <div>
                  <Card.Img
                    className="p-2 h-36 w-36 lg:ml-7 ml-0"
                    variant="top"
                    src={`${baseurl}uploads/${val.image}`}
                    onClick={() =>
                      (window.location.href = `/Productpage/${val.id}`)
                    }
                  />
                </div>
                <div className="mt-8 lg:mt-0">
                  <Card.Text className="font-semibold pb-2 lg:text-center font-content">
                    {val.product_name}
                  </Card.Text>
                  <Card.Text className="font-semibold text-red-700 lg:text-center font-content">
                    ₹{val.mrp}
                  </Card.Text>
                  
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </>
  );
}

export default TopPicksCards;

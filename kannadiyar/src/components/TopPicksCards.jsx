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
      <h1 className="sm:ml-4 sm:font-content sm:mt-4 lg:mt-5 lg:text-2xl lg:font-semibold text-primecolor lg:ml-44">
        Our Top Picks
      </h1>
      <div className="lg:flex lg:flex-row lg:mt-3 lg:space-x-24 lg:justify-center p-4">
        {product && product.length === 0 ? (
          <p className="text-gray-500">Select any category of Products...</p>
        ) : (
          randomProducts.map((val, index) => (
            <Card
              key={index}
              className="sm:mt-3 sm:ml-5 sm:mr-5 sm:bg-red-100 lg:m-auto lg:w-80 lg:bg-red-100 lg:ml-2 lg:-mr-2"
            >
              <div className="flex">
                <div>
                  <Card.Img
                    className="p-2 h-36 w-36"
                    variant="top"
                    src={`${baseurl}uploads/${val.image}`}
                  />
                </div>
                <div className="mt-6">
                  <Card.Text className="font-semibold pb-2">
                    {val.product_name}
                  </Card.Text>
                  <Card.Text className="font-semibold text-red-700">
                    ₹{val.mrp}
                  </Card.Text>
                  <div className="mt-2 pr-3">
                    <Button
                      variant="danger"
                      className="text-orange-100 bg-primecolor py-2 w-36 font-content flex"
                      onClick={() =>
                        (window.location.href = `/Productpage/${val.id}`)
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-4"
                        viewBox="0 0 512 512"
                      >
                        <path
                          d="M80 176a16 16 0 00-16 16v216c0 30.24 25.76 56 56 56h272c30.24 0 56-24.51 56-54.75V192a16 16 0 00-16-16zM160 176v-32a96 96 0 0196-96h0a96 96 0 0196 96v32"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="32"
                        />
                        <path
                          d="M160 224v16a96 96 0 0096 96h0a96 96 0 0096-96v-16"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="32"
                        />
                      </svg>
                      <span className="text-sm text-center text-orange-100">
                        View Product
                      </span>
                    </Button>
                  </div>
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

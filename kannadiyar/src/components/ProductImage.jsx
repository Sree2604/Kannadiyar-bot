import { useEffect, useState } from "react";
// import pic1 from "../assets/wp9212184-agriculture-4k-wallpapers.jpg";
// import pic2 from "../assets/wp9212018-agriculture-4k-wallpapers.jpg";
// import pic3 from "../assets/wp9212018-agriculture-4k-wallpapers.jpg";

function ProductImage({ productData }) {
  const baseurl = import.meta.env.VITE_API_URL;
  const [largeImg, setImage] = useState();
  useEffect(() => {
    productData.map((product) =>
      setImage(`${baseurl}uploads/${product.image}`)
    );
  }, [productData]);

  return (
    <>
      {productData.map((product) => (
        <div className="sm: mt-3 shadow-md border-stone-200 bg-gray-200 lg:h-[580px] lg:w-6/12 lg:ml-10 lg:mt-5 rounded-lg">
          <div className="lg:flex lg:flex-row">
            {/* <div className="lg:flex lg:flex-col space-y-10 lg:mt-10 lg:ml-8 ">
                            {product.images.map((img) => (<img className="w h-24 border border-solid cursor-pointer" src={`http://localhost:4000/uploads/${img}`} onClick={() => setImage(`http://localhost:4000/uploads/${img}`)} alt="" />))} */}

            {/* <img className="w-24 h-24 cursor-pointer" src={pic2} onClick={()=>setImage(pic2)} alt="" /> */}
            {/* <img className="w-24 h-24" src= alt="" /> */}
            {/* </div>  */}
            <div className="lg:h-[460px] lg:w-[460px] self-center bg-gray-500 lg:ml-28 lg:mt-12">
              <img className="lg:h-[460px]" src={largeImg} alt="" />
            </div>
            <div className=" borer-1 border-black sm: grid sm: grid-cols-4 gap-2 sm: mt-7  md:grid md:grid-cols-4 md:ml-8 lg:flex lg:flex-col lg:flex-wrap lg:ml-7 lg:gap-4 lg:mt-12">
              {product.images.map((img) => (
                <img
                  className="w-[100px] h-24 border border-solid cursor-pointer"
                  src={`${baseurl}uploads/${img}`}
                  onClick={() => setImage(`${baseurl}uploads/${img}`)}
                  alt=""
                />
              ))}

              {/* <img className="w-24 h-24 cursor-pointer" src={pic2} onClick={()=>setImage(pic2)} alt="" /> */}
              {/* <img className="w-24 h-24" src= alt="" /> */}
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default ProductImage;

import { useEffect } from "react";
import Topnavbar from "../components/Topnavbar";
import Topofferbar from "../components/Topofferbar";
import Slider from "../components/Slider";
import AccountList from "../components/AccountList";
import GreenThing from "../components/GreenThing";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Orderitem from "../components/OrderItems";

function MyOrders() {
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
      {/* <div className=" border-1 bg-green-200 md:mt-2 h-48 w-9/12 lg:ml-48 lg:mt-7 rounded-lg">
        <h1 className=" lg:text-4xl lg:ml-8 lg:mt-16">My Account</h1>
      </div> */}
      <GreenThing header={"My Orders"} />
      <div className="lg:flex lg:flex-row">
        <div className="lg:flex lg:flex-col lg:ml-48 lg:mt-14">
          <AccountList />
        </div>
        <div className="sm: mt-3 sm: ml-2 sm: mr-2 sm: font-content lg:font-content lg:w-2/4 lg:mt-5 lg:ml-16">
         <Orderitem/>
         
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default MyOrders;

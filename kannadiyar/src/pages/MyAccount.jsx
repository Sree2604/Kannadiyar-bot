import AccountList from "../components/AccountList";
import Topnavbar from "../components/Topnavbar";
import Topofferbar from "../components/Topofferbar";
import Forms from "../components/Forms";
import Footer from "../components/Footer";
import GreenThing from "../components/GreenThing";
import { useEffect, useState } from "react";
import Share from "../components/Share";
import Halmark from "../components/Halmark";

function MyAccount() {
  const baseurl = import.meta.env.VITE_API_URL;
  const [customerDetails, setCustomerDetails] = useState([]);
  const [isGuestMode, setIsGuestMode] = useState(false);
  useEffect(() => {
    const custId = sessionStorage.getItem("custId");
    const setDetails = async () => {
      if (custId === "0" || custId === null) {
        setIsGuestMode(true);
      } else {
        const customer = await fetchCustomer(custId);
        setCustomerDetails(customer);
      }
    };
    setDetails();
  }, []);

  const fetchCustomer = async (custId) => {
    const res = await fetch(`${baseurl}customer/${custId}`);
    const data = await res.json();
    return data;
  };

  if (isGuestMode) {
    return (
      <>
        <Topofferbar />
        <Topnavbar />
        <GreenThing header={"My Account"} />
        <h1 className="text-xl font-content text-center lg:mt-6">
          You are in guest mode
        </h1>
      </>
    );
  }

  return (
    <>
      <Topofferbar />
      <Topnavbar />
      {/* <div className=" border-1 bg-green-200 md:mt-2 h-48 w-9/12 lg:ml-48 lg:mt-7 rounded-lg">
        <h1 className=" lg:text-4xl lg:ml-8 lg:mt-16">My Account</h1>
      </div> */}
      <GreenThing header={"My Account"} />
      <div className="sm:mt-4 ml-2  lg:flex lg:flex-row">
        <div className="lg:flex lg:flex-col  lg:ml-48 lg:mt-14">
          <AccountList />
        </div>
        <div className="sm: mt-4 sm: ml-1 sm: mr-2 sm: mb-2 lg:flex lg:flex-col  lg:ml-9 lg:mt-16">
          <Forms customer={customerDetails} />
        </div>
      </div>
<Halmark/>
      <Footer />
      <Share/>
    </>
  );
}

export default MyAccount;

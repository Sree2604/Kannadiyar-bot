import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo2 from "../assets/logo2.png";

const SignUp = () => {
  const [state, setState] = useState("Login");
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const [Sectques, setSectques] = useState("");
  const [Sectans, setSectans] = useState("");
  const baseurl = import.meta.env.VITE_API_URL;
  // console.log(baseurl);

  const handleLogin = async (e) => {
    e.preventDefault();
    const req = await fetch(
      `${baseurl}customerLogin/?email=${email}&password=${passWord}`
    );
    const data = await req.json();
    if (req.ok) {
      const res = await fetch(`${baseurl}token`);
      if (res.ok) {
        const { token } = await res.json();
        sessionStorage.setItem("token", token);
        console.log("Login successful...");
        const custId = data.cust_id;
        navigate(`/${custId}`);
      } else {
        toast.error(data.message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } else {
      toast.error(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleGuest = () => {
    const guestId = 0;
    navigate(`/${guestId}`);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const req = await fetch(`${baseurl}registerCustomer`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        passWord,
        Sectques,
        Sectans,
        phone,
      }),
    });
    if (req.status == 409) {
      toast.error("Email Already Exists", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      setEmail("");
      setFirstName("");
      setLastName("");
      setPhone("");
      setPassWord("");
      setSectques("");
      setSectans("");
      window.location.reload();
    }
  };

  return (
    <>
      <ToastContainer />
      <div className=" max-w-[400px] w-full mx-auto mt-32 items-center justify-center bg-orange-100">
        <div className="bg-orange-100 font-content p-6 rounded-lg shadow-lg">
          <div className="flex justify-center items-center">
            {" "}
            <img src={logo2} alt="kannadiyar-logo" className="w-16" />{" "}
          </div>
          <div className="flex flex-col  items-center py-4 space-y-4">
            <div className="flex">
              <button
                onClick={() => setState("Login")}
                className={`${
                  state === "Login"
                    ? " bg-primecolor text-white"
                    : "bg-gray-200 text-gray-400"
                } px-4 py-2 rounded-l cursor-pointer`}
              >
                Login
              </button>
              <button
                onClick={() => setState("Register")}
                className={`${
                  state === "Register"
                    ? "bg-primecolor text-white"
                    : "bg-gray-200 text-gray-400"
                } px-4 py-2 rounded-r cursor-pointer`}
              >
                Register
              </button>
            </div>
            {state === "Login" && (
              <>
                <form className=" mt-4" onSubmit={handleLogin}>
                  <input
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border w-full rounded-md p-2"
                  />
                  <br></br>
                  <input
                    type="password"
                    value={passWord}
                    onChange={(e) => setPassWord(e.target.value)}
                    placeholder="Enter the password"
                    className="border w-full rounded-md p-2 mt-2"
                  />
                  <br />
                  <div className="flex justify-center">
                    <input
                      type="submit"
                      className="bg-primecolor items-center text-orange-100 hover:opacity-80 px-4 py-2 rounded mt-4 cursor-pointer"
                    />
                    <button
                      className="bg-primecolor items-center text-orange-100 hover:opacity-80  px-2 py-2 ml-4 rounded mt-4 cursor-pointer"
                      onClick={handleGuest}
                    >
                      Guest User
                    </button>
                  </div>
                </form>
                <a className=" text-blue-600 underline text-sm" href="/FGP">
                  Forget Password
                </a>
              </>
            )}
            {state === "Register" && (
              <form className="mt-4" onSubmit={handleRegister}>
                <input
                  type="text"
                  placeholder="Enter first Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="border rounded-md p-2"
                />
                <br />
                <input
                  type="text"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="border rounded-md p-2 mt-2"
                />
                <br />
                <input
                  type="text"
                  placeholder="Your mobile number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border rounded-md p-2 mt-2"
                />
                <br />
                <input
                  type="password"
                  value={passWord}
                  onChange={(e) => setPassWord(e.target.value)}
                  placeholder="Enter the password"
                  className="border rounded-md p-2 mt-2"
                />
                <br />
                <input
                  type="Email"
                  placeholder="Enter the Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border rounded-md p-2 mt-2"
                />
                <br />
                <input
                  type="Secret Question"
                  placeholder="Enter the Secret Question"
                  value={Sectques}
                  onChange={(e) => setSectques(e.target.value)}
                  className="border rounded-md p-2 mt-2"
                />
                <br />
                <input
                  type="Secret Answer"
                  placeholder="Enter the Secret Answer"
                  value={Sectans}
                  onChange={(e) => setSectans(e.target.value)}
                  className="border rounded-md p-2 mt-2"
                />
                <br />
                <div className="flex justify-center">
                  <input
                    type="submit"
                    className="bg-primecolor items-center text-orange-100 hover:opacity-80  px-4 py-2 rounded mt-4 cursor-pointer"
                  />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;

// function Login() {
//         const [action, setAction] = useState("login");
//     return (
//     <>
//         {/* <div className=" ">
//                 <form className='max-w-[400px] w-full mx-auto bg-white'>
//                 <div className="flex justify-center items-center">
//                 <img src="src/assets/logo.png" alt="kannadiyar-logo" className="w-32 h-20" />
//                 </div>
//                     <h2 className='text-4xl font-bold text-center py-6'>{action}</h2>
//                     {action==="Register"?<div></div>:<div className='flex flex-col py-2 px-2'>
//                         <label>User Name</label>
//                         <input className='border p-2' type="text" />
//                 </div>}
//                     <div className='flex flex-col py-2 px-2'>
//                         <label>Mobile number</label>
//                         <label className='text-end text-green-500'>Send OTP</label>
//                         <input className='border p-2' type="text" />
//                     </div>
//                     <div className='flex flex-col py-2 px-2'>
//                         <label>Enter OTP</label>
//                         <input className='border p-2' type="text" />
//                     </div>
//                     {action==="Register" ? <div></div>:<div className='flex flex-col py-2 px-2'>
//                         <label>Email Address</label>
//                         <input className='border p-2' type="text" />
//                     </div>}
//                     <div className=" px-6">
//                         <div className={action === "Login" ? "submit" : "submit"} onClick={() => { setAction("Login") }}><button className='border w-full my-5 py-2 bg-green-600 hover:bg-green-300 text-white'>Login</button></div>
//                         <div className={action === "Register" ? "submit" : "submit"} onClick={() => { setAction("Register") }}><button className='border w-full my-5 py-2 bg-green-600 hover:bg-green-300 text-white'>Register</button></div>
//                     </div>
//                 </form>
//             </div> */}

//     </>
//     )
// }
// export default Login;

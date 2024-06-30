import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userName, setUsername] = useState("");
  const [passWord, setPassword] = useState("");
  const navigate = useNavigate();

  const userRef = useRef();
  const errRef = useRef();

  const baseUrl = import.meta.env.VITE_API;

  const handleSubmission = async (e) => {
    e.preventDefault();
    const req = await fetch(`${baseUrl}login/${userName}`);
    const data = await req.json();
    console.log(data);
    if (data[0]) {
      const tablePassword = data[0].password;
      console.log(`${tablePassword},${passWord}`);
      if (tablePassword == passWord) {
        const res = await fetch(`${baseUrl}token`);
        if (res.ok) {
          const { token } = await res.json();
          sessionStorage.setItem("token", token);
          console.log("Login successful...");
          navigate("/home");
        } else {
          console.log("Response failed....");
        }
      } else {
        alert("Login failed....!!");
      }
    } else {
      alert("User doesn't exist...");
    }
  };

  return (
    <>
      <div className="flex mt-44 ml-4 justify-center">
        <form onSubmit={handleSubmission}>
          <div className="w-full p-8 shadow-xl max-w-prose bg-orange-100">
            <div className="flex justify-center">
              <img
                className="w-28 h-18"
                src="/src/assets/logo.png"
                alt="logo"
              />
            </div>
            <div className=" p-8">
              <label className="text-xl font-semibold font-content text-primecolor">
                Username
              </label>
              <input
                type="text"
                className="w-full shadow-md  rounded py-2 px-3 mt-1 mb-4 bg-gray-50 font-content focus:outline-primecolor"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
              />
              <label className="text-xl font-semibold font-content text-primecolor">
                Password
              </label>
              <input
                type="password"
                className="w-full shadow-md rounded py-2 px-3 mt-1 mb-4 bg-gray-50 font-content focus:outline-primecolor"
                value={passWord}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin@123"
              />
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="w-1/2 shadow-md rounded p-3 mt-2 bg-gray-50 font-content text-xl text-primecolor focus:outline-none hover:text-orange-100 hover:bg-primecolor"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;

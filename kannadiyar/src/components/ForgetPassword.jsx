import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [secretQuestion, setSecretQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState(null);
  const [passWord, setPassWord] = useState("");
  const baseurl = import.meta.env.VITE_API_URL;

  const fetchSecretQuestion = async () => {
    try {
      const response = await fetch(`${baseurl}fetchSecret/?email=${email}`);
      if (!response.ok) {
        // throw new Error("Failed to fetch");
        toast.error("User doesn't exist !", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
      const data = await response.json();
      console.log(data);
      setSecretQuestion(data.secret_quest);
      setError(null);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setSecretQuestion("");
    }
  };

  const checkAns = async () => {
    try {
      console.log(email, answer, passWord);
      const res = await fetch(`${baseurl}checkAns`, {
        method: "POST",
        headers: {
          "Content-type": "application/json", // Fix content type
        },
        body: JSON.stringify({ email, answer, passWord }), // Use object shorthand
      });
      if (res.ok) {
        toast.success("Password Changed", {
          position: toast.POSITION.TOP_RIGHT,
        });
        window.location.href = "/";
      } else {
        toast.error("Not verified", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      // Handle the error properly, e.g., display an error toast
      toast.error("An error occurred", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="">
        <div className=" max-w-[400px] w-full mx-auto mt-28 items-center font-content justify-center bg-orange-100">
          <div className="bg-orange-100 p-6 rounded-lg shadow-lg">
            <div className="flex flex-col items-center">
              <img
                src="src/assets/logo.png"
                alt="kannadiyar-logo"
                className="w-32 h-20"
              />
              <input
                className="border w-full rounded-md p-2 mt-6"
                placeholder=" Enter your email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {!secretQuestion && (
                <button
                  onClick={fetchSecretQuestion}
                  className="bg-primecolor hover:opacity-80 items-center w-full text-white px-2 py-1 rounded mt-4 cursor-pointer"
                >
                  Next
                </button>
              )}
              {error && <p>Error: {error}</p>}
              {secretQuestion && (
                <>
                  <p className="w-full rounded-md p-2 mt-2">
                    Secret Question : {secretQuestion}
                  </p>
                  <input
                    className="border w-full rounded-md p-2 mt-2"
                    placeholder="Enter your answer"
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                  <input
                    className="border w-full rounded-md p-2 mt-2"
                    placeholder="Enter your New password "
                    type="password"
                    value={passWord}
                    onChange={(e) => setPassWord(e.target.value)}
                  />
                  <button
                    onClick={checkAns}
                    className="bg-primecolor hover:opacity-80 items-center w-full text-white px-2 py-1 rounded mt-4 cursor-pointer"
                  >
                    Verify
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;

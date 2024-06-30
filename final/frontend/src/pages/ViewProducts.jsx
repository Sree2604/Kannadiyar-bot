import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Error from "../components/Error";
import GridData from "../components/GridData";
import { useState, useEffect } from "react";

const ViewData = ({ pData,remove, updateId }) => {
  const navigate = useNavigate();
  const [tokenExist, setTokenExist] = useState(false)
  const token = sessionStorage.getItem("token")
  useEffect(() => {
    if (token) {
      setTokenExist(true)
    }
    else {
      alert("Unauthorized access");
      navigate('/');
    }
    const clearTokenOnUnload = () => {
      sessionStorage.removeItem("token");
  };
window.addEventListener("beforeunload",clearTokenOnUnload)
return ()=>{
  window.removeEventListener("beforeunload",clearTokenOnUnload)
}

  }, [])


  return (
    <>
      {tokenExist && <> <NavBar />
      <div className="flex flex-col items-center" >
      <img src="/src/assets/logo.png" className="w-32 h-20" alt="" />
      <h1 className="text-2xl text-primecolor mb-8 mt-4 font-content font-bold">Welcome Admin, Add or Update your Products</h1>
      </div>
        <GridData data={pData} onDelete={remove} />
      </>}
    </>
  );
};
export default ViewData;

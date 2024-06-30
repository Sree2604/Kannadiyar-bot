import { useNavigate } from "react-router-dom";
const NavBar = () => {
  const navigate = useNavigate();
  const logOut = () => {
      sessionStorage.clear();
      navigate('/')
  }

  return (  
    <>
      <div className=" pb-6">
        <div className="p-2 text-gray-900  rounded-lg shadow-lg font-content font-bold  capitalize">
          <span className="px-2 mr-2 text-xl text-primecolor font-content cursor-pointer" onClick={()=>navigate('/home')}>
            Kannadiyar
          </span>
          
          <span className="w-10 relative float-right mr-3 cursor-pointer hover:text-gray-700">
            <i className="w-8 fas fa-user p-2 bg-red-300 rounded-full" onClick={logOut}></i>
          </span>
          <span className="px-8 cursor-pointer float-right hover:text-gray-700">
          <i className="w-8 fa fa-plus p-2 bg-orange-100 rounded-full" onClick={()=>navigate('/add')}></i>
            {/* <span className="mx-1">categories</span> */}
          </span>
          <span className="px-8 cursor-pointer float-right hover:text-gray-700">
          <i className="w-8 fa fa-clone p-2 bg-orange-100 rounded-full" onClick={()=>navigate('/banner')}></i>
            {/* <span className="mx-1">categories</span> */}
          </span>
          <span className="px-8 cursor-pointer float-right hover:text-gray-700">
          <i className="w-8 fa fa-database p-2 bg-orange-100 rounded-full" onClick={()=>navigate('/editcat')}></i>
            {/* <span className="mx-1">categories</span> */}
          </span>
          <span className="px-8 cursor-pointer float-right hover:text-gray-700">
          <i className="w-8 fa fa-plus-square p-2 bg-orange-100 rounded-full" onClick={()=>navigate('/addCategory')}></i>
            {/* <span className="mx-1">categories</span> */}
          </span>
          <span className="px-8 cursor-pointer float-right hover:text-gray-700">
          <i className="w-8 fa fa-paper-plane p-2 bg-orange-100 rounded-full" onClick={()=>navigate('/reply')}></i>
            {/* <span className="mx-1">categories</span> */}
          </span>
        </div>
      </div>
      
    </>
  );
};

export default NavBar;

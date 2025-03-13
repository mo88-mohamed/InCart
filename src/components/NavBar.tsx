import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/in-cart-logo.png";
import { navLinks } from "./navLinks";
// import { FaOpencart } from "react-icons/fa6";
import { MdShoppingCart } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { RiMenu3Line } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import useCart from "../hooks/useCart";
import useFilter from "../hooks/useFilter";
import { useState } from "react";


const NavBar = () => {
  const {getItemsCount} = useCart();
  const [innerSearchQuery,setInnerSearchQuery] = useState('');
  const {setSearchQuery} = useFilter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <nav className="px-4 w-full flex shadow-md p-4 bg-white sticky top-0 z-50 items-center justify-between md:justify-normals">
              <button
          className="lg:hidden text-gray-600 hover:text-blue-500 transition-colors"
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        >
          {isDrawerOpen ? <IoMdClose size={24} /> : <RiMenu3Line size={24} />}
        </button>
      <div className="flex items-center space-x-4">

        <div className="hover:opacity-90 transition-opacity">
          <img className="w-[200px] max-w-[150px] md:max-w-[200px]" src={Logo} alt="logo" />
        </div>
      </div>
      <div className="flex items-center justify-between sm:w-full ">
        <ul className="hidden lg:flex items-center space-x-6 ">
          {navLinks.map((link, index) => {
            return (
              <li key={`${link?.title}_${index}`}>
                <Link 
                  to={link.url} 
                  className="text-gray-600 hover:text-blue-500 transition-colors font-medium"
                >
                  {link.title}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center space-x-4 justify-between sm:justify-normals">
          <div className="relative  max-sm:hidden">
            <input 
              value={innerSearchQuery}
              className="bg-gray-100 rounded-full pl-10 pr-4 py-2 w-[250px] focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
              placeholder="Search products..." 
              type="text"
              onChange={(e)=>setInnerSearchQuery(e.target.value)}
              onKeyDown={(e)=>{
                if(e.key === 'Enter'){
                  setSearchQuery(innerSearchQuery);
                }
              }}
            />
            <FaSearch className="text-gray-400 text-lg absolute left-3 top-1/2 transform -translate-y-1/2"/>
          </div>
          <Link to={"/login"} className="hidden sm:block bg-blue-500 cursor-pointer text-white px-6 py-2 rounded-full hover:bg-blue-600 transition-colors font-medium">
            Login
          </Link>
          <div className="relative cursor-pointer hover:opacity-80 transition-opacity">
            <MdShoppingCart className="text-blue-500 text-3xl"  onClick={()=>navigate('/cart')}/>
            <span className="bg-blue-500 text-white text-xs font-bold rounded-full absolute -top-2 -right-2 min-w-[20px] h-[20px] flex items-center justify-center px-1">
              {getItemsCount()}
            </span>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity lg:hidden ${
          isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsDrawerOpen(false)}
      />
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform lg:hidden ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 space-y-6">
        <div className="flex items-center space-x-3 bg-gray-100 p-3 rounded-lg">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg font-semibold">G</span>
            </div>
            <div className="flex-1">
              <Link
                to={"/login"}
                className="block text-gray-600 hover:text-blue-500 transition-colors font-medium"
                onClick={() => setIsDrawerOpen(false)}
              >
                Login
              </Link>
              <p className="text-sm text-gray-500">Access your account</p>
            </div>
          </div>

          <ul className="space-y-4">
            {navLinks.map((link, index) => (
              <li key={`mobile_${link?.title}_${index}`}>
                <Link
                  to={link.url}
                  className="text-gray-600 hover:text-blue-500 transition-colors font-medium block"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
          <div className="relative">
            <input 
              value={innerSearchQuery}
              className="bg-gray-100 rounded-full pl-10 pr-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
              placeholder="Search products..." 
              type="text"
              onChange={(e)=>setInnerSearchQuery(e.target.value)}
              onKeyDown={(e)=>{
                if(e.key === 'Enter'){
                  setSearchQuery(innerSearchQuery);
                  setIsDrawerOpen(false);
                }
              }}
            />
            <FaSearch className="text-gray-400 text-lg absolute left-3 top-1/2 transform -translate-y-1/2"/>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

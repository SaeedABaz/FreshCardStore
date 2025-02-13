import { useState, useContext } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaShoppingCart, FaShoppingBasket } from "react-icons/fa";
import { UserContext } from "../Context/UserContext";
import { CartContext } from "../Context/CartContext";

export default function Navbar() {
  const { isLogin, setToken } = useContext(UserContext);
  const { numOfCartItems } = useContext(CartContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const pages = [
    { text: "Home", path: "/" },
    { text: "Cart", path: "/cart" },
    { text: "Products", path: "/products" },
    { text: "Brands", path: "/brands" },
    { text: "Categories", path: "/categories" },
    { text: "Wishlist", path: "/wishlist" },
  ];

  const authPages = [
    { text: "Login", path: "/login" },
    { text: "Register", path: "/register" },
  ];

  const navigate = useNavigate();

  function logOut() {
    setToken(null);
    navigate("/login");
  }

  const isAuthPage = location.pathname === "/login" || location.pathname === "/register" || location.pathname === "/forgot-password";

  return (
    <nav className="bg-white border-gray-200 shadow-sm dark:bg-gray-900">
      <div className="flex items-center justify-between p-4 w-full">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-semibold dark:text-white flex items-center">
            Fresh Cart
            <FaShoppingCart className="text-green-500 text-2xl ml-2" />
          </span>
        </Link>

        
        <div className="flex items-center lg:hidden">
          
          {!isAuthPage && (
            <NavLink to="/cart" className="relative flex items-center text-gray-900 dark:text-white hover:text-green-700 mr-4">
              <FaShoppingBasket className="text-2xl" />
              {numOfCartItems > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 text-xs font-semibold text-white bg-red-500 rounded-full flex items-center justify-center">
                  {numOfCartItems}
                </span>
              )}
            </NavLink>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            className="p-2 w-10 h-10 text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
            aria-expanded={isOpen}
          >
            <svg className="w-5 h-5" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:flex-grow lg:justify-between lg:items-center">
          
          <div className="w-1/4"></div>

          
          <div className="flex  items-center space-x-8">
            {isLogin && pages.map(({ text, path }) => (
              <NavLink key={path} to={path} className="text-gray-900 font-medium dark:text-white hover:text-green-700">
                {text}
              </NavLink>
            ))}

            {!isLogin && authPages.map(({ text, path }) => (
              <NavLink key={path} to={path} className="text-gray-900  font-medium dark:text-white hover:text-green-700">
                {text}
              </NavLink>
            ))}
          </div>

          
          <div className="flex items-center space-x-8 w-1/4 justify-end">

          {!isAuthPage && (
              <NavLink to="/cart" className="relative flex items-center text-gray-900 dark:text-white hover:text-green-700">
                <FaShoppingBasket className="text-2xl" />
                {numOfCartItems > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 text-xs font-semibold text-white bg-red-500 rounded-full flex items-center justify-center">
                    {numOfCartItems}
                  </span>
                )}
              </NavLink>
            )}

            {isLogin && (
              <button onClick={logOut} className="text-gray-900 dark:text-white font-medium  hover:text-green-700">LogOut</button>
            )}

            
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Menu */}
      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"} lg:hidden`}>
        <ul className="flex flex-col space-y-3 mt-3 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          {isLogin && pages.map(({ text, path }) => (
            <li key={path}>
              <NavLink to={path} className="block font-medium text-gray-800 dark:text-white py-2 px-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                {text}
              </NavLink>
            </li>
          ))}

          {!isLogin ? authPages.map(({ text, path }) => (
            <li key={path}>
              <NavLink to={path} className="block font-medium text-gray-800 dark:text-white py-2 px-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">
                {text}
              </NavLink>
            </li>
          )) : (
            <li>
              <button onClick={logOut} className="block font-medium w-full text-left text-gray-800 dark:text-white py-2 px-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700">LogOut</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

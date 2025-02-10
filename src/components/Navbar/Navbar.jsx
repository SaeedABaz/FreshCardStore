import { useState, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok, FaShoppingBasket, FaShoppingCart } from "react-icons/fa";
import { CounterContext } from "../Context/CounterContext.jsx";
import { UserContext } from "../Context/UserContext";
import { CartContext } from "../Context/CartContext"; // Import Cart Context

export default function Navbar() {
  const { nameOne, nameTwo } = useContext(CounterContext);
  const { isLogin, setToken } = useContext(UserContext);
  const { numOfCartItems } = useContext(CartContext); // Access numOfCartItems from CartContext

  const [pages, setPages] = useState([
    { text: "Home", path: "/" },
    { text: "Cart", path: "/cart" },
    { text: "Products", path: "/products" },
    { text: "Brands", path: "/brands" },
    { text: "Categories", path: "/categories" },
    { text: "Wishlist", path: "/wishlist" },
  ]);

  const [authPages, setAuthPages] = useState([
    { text: "Login", path: "/login" },
    { text: "Register", path: "/register" },
  ]);

  const navigate = useNavigate();
  const location = useLocation(); // Get current location

  function logOut() {
    setToken(null);
    navigate("/login");
  }

  const [icons, setIcons] = useState([
    { icon: <FaFacebook />, url: "" },
    { icon: <FaInstagram />, url: "" },
    { icon: <FaYoutube />, url: "" },
    { icon: <FaTiktok />, url: "" },
  ]);

  // Check if the current page is login page
  const isLoginPage = location.pathname === "/login";

  return (
    <nav className="bg-white border-gray-200 shadow-sm dark:bg-gray-900">
      <div className="flex items-center gap-4 mx-auto p-4 justify-between w-full">
        {/* Logo Section */}
        <Link to={"/"} className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="flex flex-wrap self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Fresh cart <FaShoppingCart className="flex my-1.5 mx-2 text-green-500 text-2xl" />
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex ml-auto items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Menu Items */}
        <div className="justify-between hidden gap-4 items-center w-full grow lg:flex lg:w-auto" id="navbar-default">
          {/* Pages Section */}
          <ul className="font-medium flex flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
            {isLogin &&
              pages.map(({ text, path }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                  >
                    {text}
                  </NavLink>
                </li>
              ))}
          </ul>

          {/* Cart Icon (Hidden on Login Page) */}
          {!isLoginPage && (
            <ul className="font-medium ml-auto flex flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-4 rtl:space-x-reverse lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to="/cart"
                  className="relative block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                >
                  <FaShoppingBasket className="mx-2 text-2xl" />
                  {numOfCartItems > 0 && (
                    <span className="text-center absolute top-0 right-0 inline-block w-4 h-4 text-xs font-semibold text-white bg-red-500 rounded-full">
                      {numOfCartItems}
                    </span>
                  )}
                </NavLink>
              </li>
            </ul>
          )}

          {/* Auth Pages or LogOut */}
          <ul className=" font-medium flex flex-col p-4 lg:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 rtl:space-x-reverse lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
            {!isLogin &&
              authPages.map(({ text, path }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                  >
                    {text}
                  </NavLink>
                </li>
              ))}

            {isLogin && (
              <li>
                <button
                  onClick={() => logOut()}
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:border-0 lg:hover:text-green-700 lg:p-0 dark:text-white lg:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent"
                >
                  LogOut
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishlistContext";
import { FaHeart } from "react-icons/fa";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addProductToCart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
        setProducts(response.data.data);
      } catch (error) {
        setError("Error fetching products");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const isProductInWishlist = (productId) => {
    return wishlist.some((product) => product._id === productId);
  };

  const handleWishlistClick = (product) => {
    if (isProductInWishlist(product._id)) {
      removeFromWishlist(product._id);
      setMessage("Product removed from wishlist");
    } else {
      addToWishlist(product);
      setMessage("Product added to wishlist successfully!");
    }
    setTimeout(() => setMessage(""), 2000);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      {message && <div className="mb-4 text-green-500">{message}</div>}
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product._id} className="shadow-lg rounded-lg overflow-hidden">
              <Link to={`/productDetails/${product._id}/${product.category._id}`}>
                <img
                  className="w-full h-60 object-cover"
                  src={product.imageCover}
                  alt={product.title}
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{product.title}</h3>
                  <p className="text-gray-500">${product.price}</p>
                </div>
              </Link>
              <div className="flex justify-between items-center p-4">
                <button
                  onClick={() => addProductToCart(product._id)}
                  className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Add to Cart
                </button>
                <FaHeart
                  onClick={() => handleWishlistClick(product)}
                  className={`cursor-pointer text-2xl ${
                    isProductInWishlist(product._id) ? "text-red-500" : "text-gray-500"
                  }`}
                />
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-12">No products found.</p>
        )}
      </ul>
    </div>
  );
}
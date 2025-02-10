import { useContext } from "react";
import { WishlistContext } from "../Context/WishlistContext";
import { CartContext } from "../Context/CartContext";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

export default function WishList() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const { addProductToCart } = useContext(CartContext);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">My Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => (
            <li key={product._id} className="shadow-lg rounded-lg overflow-hidden">
              <Link to={`/productDetails/${product._id}/${product.category._id}`}>
                <img
                  className="w-full h-70 object-cover"
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
                  onClick={() => removeFromWishlist(product._id)}
                  className="items-center mt-2 text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                >
                  <FaTrash />
                </button>
                <button
                  onClick={() => addProductToCart(product._id)}
                  className="items-center mt-2 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Add to Cart
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
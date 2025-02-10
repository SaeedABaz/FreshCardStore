import { useContext, useState } from "react";
import { FaHeart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishlistContext"; // Import Wishlist Context
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const [isLoading, setIsLoading] = useState(false);
  const { addProductToCart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext); // Use Wishlist Context

  const isProductInWishlist = wishlist.some((item) => item._id === product._id);

  async function handleAddProductToCart(id) {
    setIsLoading(true);
    const res = await addProductToCart(id);
    toast(res.data.message, { icon: res.data.status ? "👏" : "👎" });
    setIsLoading(false);
  }

  function handleWishlistClick() {
    if (isProductInWishlist) {
      removeFromWishlist(product._id);
      toast("Removed from Wishlist", { icon: "❌" });
    } else {
      addToWishlist(product);
      toast("Added to Wishlist", { icon: "❤️" });
    }
  }

  return (
    <div className="overflow-hidden group">
      <Link to={`/productDetails/${product._id}/${product.category._id}`}>
        <img
          className="w-full md:h-52 object-cover object-center"
          src={product.imageCover}
          alt={product.title}
        />
        <span className="text-green-500">{product.category.name}</span>
        <h2 className="text-lg font-semibold mb-3">
          {product.title.split(" ", 2).join(" ")}
        </h2>

        <div className="flex justify-between">
          <span>${product.price}</span>
          <span>
            <FaHeart
              onClick={handleWishlistClick}
              className={`mx-2 inline-block cursor-pointer text-2xl ${
                isProductInWishlist ? "text-red-500" : "text-gray-500"
              }`}
            />
            {product.ratingsAverage}{" "}
            <FaStar className="inline-block text-yellow-300" />
          </span>
        </div>
      </Link>

      <button
        disabled={isLoading}
        onClick={() => handleAddProductToCart(product._id)}
        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 btn-green group-hover:translate-y-0 transition-all duration-500 w-full mt-2 translate-y-20"
      >
        {isLoading ? "Adding to cart..." : "Add Product"}
      </button>
    </div>
  );
}

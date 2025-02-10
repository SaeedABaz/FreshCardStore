import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import { WishlistContext } from "../Context/WishlistContext";
import { FaHeart } from "react-icons/fa";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addProductToCart } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

  useEffect(() => {
    async function fetchBrands() {
      try {
        const response = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/brands"
        );
        setBrands(response.data.data);
      } catch (error) {
        setError("Error fetching brands");
      } finally {
        setIsLoading(false);
      }
    }

    fetchBrands();
  }, []);

  async function fetchProductsByBrand(brandId, brandName) {
    setSelectedBrand({ id: brandId, name: brandName });
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`
      );
      setProducts(response.data.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }

  const isProductInWishlist = (productId) => {
    return wishlist.some((product) => product._id === productId);
  };

  if (isLoading && !selectedBrand) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="grid grid-cols-12 gap-4 mt-7">
      {!selectedBrand ? (
        <ul className="col-span-12 flex flex-wrap gap-10 justify-center">
          {brands.map((brand) => (
            <li
              key={brand._id}
              className="w-full sm:w-[48%] md:w-[32%] lg:w-[24%] xl:w-[19%] shadow-lg rounded-lg overflow-hidden transition-shadow duration-300 hover:shadow-green-500 hover:shadow-lg cursor-pointer"
              onClick={() => fetchProductsByBrand(brand._id, brand.name)}
            >
              <img
                className="w-full h-60 object-cover"
                src={brand.image}
                alt={brand.name}
              />
              <h3 className="text-green-500 text-center py-3">{brand.name}</h3>
            </li>
          ))}
        </ul>
      ) : (
        <div className="col-span-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-green-600">
              Products by {selectedBrand.name}
            </h2>
            <button
              className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              onClick={() => {
                setSelectedBrand(null);
                setProducts([]);
              }}
            >
              Back to Brands
            </button>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.length > 0 ? (
              products.map((product) => (
                <li
                  key={product._id}
                  className="shadow-lg rounded-lg overflow-hidden"
                >
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
                    <button
  onClick={() =>
    isProductInWishlist(product._id)
      ? removeFromWishlist(product._id)
      : addToWishlist(product)
  }
  className="focus:outline-none"
>
  <FaHeart
    className={`text-2xl cursor-pointer transition-all ${
      isProductInWishlist(product._id) ? "text-red-500" : "text-gray-500"
    }`}
  />
</button>

                  </div>
                </li>
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-12">
                No products found for this brand.
              </p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
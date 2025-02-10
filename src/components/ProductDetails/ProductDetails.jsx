import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { FaStar, FaHeart } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import ProductCard from '../ProductCard/ProductCard';
import { useQuery } from '@tanstack/react-query';
import { CartContext } from '../Context/CartContext';
import { WishlistContext } from '../Context/WishlistContext';

export default function ProductDetails() {
    const { pId, cId } = useParams();
    const { addProductToCart } = useContext(CartContext);
    const { wishlist, addToWishlist, removeFromWishlist } = useContext(WishlistContext);

    const { isLoading, data } = useQuery({
        queryKey: ["getProductDetails", pId],
        queryFn: () => axios.get(`https://ecommerce.routemisr.com/api/v1/products/${pId}`),
        staleTime: 5000
    });

    const [relatedProducts, setRelatedProducts] = useState([]);

    async function getProduct() {
        try {
            const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
            const products = data.data.filter((p) => p.category?._id === cId).slice(0, 5);
            setRelatedProducts(products);
        } catch (error) {
            console.error("Error fetching related products:", error);
        }
    }

    useEffect(() => {
        getProduct();
    }, [cId]);

    if (isLoading) {
        return <div>Loading product details...</div>;
    }

    const product = data.data.data;

    const isProductInWishlist = wishlist.some((item) => item._id === product._id);

    return (
        <>
            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-4 mt-7 ">
                    <img
                        src={product?.imageCover || 'https://via.placeholder.com/150'}
                        alt={product?.title || 'Product Image'}
                        className="w-full md:max-w-full max-w-64 mx-auto"
                    />
                </div>
                <div className="col-span-12 md:col-span-8 mt-7 self-center ">
                    <h2 className="mb-2">{product?.title}</h2>
                    <p className="mb-3 text-black/60">{product?.description}</p>
                    <p className="mb-2">{product?.category.name || 'No category available'}</p>
                    <div className="flex justify-between mb-2">
                        <span>Price: {product?.price || 'N/A'}</span>
                        <span className="flex gap-3 items-center">
                            Rating: {product?.ratingsAverage || 'N/A'}
                            <FaStar className="text-yellow-400" />
                        </span>
                    </div>

                    {/* Buttons Section */}
                    <div className="flex items-center gap-4 mt-4">
                        {/* Add to Cart Button */}
                        <button
                            onClick={() => addProductToCart(product._id)}
                            className="bg-green-700 text-white py-2 px-4 rounded-md hover:bg-green-800 transition"
                        >
                            Add to Cart
                        </button>

                        {/* Wishlist Button */}
                        <button
                            onClick={() =>
                                isProductInWishlist
                                    ? removeFromWishlist(product._id)
                                    : addToWishlist(product)
                            }
                            className="focus:outline-none"
                        >
                            <FaHeart
                                className={`text-2xl cursor-pointer transition-all ${
                                    isProductInWishlist ? "text-red-500" : "text-gray-500"
                                }`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Related Products */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
                {relatedProducts.length === 0 ? (
                    <p>Loading related products...</p>
                ) : (
                    relatedProducts.map((p) => <ProductCard key={p._id} product={p} />)
                )}
            </div>
        </>
    );
}

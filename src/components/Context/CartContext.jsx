import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { UserContext } from "./UserContext";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const { token } = useContext(UserContext);
  const headers = {
    token,
  };

  // Fetch the user's cart data when the component mounts
  useEffect(() => {
    if (token) {
      getUserCart();
    }
  }, [token]);

  function addProductToCart(id) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId: id },
        { headers }
      )
      .then((r) => {
        getUserCart();  // Update cart info after adding product
        return r;
      })
      .catch((e) => {
        return e;
      });
  }

  function getUserCart() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", { headers })
      .then((response) => {
        setNumOfCartItems(response.data.numOfCartItems); // Update cart item count
        setTotalCartPrice(response.data.data.totalCartPrice); // Update total price
        return response;
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
        return error;
      });
  }

  function removeProductFromCart(pId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${pId}`, { headers })
      .then((r) => {
        getUserCart();  // Update cart info after removing product
        return r;
      })
      .catch((e) => {
        return e;
      });
  }

  function updateProductQu(pId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${pId}`,
        { count: count },
        { headers }
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  function removeCart() {
    return axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", { headers })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  }

  function checkOutSession(cId, shippingAddress) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cId}?url=https://saeedabaz.github.io/FreshCardStore`,
        {
          shippingAddress: shippingAddress,
        },
        { headers }
      )
      .then((r) => {
        return r;
      })
      .catch((e) => {
        return e;
      });
  }

  return (
    <CartContext.Provider
      value={{
        numOfCartItems,
        totalCartPrice,
        addProductToCart,
        getUserCart,
        removeProductFromCart,
        updateProductQu,
        removeCart,
        checkOutSession,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

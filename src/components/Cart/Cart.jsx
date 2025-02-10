import { useContext, useState } from "react";
import { CartContext } from "../Context/CartContext"; // Corrected path
import { useEffect } from "react";
import CartProductDetails from './../CartProductDetails/CartProductDetails';
import { FaTrash } from 'react-icons/fa';
import emptyCart from '../../assets/emptyCart.png';
import { useFormik } from 'formik';

export default function Cart() {
  const { counter, setCounter, checkOutSession,  getUserCart, removeProductFromCart, updateProductQu, removeCart } = useContext(CartContext);
  
  const [openForm, setOpenForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [numOfCartItems, setNumOfCartItems] = useState(0);
  const [cartId, setCartId] = useState(null);
  const [cartDetails, setCartDetails] = useState(null);
  const [products, setProducts] = useState([])


  async function handleGetUserCart(){
    setIsLoading(true);
    const res = await getUserCart();
    setIsLoading(false);
    setNumOfCartItems(res.data.numOfCartItems);
    setCartId(res.data.cartId);
    setCartDetails(res.data.data);
    setProducts(res.data.data.products);
      
  }
  async function handleUpdateProductQu(pId, count){

    const res = await updateProductQu(pId, count);

    setNumOfCartItems(res.data.numOfCartItems);
    setCartId(res.data.cartId);
    setCartDetails(res.data.data);
    setProducts(res.data.data.products);
      
  }

  async function handleRemoveProductFromCart(pId){
    
    const res = await removeProductFromCart(pId);
    

    setNumOfCartItems(res.data.numOfCartItems);
    setCartId(res.data.cartId);
    setCartDetails(res.data.data);
    setProducts(res.data.data.products);
      
  }

  async function handleRemoveCart(){
    const res = await removeCart();
    setNumOfCartItems(0);
    setCartId(null);
    setCartDetails(null);
    setProducts([]);
    console.log(res);
    
  }
  async function handleCheckOutSession(value){
    const res = await checkOutSession(cartId, value);
    
    location.href = (res.data.session.url);
    
  }

  const formik = useFormik({
    initialValues: {
      city: '',
      phone: '',
      details: ''
    },
    onSubmit: handleCheckOutSession
  })


  useEffect(() => {
    handleGetUserCart();
  }, []);

  if(isLoading){
    return <div>Loading......</div>
  }

  return (
    <>
    {
      numOfCartItems === 0 && <div className="my-4 text-center">
        <img className="mx-auto" src={emptyCart} alt="" />
      </div> 
    }
    
    {
      numOfCartItems !=0 && <>
      <div className="flex justify-between rounded-lg bg-gray-100 p-4 my-5 text-balck/60">
        <div className="">
          <p>numOfCartItems: {numOfCartItems}</p>
          <p>totalCartPrice: {cartDetails?.totalCartPrice}</p>
        </div>
        <button onClick={handleRemoveCart} className="px-4 py-2 rounded-lg flex gap-3 items-center text-white bg-red-500">Clear Cart <FaTrash className="w-3"/> </button>

      </div>
      


      

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  products.map((p)=> <CartProductDetails handleUpdateProductQu={handleUpdateProductQu} handleRemoveProductFromCart={handleRemoveProductFromCart} key={p._id} p={p} />)
                }
              </tbody>
            </table>
          </div>
          
          <div className="my-5">
            <button onClick={()=> setOpenForm(true)} className="px-4 py-2 rounded-lg flex gap-3 items-center text-white bg-green-500">Continue</button>
          </div>
          
          {
      openForm && <>
      <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <form onSubmit={formik.handleSubmit} className="bg-white rounded-lg p-4 min-w-80 min-h-96 flex flex-col gap-4 justify-center items-center">
        <h2 className="mb-2">Shipping address form</h2>
        
        <div className="flex flex-col gap-2">
          <input {...formik.getFieldProps("city")} type="text" placeholder="city" className="rounded-lg border-gray-300 outline-none"/>
          <input {...formik.getFieldProps("phone")} type="tel" placeholder="phone" className="rounded-lg border-gray-300 outline-none"/>
          <input {...formik.getFieldProps("details")} type="text" placeholder="details" className="rounded-lg border-gray-300 outline-none"/>
          
          <button type="submit" className="px-3 py-2 rounded-lg bg-green-400">CheckOut Session</button>
          <button type="button" onClick={()=>{setOpenForm(false)}} className="px-3 py-2 rounded-lg bg-red-400">Cancel</button>
          </div>
          </form>
          </div>
      </>
    }
                </>
    }
    </>
  );
}
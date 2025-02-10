import './App.css';
import Home from './components/Home/Home';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Register from './components/Register/Register';
import Products from './components/Products/Products';
import Login from './components/Login/Login';
import Cart from './components/Cart/Cart';
import Categories from './components/Categories/Categories';
import Brands from './components/Brands/Brands';
import Notfound from './components/Notfound/Notfound';
import ProductDetails from './components/ProductDetails/ProductDetails';
import toast, { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import ProtectedAuth from './components/ProtectedAuth/ProtectedAuth';
import AllOrders from './components/allOrders/allOrders';
import WishList from './components/WishList/WishList';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';

function App() {
    const router = createHashRouter([
        {
            path: "",
            element: <Layout />,
            children: [
                { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> }, 
                { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
                { path: "productDetails/:pId/:cId", element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
                { path: "wishlist", element: <ProtectedRoute><WishList /></ProtectedRoute> },
                { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
                { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute> },
                { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
                { path: "allOrders", element: <ProtectedRoute><AllOrders/></ProtectedRoute> },
                { path: "register", element: <ProtectedAuth><Register /></ProtectedAuth> },
                { path: "login", element: <ProtectedAuth><Login /></ProtectedAuth> },
                { path: "forgot-password", element: <ProtectedAuth><ForgotPassword /></ProtectedAuth> },
                { path: "*", element: <Notfound /> },
            ]
        },
    ]);

    return (
        <>
            <Toaster position="top-right" toastOptions={{ className: 'bg-red-500 text-white' }} />
            <RouterProvider router={router} />
        </>
    );
}

export default App;

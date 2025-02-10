import { useState, useEffect, useContext } from "react"
import { FaSpinner } from "react-icons/fa";
import Style from './TemaplateName.module.css'
import { useFormik } from "formik";
import values from './../../../node_modules/lodash-es/values';
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { UserContext } from './../Context/UserContext';

export default function Register() {

  const {setToken} = useContext(UserContext)
    
  const validationSchema = Yup.object().shape({
        name: Yup.string().required("must enter ur name").min(5, "at least 5 char"),
        email: Yup.string().required("pls enter email").email("invalid email"),
        password: Yup.string().required("pls enter ur password").matches(/^[A-Z].{5,}/ , "must be 6 char and first is capital"),
        rePassword: Yup.string().required("pls enter ur password").oneOf([Yup.ref("password")], "password not matched"),
        phone: Yup.string().required("pls enter ur phone").matches(/^01[0125][0-9]{8}/, "should be egyption phone")
  })

    const [errorMsg, setErrorMsg] = useState("");
    const [isloading, setisLoading] = useState(false);
    
    const Navigate = useNavigate();
    const formik = useFormik({
      initialValues : {
        name: "",
        email:"",
        password:"",
        rePassword:"",
        phone:""
      } ,
      onSubmit : handleRegister,
      validationSchema : validationSchema,
    });
    
    async function handleRegister (values){
      try {
        
        setisLoading(true);
        const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup" , values);
        console.log(data);

        if(data.message == "success"){
          Navigate("/")
          setToken(data.token);
        }

      } catch (error){

        setErrorMsg("email exist")
        
      } finally{
        setisLoading(false)
      }
      
      
    }
    
    useEffect(()=>{} , []);
    return (
    

<form onSubmit={formik.handleSubmit} className="">
  <h2 className="my-7 text-green-500">Register Form</h2>

  {
    errorMsg? <div
    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
    role="alert"
  >
    <span className="font-medium">account already exist</span>
  </div> : null
  }
  <div className="relative z-0 w-full mb-5 group">
    <input
      name="email"
      onChange={formik.handleChange}
      onBlur={formik.handleBlur}
      value={formik.values.email}
    type="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "/>

    {formik.errors.email && formik.touched.email && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{formik.errors.email}</span>
          </div>
        )} 
    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.password}

    type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />

    {formik.errors.password && formik.touched.password && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{formik.errors.password}</span>
          </div>
        )}
    <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input 
    onBlur={formik.handleBlur}
    onChange={formik.handleChange}
    value={formik.values.rePassword}
    
    type="password" name="rePassword" id="repassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />

    {formik.errors.rePassword && formik.touched.rePassword && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{formik.errors.rePassword}</span>
          </div>
        )}
    <label htmlFor="repassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm password</label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input
    onBlur={formik.handleBlur}
    onChange={formik.handleChange}
    value={formik.values.name}
    
    type="text" name="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" "  />

    {formik.errors.name && formik.touched.name && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{formik.errors.name}</span>
          </div>
        )}
    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"> name</label>
  </div>
  <div className="relative z-0 w-full mb-5 group">
    <input 
    onBlur={formik.handleBlur}
    onChange={formik.handleChange}
    value={formik.values.phone}
    
    type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />

    {formik.errors.phone && formik.touched.phone && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{formik.errors.phone}</span>
          </div>
        )}
    <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
  </div>
  <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">

    {
      isloading? <FaSpinner className="animate-spin"/> : "Submit"
    }
  </button>
</form>

  )
}

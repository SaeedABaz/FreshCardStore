import { useFormik } from "formik";
import { useState, useContext } from "react";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { CounterContext } from "../Context/CounterContext";
import { UserContext } from "../Context/UserContext";

export default function Login() {
  const { nameOne, nameTwo, setNameOne } = useContext(CounterContext);
  const { setToken } = useContext(UserContext);
  const navigate = useNavigate();
  const [errorMsg, seterrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("pls enter email").email("invalid email"),
    password: Yup.string()
      .required("pls enter ur password")
      .matches(/^[A-Z].{5,}/, "must be 6 char and first is capital"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: handleLogin,
    validationSchema: validationSchema,
  });

  async function handleLogin(loginData) {
    try {
      setLoading(true);
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        loginData
      );
      if (data.message == "success") {
        navigate("/");
        setToken(data.token);
      }
    } catch (error) {
      seterrorMsg("email or pass incorrect ");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto">
      <h2 className="my-7 text-green-500">Login Page</h2>

      {errorMsg ? (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">{errorMsg}</span>
        </div>
      ) : null}

      {/* Email Input */}
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your email
        </label>
        <input
          {...formik.getFieldProps("email")}
          name="email"
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          placeholder="Enter your email"
        />
        {formik.errors.email && formik.touched.email && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{formik.errors.email}</span>
          </div>
        )}
      </div>

      {/* Password Input */}
      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Your password
        </label>
        <input
          {...formik.getFieldProps("password")}
          name="password"
          type="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
          placeholder="Enter your password"
        />
        {formik.errors.password && formik.touched.password && (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{formik.errors.password}</span>
          </div>
        )}
      </div>

      {/* Remember Me Checkbox */}
      <div className="flex items-start mb-5">
        <div className="flex items-center h-5">
          <input
            id="remember"
            type="checkbox"
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-green-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-green-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
          />
        </div>
        <label
          htmlFor="remember"
          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          Remember me
        </label>
      </div>

      {/* Forgot Password Link */}
      <div className="mb-5">
        <Link to="/forgot-password" className="text-sm text-green-500 hover:underline">
          Forgot Password?
        </Link>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
      >
        {loading ? "loading" : "Submit"}
      </button>
    </form>
  );
}
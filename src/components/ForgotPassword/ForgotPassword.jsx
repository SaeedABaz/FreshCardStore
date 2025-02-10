import React, { useState } from "react";
import axios from "axios";
import { FaCheck } from "react-icons/fa";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [message, setMessage] = useState("");

  // Step 1: Send Reset Code to Email
  const handleSendResetCode = async () => {
    try {
      const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", { email });
      setMessage("Reset code sent to your email.");
      setStep(2);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error sending reset code.");
    }
  };

  // Step 2: Verify Reset Code
  const handleVerifyResetCode = async () => {
    try {
      await axios.post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", { resetCode });
      setMessage("Code verified. Please enter a new password.");
      setStep(3);
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid reset code.");
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async () => {
    if (newPassword !== rePassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      await axios.put("https://ecommerce.routemisr.com/api/v1/auth/resetPassword", {
        email,
        newPassword
      });
      setMessage("Password Reset successfully!");
      setStep(4);
    } catch (error) {
      setMessage(error.response?.data?.message || "Error resetting password.");
    }
  };

  return (
    <div className="rounded" style={{ maxWidth: "500px", margin: "auto", textAlign: "center", padding: "20px", border: "1px solid #ddd", borderRadius: "5px" }}>
      <h2>Forgot Password</h2>
      <p>{message}</p>

      {step === 1 && (
        <div>
          <input className="m-4 rounded " 
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button className="m-4 p-2 rounded bg-green-400 hover:bg-green-700 transition text-white" onClick={handleSendResetCode}>Send Reset Code</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <input className="m-4 rounded"
            type="text"
            placeholder="Enter reset code"
            value={resetCode}
            onChange={(e) => setResetCode(e.target.value)}
            required
          />
          <button className="m-4 p-2 rounded bg-green-400 hover:bg-green-700 transition text-white" onClick={handleVerifyResetCode}>Verify Code</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <input className="m-4 rounded"
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
          <input className=" rounded"
            type="password"
            placeholder="Confirm Password"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            required
          />
          <button className="m-4 p-2 rounded bg-green-400 hover:bg-green-700 transition text-white" onClick={handleResetPassword}>Reset Password</button>
        </div>
      )}

      {step === 4 && <div className="flex items-center text-center p-4 my-4 text-sm text-green-800 bg-green-50 rounded-lg dark:bg-gray-800 dark:text-green-400" role="alert">
        <FaCheck/> <span className="mx-2 font-medium"> Success!</span> Password updated successfully! You can now log in.
</div>
}
    </div>
  );
};

export default ForgotPassword;

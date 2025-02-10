import { useState } from "react";
import { useRouter } from "next/router";
import { Motion, motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const [message, setMessage] = useState("Oops! Page Not Found");
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <motion.h1 
        className="text-6xl font-bold mb-4 text-red-500"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        404
      </motion.h1>
      <motion.p 
        className="text-lg text-gray-400 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {message}
      </motion.p>
      <Button 
        onClick={() => router.push("/")}
        className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-lg text-white"
      >
        Go Back
      </Button>
    </div>
  );
}

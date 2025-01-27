"use client";
import React from "react";
import { motion } from "framer-motion";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <motion.div
        className="flex items-center justify-center flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex gap-2">
          <motion.div
            className="w-5 h-5 bg-blue-500 rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
          ></motion.div>
          <motion.div
            className="w-5 h-5 bg-blue-500 rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
          ></motion.div>
          <motion.div
            className="w-5 h-5 bg-blue-500 rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
          ></motion.div>
        </div>
        <p className="text-gray-600 mt-4 text-lg">Loading, please wait...</p>
      </motion.div>
    </div>
  );
};

export default LoadingPage;

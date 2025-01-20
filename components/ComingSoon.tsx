"use client"

import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';

const letters = 'COMING SOON...'.split('');

const ComingSoon = () => {
  const [key, setKey] = useState(0); // Control re-render for looping

  useEffect(() => {
    const loop = setInterval(() => {
      setKey((prevKey) => prevKey + 1); // Trigger re-render
    }, 7000); // Duration includes the total cycle (letters + fade-out overlap)

    return () => clearInterval(loop); // Cleanup
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5,
      },
    },
    fading: {
      opacity: 0,
      transition: { duration: 2.5, ease: 'easeInOut' }, // Fade-out starts early (2.5 seconds)
    },
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-gray-700">
      <motion.div
        key={key}
        className="flex space-x-1 text-6xl md:text-8xl font-extrabold text-white tracking-wide"
        initial="hidden"
        animate="visible"
        exit="fading"
        variants={containerVariants}
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            variants={textVariants}
            transition={{ duration: 0.4 }}
            className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          >
            {letter}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default ComingSoon;


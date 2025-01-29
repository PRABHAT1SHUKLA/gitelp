import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TransitionComponent: React.FC = () => {
  const [visible, setVisible] = useState(true);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <button
        onClick={() => setVisible((prev) => !prev)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Toggle Box
      </button>

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.4 }}
            className="w-40 h-40 bg-blue-500 rounded-lg flex items-center justify-center text-white text-lg font-bold shadow-lg"
          >
            Hello!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TransitionComponent;

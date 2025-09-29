import React from "react";
import { motion } from "framer-motion";
import { Leaf, FilePlus, BarChart3, Award } from "lucide-react";

const NGOWelcomePage: React.FC = () => {
  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-10 text-center"
      >
        {/* Icon */}
        <Leaf className="w-16 h-16 mx-auto text-green-600 mb-6" />

        {/* Headline */}
        <h1 className="text-3xl font-bold text-gray-800 mb-3">
          Welcome, <span className="text-green-700">NGO Partner</span> 🌱
        </h1>

        {/* Subtext */}
        <p className="text-gray-600 text-lg mb-10">
          Together we can make a difference.  
          As an <span className="font-semibold">NGO on CLORIT</span>, you play a vital role in restoring blue carbon ecosystems, 
          empowering communities, and driving sustainable change.
        </p>

        {/* NGO Capabilities */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-xl bg-green-50 shadow-sm hover:shadow-md transition">
            <FilePlus className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800">Submit Projects</h3>
            <p className="text-sm text-gray-500">
              Propose your environmental projects for review & approval.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-blue-50 shadow-sm hover:shadow-md transition">
            <BarChart3 className="w-10 h-10 text-blue-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800">Track Credits</h3>
            <p className="text-sm text-gray-500">
              Monitor your verified carbon credits and impact in real-time.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-yellow-50 shadow-sm hover:shadow-md transition">
            <Award className="w-10 h-10 text-yellow-600 mx-auto mb-3" />
            <h3 className="font-semibold text-gray-800">Earn Recognition</h3>
            <p className="text-sm text-gray-500">
              Get rewarded & recognized for impactful contributions.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <button
          onClick={() => alert("Let's Start Your NGO Journey!")}
          className="bg-green-600 text-white px-8 py-3 rounded-xl shadow hover:bg-green-700 transition text-lg font-semibold"
        >
          Start Your Journey
        </button>
      </motion.div>
    </div>
  );
};

export default NGOWelcomePage;

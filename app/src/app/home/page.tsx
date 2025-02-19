import { motion } from "framer-motion";
import { Clock, BarChart2, Users } from "lucide-react";
import Link from "next/link";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="px-4 py-1.5 rounded-full bg-gray-100 text-gray-800 text-sm font-medium inline-block mb-6">
              Time Tracking Simplified
            </span>
            <h1 className="text-5xl font-bold tracking-tight text-gray-900 mb-6 relative">
              <span className="relative inline-block">
                Turn chaos into clarity
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/90 to-transparent animate-shimmer" />
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Track time effortlessly with HustleBustle. Streamline your workflow and boost productivity.
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors"
            >
              Get Started
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 bg-white rounded-2xl shadow-sm"
            >
              <Clock className="w-10 h-10 text-gray-900 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Time Tracking</h3>
              <p className="text-gray-600">
                Track time with precision and ease. Never miss a minute of your productive work.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-6 bg-white rounded-2xl shadow-sm"
            >
              <BarChart2 className="w-10 h-10 text-gray-900 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Insights</h3>
              <p className="text-gray-600">
                Get detailed analytics and reports to optimize your time management.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="p-6 bg-white rounded-2xl shadow-sm"
            >
              <Users className="w-10 h-10 text-gray-900 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Team Management</h3>
              <p className="text-gray-600">
                Collaborate with your team and track progress together seamlessly.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

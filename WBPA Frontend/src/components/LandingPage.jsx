import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Link } from "react-router-dom"
import { GlassWaterIcon as WaterIcon, BarChartIcon, UserIcon, ShieldIcon } from "lucide-react"

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-poppins">
      {/* Background Image */}
      <div
        className="fixed inset-0 z-0 opacity-45"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1737450768817-909e9a565a26?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Header */}
      <header className="relative z-10 bg-white bg-opacity-90 shadow-md font-poppins">
        <nav className="container mx-auto px-5 py-3">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              WBPA-QA
            </Link>
            <div className="space-x-4">
              <Link to="/login" className="text-blue-600 hover:text-blue-800 transition duration-300">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-6 py-16 text-center">
        <motion.h1
          className="text-5xl font-bold mb-4 text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Water Body Properties Analyzer <br/>for Quality Assessment
        </motion.h1>
        <motion.p
          className="text-xl mb-8 text-black-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Harness the power of AI to ensure clean and safe water for your community.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            to="/register"
            className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Get Started
          </Link>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-800">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<WaterIcon size={40} />}
            title="Real-time Analysis"
            description="Get instant water quality predictions based on the latest data."
          />
          <FeatureCard
            icon={<BarChartIcon size={40} />}
            title="Detailed Analytics"
            description="Visualize trends and patterns in water quality over time."
          />
          <FeatureCard
            icon={<UserIcon size={40} />}
            title="User-friendly Dashboard"
            description="Access all your data and insights from an intuitive interface."
          />
          <FeatureCard
            icon={<ShieldIcon size={40} />}
            title="Data Security"
            description="Your data is protected with state-of-the-art encryption."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 bg-blue-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to ensure water safety?</h2>
          <p className="text-xl mb-8">Join thousands of communities already using our platform.</p>
          <Link
            to="/register"
            className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition duration-300"
          >
            Join Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; 2024 WBPA-QA. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

const FeatureCard = ({ icon, title, description }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      className="bg-white p-6 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}

export default LandingPage


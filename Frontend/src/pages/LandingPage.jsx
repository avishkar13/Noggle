
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import LandingNavbar from '../components/LandingNavbar'

// Animation variants
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.3
    }
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeOut' } }
}

const LandingPage = () => {
  return (
     
   
    <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 h-screen w-full">
      <LandingNavbar />

      <div className='md:h-2/3 w-[80vw] bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 borde border-slate-300 mx-auto mt-10 flex flex-col-reverse items-center justify-center md:flex-row  rounded-2xl shadow-2xl'>

        {/* Left Side with Text */}
        <motion.div
          className="text-white w-[90%] md:w-1/2 h-full flex flex-col justify-center items-center md:px-10 py-16 "
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.h1 className=" text-xl md:text-4xl font-extrabold mb-6 text-center " variants={fadeUp}>
            Chat Smarter with Noggle
          </motion.h1>

          <motion.p className="md:text-lg text-center mb-8 leading-relaxed" variants={fadeUp}>
            Connect with your friends and family in a whole new way with Noggle.
            Our chat platform makes it easy to have meaningful conversations and stay
            connected, no matter where you are.
          </motion.p>

          <motion.div variants={fadeUp}>
            <Link to="/login">
              <button className="bg-white text-blue-500 font-semibold px-6 py-3 rounded-full shadow hover:bg-slate-200 hover:scale-105 transition duration-300">
                Get Started
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Side with Logo and Animation */}
        <div className="relative w-64 h-64 flex items-center justify-center my-auto mx-auto">
          {/* Radiating Pulses */}
          <div className="pulse-ring"></div>
          <div className="pulse-ring scale-125"></div>
          <div className="pulse-ring scale-[1.5]"></div>

          {/* Center N */}
          <div className="z-10 w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-xl">
            NOGGLE
          </div>

          {/* Orbiting Icons */}
          <div className="absolute w-full h-full flex items-center justify-center pointer-events-none pt-5">
            <div className="orbit w-full h-full absolute">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white shadow-lg">
                  💬
                </div>
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg">
                  🗨️
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>



  )
}

export default LandingPage

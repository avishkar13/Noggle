import React from 'react'
import { Link } from 'react-router-dom'

const LandingNavbar = () => {
  return (
    <>
      <div className='flex justify-between items-center mx-8 p-6 '>
       <div>
        <img src="./assets/logo.png" alt="Noggle" 
        className='h-16 w-44 rounded-full'
        />
       </div>

        <div className="flex gap-4">
 
  {/* <Link to="/login" >
  <button className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:from-purple-600 hover:via-purple-700 hover:to-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center shadow-md h-12 w-28 ">
    Login
  </button>
  </Link>

<Link to="/signup" >
  <button className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:from-purple-600 hover:via-purple-700 hover:to-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center shadow-md h-12 w-28">
    Signup 
  </button>
  </Link> */}
</div>

      </div>
    </>
  )
}

export default LandingNavbar

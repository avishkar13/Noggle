import React from 'react'

const Login = () => {
  return (
    <div className="main bg-slate-200 h-[100vh] w-[100vw]">
      <div className="logo">
        <img src="/images/Noggle_logo.png" alt="logo" className="h-40 w-40 rounded-full p-4 " />
      </div>
      <div className='flex flex-col items-center justify-between p-4 border-4 border-slate-700  w-1/2 min-h-[50vh] rounded-md mx-auto'>
        <form className='flex flex-col items-center w-2/3 '>
          <h1 className='text-3xl font-bold text-center m-4'>Welcome Back !!</h1>
         <input type="text" placeholder="Enter your Mobile number" className='border-2 border-slate-700 text-center rounded-md m-4 p-2 w-1/2' />
         <button className='border-2 bg-blue-500 border-slate-700 text-center rounded-md m-4 p-2 w-1/4' >Send OTP</button>
        </form>
        <p className='text-blue-800'>Dont have an account? Create one now!</p>
      </div>
    </div>
  )
}

export default Login

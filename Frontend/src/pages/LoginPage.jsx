import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { useAuthStore } from '../store/useAuthStore';
import { Loader2 } from 'lucide-react';

const LoginPage = () => {
  const { isLoggingIn, login } = useAuthStore();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login({ email, password });
    if (success) {
      navigate('/home');
    }
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-[url('/assets/loginbg.jpg')] bg-cover bg-center relative flex items-center justify-center px-4 sm:px-6 lg:px-8">

        {/* Main Container */}
        <div className="w-full max-w-6xl 2xl:max-w-[80vw] 2xl:w-[80%] h-auto lg:h-[80vh] rounded-3xl overflow-hidden backdrop-blur-sm bg-white/10 shadow-2xl flex flex-col-reverse lg:flex-row border border-white/30">

          {/* Left: Login Form */}
          <div className="w-full lg:w-[60%]  text-white flex flex-col justify-center px-6 sm:px-10 lg:px-12 py-10 relative">
            <div className="absolute top-6 left-4 hidden lg:block">
              <img src="/assets/logo.png" alt="Noggle" className="h-16 w-36 rounded-full" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold font-serif mb-6">Welcome Back!!</h2>

            <form onSubmit={handleLogin} className="flex flex-col gap-6">
              <div className="flex flex-col relative w-full">
                <label className="input validator w-full sm:w-3/4">
                  Email
                  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="3.5" fill="none" stroke="currentColor">
                      <rect width="20" height="18" x="2" y="6" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </g>
                  </svg>
                  <input
                    type="email"
                    placeholder="mail@site.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                  />
                </label>
                <div className="validator-hint hidden font-bold">Enter valid email address</div>
              </div>

              <div className="flex flex-col relative w-full">
                <label className="input validator w-full sm:w-3/4">
                  Password
                  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="3.5" fill="none" stroke="currentColor">
                      <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z" />
                      <circle cx="16.5" cy="8" r=".5" fill="currentColor" />
                    </g>
                  </svg>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="*********"
                    minLength="8"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must include number, lowercase & uppercase letter"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer text-sm text-white"
                  >
                    {showPassword ? ( 
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18M17.94 17.94C16.24 19.25 14.21 20 12 20c-5 0-9.27-3.11-11-8 0 0 1.02-2.36 3.18-4.28M10.6 10.6a3 3 0 014.24 4.24" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 12C3 7 7.5 4 12 4s9 3 11 8c-2 5-6.5 8-11 8S3 17 1 12zm11 3a3 3 0 100-6 3 3 0 000 6z" />
                      </svg>
                    )}
                  </span>
                </label>
                <p className="validator-hint hidden font-bold">
                  Must be 8+ characters with a number, lowercase & uppercase letter
                </p>
              </div>

              <button
                className="mt-4 bg-white text-purple-700 font-semibold py-2 rounded-md hover:bg-purple-200 hover:scale-105 duration-300 transition-all shadow-md w-1/2"
                type="submit"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : 'Login'}
              </button>
            </form>

            <p className="mt-6 text-sm text-violet-300">
              Don't have an account?{' '}
              <Link to="/signup" className="text-white hover:text-blue-300 hover:underline transition duration-200">
                Sign up
              </Link>
            </p>
          </div>

          {/* Right: Image Section */}
          <div className="w-full lg:w-[40%] relative h-64 sm:h-80 lg:h-full">
            <img
              src="/assets/loginhero.jpg"
              alt="Login Visual"
              className="w-full h-full object-cover rounded-t-3xl lg:rounded-none"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20" />
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default LoginPage;
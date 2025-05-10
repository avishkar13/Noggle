import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageWrapper from '../components/PageWrapper';
import { useAuthStore } from '../store/useAuthStore';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';

const SignupPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error('Please enter a valid name');
      return false;
    }
    if (!formData.email) {
      toast.error('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      toast.error('Please enter a valid password');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const success = await signup(formData);
    if (success) {
      navigate('/home');
    }
  };

  return (
    <PageWrapper>
      <div className="min-h-screen bg-[url('/assets/loginbg.jpg')] bg-cover bg-center flex items-center justify-center px-4">
        <div className="w-full max-w-6xl h-[80vh] rounded-3xl overflow-hidden backdrop-blur-sm bg-white/10 shadow-2xl flex border border-white/30">
          <div className="w-[40%] relative">
            <img
              src="/assets/loginhero.jpg"
              alt="Signup Visual"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20" />
          </div>

          <div className="w-[60%] text-white flex flex-col justify-center pr-12 py-10 relative text-right">
            <div className="absolute top-6 right-4">
              <img src="/assets/logo.png" alt="Noggle" className="h-16 w-36 rounded-full" />
            </div>

            <h2 className="text-3xl font-bold font-serif mb-8">Create your Noggle account now!</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <label className="input validator w-3/4 mx-auto">
                Name
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  pattern="[A-Za-z\s\-]{3,30}"
                  title="3-30 letters, spaces or dashes only"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </label>

              <label className="input validator w-3/4 mx-auto">
                Email
                <input
                  type="email"
                  required
                  placeholder="mail@site.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </label>

              <label className="input validator w-3/4 mx-auto">
                Password
                <div className="relative w-full">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="*********"
                    minLength="8"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must be at least 8 characters including number, lowercase and uppercase letter"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pr-10"
                  />
                  <span
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer text-sm text-white"
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 3l18 18M17.94 17.94C16.24 19.25 14.21 20 12 20c-5 0-9.27-3.11-11-8 0 0 1.02-2.36 3.18-4.28M10.6 10.6a3 3 0 014.24 4.24"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-5 h-5 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 12C3 7 7.5 4 12 4s9 3 11 8c-2 5-6.5 8-11 8S3 17 1 12zm11 3a3 3 0 100-6 3 3 0 000 6z"
                        />
                      </svg>
                    )}
                  </span>

                </div>
              </label>

              <button
                type="submit"
                className="mt-4 bg-white text-purple-700 font-semibold py-2 rounded-md hover:bg-purple-200 hover:scale-105 duration-300 transition-all shadow-md w-1/2 mx-auto flex justify-center items-center"
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <>
                    <Loader2 className="animate-spin mr-2" size={16} />
                    Loading...
                  </>
                ) : (
                  'Sign Up'
                )}
              </button>
            </form>

            <p className="mt-6 text-sm text-violet-300 text-center">
              Already have an account?{' '}
              <Link to="/login" className="text-white hover:text-blue-300 hover:underline transition duration-200">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default SignupPage;

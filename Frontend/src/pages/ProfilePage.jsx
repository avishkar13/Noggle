import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import { useAuthStore } from '../store/useAuthStore';

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image }); 
    };
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[90vh] bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a]">
        <div className="bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 backdrop-saturate-100 backdrop-contrast-125 shadow-lg rounded-xl p-6 w-full md:w-[80vw] min-h-[70vh] flex flex-col items-center justify-evenly mx-auto">
          <div>
            <h1 className="text-4xl font-bold font-mono mb-2 text-center text-white">Profile</h1>
            <h2 className="text-2xl font-medium font-mono mb-6 text-center text-white">Your Profile Information</h2>
          </div>

          {/* Image and Basic Info */}
          <div className="flex items-center gap-16 w-full max-w-3xl mb-6 relative">
            <div
              className="relative cursor-pointer group"
              onClick={triggerFileInput} // ✅ Trigger file input
            >
              <img
                src={ authUser.profilePic || "/assets/profile.svg"}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover group-hover:opacity-80 transition"
              />
              <img
                src="/assets/camera.svg"
                alt="Upload"
                className="w-10 h-10 absolute bottom-0 right-0 bg-white p-1 rounded-full shadow-md hover:scale-105 transition"
              />
              <input
                ref={fileInputRef} // ✅ Ref here
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={isUpdatingProfile}
              />
              <div className='absolute top-32 left-0  '>
              {isUpdatingProfile && (
              <p className="text-yellow-500 mt-2 animate-pulse">Updating profile...</p>
            )}
              </div>
             
            </div>

            <div className="flex flex-col font-mono text-white">
              <p className="text-xl font-semibold">
                <span className="text-2xl">Name:</span> {authUser?.fullName || 'John Doe'}
              </p>
              <p className="text-lg font-semibold">
                <span className="text-2xl">Email:</span> {authUser?.email || 'example@email.com'}
              </p>
            </div>
          </div>

          {/* Account Info */}
          <div className="w-full max-w-3xl text-white p-4 font-mono rounded-lg">
            <p className="text-lg mb-2">
              <span className="font-semibold">Member Since:</span>{' '}
              <span className="underline">
                {authUser?.createdAt ? new Date(authUser.createdAt).toLocaleDateString() : 'N/A'}
              </span>
            </p>
            <p className="text-lg">
              <span className="font-semibold">Status:</span>{' '}
              <span className="text-green-500 font-semibold">Active</span>
            </p>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

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
      <div className="flex justify-center items-center min-h-[92vh] bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a] p-4">
        <div className="w-full max-w-4xl bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 text-white h-[85vh] md:h-[70vh] overflow-y-auto md:overflow-visible ">
          <h1 className="text-4xl font-bold text-center mb-1 font-mono">Profile</h1>
          <p className="text-lg text-center mb-6 font-mono">Your Profile Information</p>

          <div className="flex flex-col items-center mb-8 relative">
            <div
              className="relative cursor-pointer group"
              onClick={triggerFileInput}
            >
              <img
                src={authUser.profilePic || "/assets/profile.svg"}
                alt="Profile"
                className="w-36 h-36 rounded-full object-cover border-4 border-blue-500 shadow-md group-hover:opacity-80 transition"
              />
              <img
                src="/assets/camera.svg"
                alt="Upload"
                className="w-9 h-9 absolute bottom-0 right-0 bg-white p-1 rounded-full shadow hover:scale-105 transition"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                disabled={isUpdatingProfile}
              />
            </div>
            {isUpdatingProfile && (
              <p className="text-yellow-400 mt-3 animate-pulse text-sm font-medium">
                Updating profile picture...
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-mono">
            <div className="flex flex-col">
              <label className="text-sm mb-1 text-white font-semibold">Full Name</label>
              <input
                type="text"
                value={authUser?.fullName || 'John Doe'}
                readOnly
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-1 text-white font-semibold">Email</label>
              <input
                type="email"
                value={authUser?.email || 'example@email.com'}
                readOnly
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-1 text-white font-semibold">Member Since</label>
              <input
                type="text"
                value={authUser?.createdAt ? new Date(authUser.createdAt).toLocaleDateString() : 'N/A'}
                readOnly
                className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:outline-none"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm mb-1 text-white font-semibold">Status</label>
              <input
                type="text"
                value="Active"
                readOnly
                className="bg-green-600/30 border border-white/20 rounded-lg px-4 py-2 text-green-300 font-semibold focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

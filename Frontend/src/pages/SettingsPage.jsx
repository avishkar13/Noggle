import { useState } from 'react';
import Navbar from '../components/Navbar';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const SettingsPage = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const { deleteAccount, isDeletingAccount, isChangingPassword, changePassword, logout } = useAuthStore();
  const navigate = useNavigate();

  const handlePasswordChange = async () => {
    if (!password || !newPassword) {
      toast.error("Both password fields are required");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    const confirmed = window.confirm("Are you sure?");
    if (confirmed) {
      await changePassword({ oldPassword: password, newPassword });
      setPassword('');
      setNewPassword('');
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Are you sure?");
    if (confirmed) {
      await deleteAccount(navigate);
    }
  };

  const handleLogout = async () => {
    await logout();  
    navigate('/');
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center min-h-[90vh] px-4 bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a] transition font-mono">
        <div className="w-full md:w-[80vw] xl:w-[60vw] min-h-[70vh] bg-white/10 backdrop-blur-md rounded-2xl shadow-xl   p-6 space-y-6 text-white">
          <h1 className="text-3xl font-bold font-mono text-center">Settings</h1>

          {/* Change Password */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Change Password</h2>
            <div className="flex flex-col gap-2">
              <input
                type="password"
                placeholder="Current Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full p-2 rounded bg-white/30 border border-white/50 placeholder-white text-white"
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                className=" w-full p-2 rounded bg-white/30 border border-white/50 placeholder-white text-white"
              />
              <button
                onClick={handlePasswordChange}
                disabled={isChangingPassword}
                className={`w-full px-4 py-2 rounded bg-green-600 text-white transition ${isChangingPassword ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-700'
                  }`}
              >
                {isChangingPassword ? 'Updating...' : 'Change Password'}
              </button>
            </div>
          </div>

          {/* Email Notifications */}
          <div>
            <h2 className="text-xl font-semibold mb-2">Email Notifications</h2>
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={() => setEmailNotifications(prev => !prev)}
                className="toggle toggle-md border border-black "
              />
              <span>{emailNotifications ? 'Enabled' : 'Disabled'}</span>
            </label>
          </div>

          {/* Logout & Delete Account */}
          <div>
            <div className="mb-4">
              <h2 className="text-xl font-semibold mb-2 text-blue-300">Logout</h2>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Logout
              </button>
            </div>

            <h2 className="text-xl font-semibold mb-2 text-red-300">Delete Account</h2>
            <button
              onClick={handleDeleteAccount}
              disabled={isDeletingAccount}
              className={`w-full px-4 py-2 rounded bg-red-600 text-white transition ${isDeletingAccount ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-700'
                }`}
            >
              {isDeletingAccount ? 'Deleting...' : 'Delete My Account'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPage;

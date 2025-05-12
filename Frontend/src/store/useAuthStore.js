import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from 'socket.io-client';

const BASE_URL = import.meta.env.MODE === 'development' ? "http://localhost:5000" : "/";


export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isDeletingAccount: false,
  isChangingPassword: false,
  isCheckingAuth: true, 
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({
        authUser: res.status === 200 ? res.data : null,
      });
      get().connectSocket();
    } catch (error) {
      console.error("Error checking auth:", error);
      set({ authUser: null, isCheckingAuth: false });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully!");
      get().connectSocket();
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Signup failed");
      return false;
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully!");
      get().connectSocket();
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
      return false;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const res = await axiosInstance.post("/auth/logout");
      if (res.status === 200) {
        set({ authUser: null });
        toast.success("Logged out successfully!");
        get().disconnectSocket();
      }
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error(error?.response?.data?.message || "Logout failed");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update", data);
      set({ authUser: res.data });

      toast.success("Profile updated successfully!");
      return true;
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error?.response?.data?.message || "Profile update failed");
      return false;
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  changePassword: async (data) => {
    set({ isChangingPassword: true });
    try {
      const res = await axiosInstance.put("/auth/updatePassword", data);
      if (res.status === 200) {
        toast.success("Password updated successfully!");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error(error?.response?.data?.message || "Password Update Failed");
    } finally {
      set({ isChangingPassword: false });
    }
  },


  deleteAccount: async (navigate) => {
    set({ isDeletingAccount: true });
    try {
      const res = await axiosInstance.delete("/auth/delete");
      if (res.status === 200) {
        set({ authUser: null });
        toast.success("Account deleted successfully!");
        navigate('/login'); // ⬅ Redirect here
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      toast.error(error?.response?.data?.message || "Account Deletion Failed");
    } finally {
      set({ isDeletingAccount: false });
    }
  },

connectSocket: async () => {
  const { authUser } = get();
  const existingSocket = get().socket;

  // Prevent duplicate connections
  if (!authUser || existingSocket?.connected) return;

  const socket = io(BASE_URL, {
    query: {
      userId: authUser._id,
    },
  });

  // ✅ Optional: helpful logging
  // socket.on("connect", () => {
  //   console.log("✅ Socket connected:", socket.id);
  // });

  // socket.on("disconnect", () => {
  //   console.log("❌ Socket disconnected");
  // });

  socket.on("getOnlineUsers", (userIds) => {
    set({ onlineUsers: userIds });
    // console.log("📡 Online users:", userIds);
  });

  //Save socket in global store
  set({ socket });
},
  disconnectSocket: async () => {
    if (!get().socket?.connected) return;
    get().socket.disconnect()
  }


}));

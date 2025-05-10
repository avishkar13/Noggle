import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isDeletingAccount: false, 
  isChangingPassword:false,
  isCheckingAuth: true,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({
        authUser: res.status === 200 ? res.data : null,
        isCheckingAuth: false,
      });
    } catch (error) {
      console.error("Error checking auth:", error);
      set({ authUser: null, isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully!");
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
      return true;
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
      return false;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async ()=>{
    try {
        const res = await axiosInstance.post("/auth/logout");
        if (res.status === 200) {
            set({ authUser: null });
            toast.success("Logged out successfully!");
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



}));

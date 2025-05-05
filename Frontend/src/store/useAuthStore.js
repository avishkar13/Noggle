import { create } from "zustand";
import { axiosInstance } from "../lib/axios";


export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
 
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check");

            if (res.status === 200) {
                set({ authUser: res.data, isCheckingAuth: false });
            } else {
                set({ authUser: null, isCheckingAuth: false });
            }
        } catch (error) {
            console.error("Error checking auth:", error);
            set({ authUser: null, isCheckingAuth: false });
        }finally {
            set({ isCheckingAuth: false });
        }
    }

}));
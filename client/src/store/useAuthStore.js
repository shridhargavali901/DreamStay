import { create } from "zustand";
import axios from "axios";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,

  login: async (email, password) => {
    try {
      const res = await axios.post(
        "https://dreamstay-2jev.onrender.com/api/auth/login",
        { email, password },
      );
      set({ user: res.data.user, token: res.data.token });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  },

  register: async (name, email, password) => {
    try {
      const res = await axios.post(
        "https://dreamstay-2jev.onrender.com/api/auth/register",
        { name, email, password },
      );
      set({ user: res.data.user, token: res.data.token });
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  },

  updateWishlist: (newWishlist) =>
    set((state) => {
      const updatedUser = { ...state.user, wishlist: newWishlist };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return { user: updatedUser };
    }),

  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
}));

export default useAuthStore;

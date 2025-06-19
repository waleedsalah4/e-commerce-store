import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, RegisterData, LoginCredentials } from "@/types";
import { useCartStore } from "@/store/useCartStore";
import toast from "react-hot-toast";

interface AuthState {
  user: User | null;
  isLoading: boolean;

  // Actions
  register: (
    userData: RegisterData
  ) => Promise<{ success: boolean; message: string }>;
  login: (
    credentials: LoginCredentials
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  setLoading: (loading: boolean) => void;

  // Getters
  isAuthenticated: () => boolean;
  getUserDisplayName: () => string;
}

// Helper functions (can be moved to utils if needed)
const getAllUsers = (): User[] => {
  const users = localStorage.getItem("users");
  return users ? JSON.parse(users) : [];
};

const saveUsers = (users: User[]) => {
  localStorage.setItem("users", JSON.stringify(users));
};

const generateUserId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const userExists = (email: string, username: string): boolean => {
  const users = getAllUsers();
  return users.some((u) => u.email === email || u.username === username);
};

const findUserByEmail = (email: string): User | null => {
  const users = getAllUsers();
  return users.find((u) => u.email === email) || null;
};

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,

      setLoading: (loading: boolean) => set({ isLoading: loading }),

      register: async (userData: RegisterData) => {
        set({ isLoading: true });

        try {
          // Validation
          if (!userData.firstName.trim()) {
            return { success: false, message: "First name is required" };
          }

          if (!userData.username.trim()) {
            return { success: false, message: "Username is required" };
          }

          if (userData.username.length < 3) {
            return {
              success: false,
              message: "Username must be at least 3 characters long",
            };
          }

          if (!userData.email.trim()) {
            return { success: false, message: "Email is required" };
          }

          if (!isValidEmail(userData.email)) {
            return {
              success: false,
              message: "Please enter a valid email address",
            };
          }

          if (!userData.password) {
            return { success: false, message: "Password is required" };
          }

          if (userData.password.length < 6) {
            return {
              success: false,
              message: "Password must be at least 6 characters long",
            };
          }

          // Check if user already exists
          if (userExists(userData.email, userData.username)) {
            return {
              success: false,
              message: "User with this email or username already exists",
            };
          }

          // Create new user
          const newUser: User = {
            id: generateUserId(),
            firstName: userData.firstName.trim(),
            lastName: userData.lastName.trim(),
            username: userData.username.trim(),
            email: userData.email.toLowerCase().trim(),
            password: userData.password, // In real app, this should be hashed
            address: userData.address?.trim(),
            createdAt: new Date().toISOString(),
          };

          // Save user to users array
          const users = getAllUsers();
          users.push(newUser);
          saveUsers(users);

          // Initialize empty cart for new user
          localStorage.setItem(`cart_${newUser.id}`, JSON.stringify([]));

          // Auto-login the user
          set({ user: newUser });

          // Load user's cart
          const savedCart = localStorage.getItem(`cart_${newUser.id}`);
          useCartStore
            .getState()
            .setCart(savedCart ? JSON.parse(savedCart) : []);

          toast.success("Registration successful! Welcome aboard!");
          return { success: true, message: "Registration successful" };
        } catch (error) {
          return {
            success: false,
            message: "Registration failed. Please try again.",
          };
        } finally {
          set({ isLoading: false });
        }
      },

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true });

        try {
          // Validation
          if (!credentials.email.trim()) {
            return { success: false, message: "Email is required" };
          }

          if (!credentials.password) {
            return { success: false, message: "Password is required" };
          }

          // Find user
          const foundUser = findUserByEmail(
            credentials.email.toLowerCase().trim()
          );

          if (!foundUser) {
            return { success: false, message: "Invalid email or password" };
          }

          // Check password
          if (foundUser.password !== credentials.password) {
            return { success: false, message: "Invalid email or password" };
          }

          // Login successful
          set({ user: foundUser });

          // Load user's cart
          const savedCart = localStorage.getItem(`cart_${foundUser.id}`);
          useCartStore
            .getState()
            .setCart(savedCart ? JSON.parse(savedCart) : []);

          toast.success(`Welcome back, ${foundUser.firstName}!`);
          return { success: true, message: "Login successful" };
        } catch (error) {
          console.error("Login error:", error);
          return { success: false, message: "Login failed. Please try again." };
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        set({ user: null });
        // Clear the cart when logging out
        useCartStore.getState().setCart([]);
        toast.success("Logged out successfully");
      },

      isAuthenticated: () => {
        return get().user !== null;
      },

      getUserDisplayName: () => {
        const { user } = get();
        if (!user) return "";
        return `${user.firstName} ${user.lastName}`;
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({ user: state.user }), // Only persist the user
    }
  )
);

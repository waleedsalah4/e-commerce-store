import { useState, useEffect } from "react";
import { useCartStore } from "@/store/useCartStore";
import type { User, RegisterData, LoginCredentials } from "@/types";
import toast from "react-hot-toast";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [isLoading, setIsLoading] = useState(false);

  // Save current user to localStorage whenever user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [user]);

  useEffect(() => {
    if (user?.id) {
      const saved = localStorage.getItem(`cart_${user.id}`);
      useCartStore.getState().setCart(saved ? JSON.parse(saved) : []);
    }
  }, [user?.id]);

  // Get all users from localStorage
  const getAllUsers = (): User[] => {
    const users = localStorage.getItem("users");
    return users ? JSON.parse(users) : [];
  };

  // Save users array to localStorage
  const saveUsers = (users: User[]) => {
    localStorage.setItem("users", JSON.stringify(users));
  };

  // Generate unique ID for new users
  const generateUserId = (): string => {
    return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  // Validate email format
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Check if user exists by email or username
  const userExists = (email: string, username: string): boolean => {
    const users = getAllUsers();
    return users.some((u) => u.email === email || u.username === username);
  };

  // Find user by email
  const findUserByEmail = (email: string): User | null => {
    const users = getAllUsers();
    return users.find((u) => u.email === email) || null;
  };

  // Register new user
  const register = async (
    userData: RegisterData
  ): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);

    try {
      // Validation
      if (!userData.firstName.trim()) {
        return { success: false, message: "First name is required" };
      }

      if (!userData.lastName.trim()) {
        return { success: false, message: "Last name is required" };
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
      setUser(newUser);

      toast.success("Registration successful! Welcome aboard!");
      return { success: true, message: "Registration successful" };
    } catch (error) {
      // console.error("Registration error:", error);
      return {
        success: false,
        message: "Registration failed. Please try again.",
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Login user
  const login = async (
    credentials: LoginCredentials
  ): Promise<{ success: boolean; message: string }> => {
    setIsLoading(true);

    try {
      // Validation
      if (!credentials.email.trim()) {
        return { success: false, message: "Email is required" };
      }

      if (!credentials.password) {
        return { success: false, message: "Password is required" };
      }

      // Find user
      const foundUser = findUserByEmail(credentials.email.toLowerCase().trim());

      if (!foundUser) {
        return { success: false, message: "Invalid email or password" };
      }

      // Check password
      if (foundUser.password !== credentials.password) {
        return { success: false, message: "Invalid email or password" };
      }

      // Login successful
      setUser(foundUser);
      toast.success(`Welcome back, ${foundUser.firstName}!`);
      return { success: true, message: "Login successful" };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: "Login failed. Please try again." };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout user
  const logout = () => {
    setUser(null);
    toast.success("Logged out successfully");
  };

  // Get user's display name
  const getUserDisplayName = (): string => {
    if (!user) return "";
    return `${user.firstName} ${user.lastName}`;
  };

  // Check if user is authenticated
  const isAuthenticated = (): boolean => {
    return user !== null;
  };

  return {
    user,
    isLoading,
    isAuthenticated: isAuthenticated(),
    register,
    login,
    logout,
    getUserDisplayName,
  };
};

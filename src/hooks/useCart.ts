import { useState, useEffect } from "react";
import type { Product } from "@/types";
import toast from "react-hot-toast";

interface CartItem extends Product {
  quantity: number;
  addedAt: string;
}

interface UseCartProps {
  userId?: string | null;
}

export const useCart = ({ userId }: UseCartProps = {}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get cart key for localStorage - only for authenticated users
  const getCartKey = (): string | null => {
    return userId ? `cart_${userId}` : null;
  };

  // Load cart from localStorage - only for authenticated users
  const loadCart = (): CartItem[] => {
    try {
      const cartKey = getCartKey();
      if (!cartKey) return []; // Return empty cart for non-authenticated users

      const savedCart = localStorage.getItem(cartKey);
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error loading cart:", error);
      return [];
    }
  };

  // Save cart to localStorage - only for authenticated users
  const saveCart = (cartData: CartItem[]) => {
    try {
      const cartKey = getCartKey();
      if (!cartKey) return; // Don't save for non-authenticated users

      localStorage.setItem(cartKey, JSON.stringify(cartData));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  };

  // Initialize cart when userId changes or component mounts
  useEffect(() => {
    const initialCart = loadCart();
    setCart(initialCart);
  }, [userId]);

  // Save cart whenever it changes
  useEffect(() => {
    saveCart(cart);
  }, [cart, userId]);

  // Add item to cart - only for authenticated users
  const addToCart = (product: Product, quantity: number = 1) => {
    // Prevent adding to cart if user is not authenticated
    if (!userId) {
      toast.error("Please log in to add items to cart", {
        duration: 4000,
        position: "bottom-right",
      });
      return;
    }

    if (quantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    setIsLoading(true);

    try {
      setCart((prev) => {
        const existingItemIndex = prev.findIndex(
          (item) => item.id === product.id
        );

        if (existingItemIndex >= 0) {
          // Update existing item
          const updatedCart = [...prev];
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            quantity: updatedCart[existingItemIndex].quantity + quantity,
          };
          return updatedCart;
        } else {
          // Add new item
          const newItem: CartItem = {
            ...product,
            quantity,
            addedAt: new Date().toISOString(),
          };
          return [...prev, newItem];
        }
      });

      toast.success(
        `${product.title} ${quantity > 1 ? `(×${quantity})` : ""} added to cart`,
        {
          duration: 3000,
          position: "bottom-right",
        }
      );
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    } finally {
      setIsLoading(false);
    }
  };

  // Remove item from cart completely - only for authenticated users
  const removeFromCart = (productId: number) => {
    if (!userId) {
      toast.error("Please log in to manage your cart");
      return;
    }

    setIsLoading(true);

    try {
      setCart((prev) => {
        const item = prev.find((item) => item.id === productId);
        const updatedCart = prev.filter((item) => item.id !== productId);

        if (item) {
          toast.success(`${item.title} removed from cart`);
        }

        return updatedCart;
      });
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove item from cart");
    } finally {
      setIsLoading(false);
    }
  };

  // Update item quantity - only for authenticated users
  const updateQuantity = (productId: number, newQuantity: number) => {
    if (!userId) {
      toast.error("Please log in to manage your cart");
      return;
    }

    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setIsLoading(true);

    try {
      setCart((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
      toast.error("Failed to update quantity");
    } finally {
      setIsLoading(false);
    }
  };

  // Increase item quantity by 1 - only for authenticated users
  const increaseQuantity = (productId: number) => {
    if (!userId) {
      toast.error("Please log in to manage your cart");
      return;
    }

    const item = cart.find((item) => item.id === productId);
    if (item) {
      updateQuantity(productId, item.quantity + 1);
    }
  };

  // Decrease item quantity by 1 - only for authenticated users
  const decreaseQuantity = (productId: number) => {
    if (!userId) {
      toast.error("Please log in to manage your cart");
      return;
    }

    const item = cart.find((item) => item.id === productId);
    if (item) {
      updateQuantity(productId, item.quantity - 1);
    }
  };

  // Clear entire cart - only for authenticated users
  const clearCart = () => {
    if (!userId) {
      toast.error("Please log in to manage your cart");
      return;
    }

    setIsLoading(true);

    try {
      setCart([]);
      toast.success("Cart cleared");
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
    } finally {
      setIsLoading(false);
    }
  };

  // Reorder cart items (for drag & drop functionality) - only for authenticated users
  const reorderCart = (newOrder: CartItem[]) => {
    if (!userId) {
      toast.error("Please log in to manage your cart");
      return;
    }
    setCart(newOrder);
  };

  // Check if item exists in cart
  const isInCart = (productId: number): boolean => {
    return cart.some((item) => item.id === productId);
  };

  // Get item quantity in cart
  const getItemQuantity = (productId: number): number => {
    const item = cart.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Get total number of items
  const getTotalItems = (): number => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Get total price
  const getTotalPrice = (): number => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Get formatted total price
  const getFormattedTotal = (): string => {
    const total = getTotalPrice();
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(total);
  };

  // Get cart summary
  const getCartSummary = () => {
    const totalItems = getTotalItems();
    const totalPrice = getTotalPrice();
    const uniqueItems = cart.length;

    return {
      totalItems,
      totalPrice,
      uniqueItems,
      formattedTotal: getFormattedTotal(),
      isEmpty: cart.length === 0,
    };
  };

  // Check if user is authenticated
  const isAuthenticated = (): boolean => {
    return !!userId;
  };

  return {
    cart,
    isLoading,
    isAuthenticated: isAuthenticated(),
    addToCart,
    removeFromCart,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    clearCart,
    reorderCart,
    isInCart,
    getItemQuantity,
    getTotalItems,
    getTotalPrice,
    getFormattedTotal,
    getCartSummary,
  };
};

import { create } from "zustand";
import type { Product } from "@/types";

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  addToCart: (product: Product, userId: string) => void;
  removeFromCart: (productId: number, userId: string) => void;
  updateQuantity: (productId: number, quantity: number, userId: string) => void;
  clearCart: (userId: string) => void;
  reorderCart: (newOrder: CartItem[], userId: string) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const getCartKey = (userId: string) => `cart_${userId}`;

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],

  setCart: (cart) => set({ cart }),

  addToCart: (product, userId) => {
    const cart = get().cart;
    const existing = cart.find((item) => item.id === product.id);
    let updatedCart;

    if (existing) {
      updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedCart = [...cart, { ...product, quantity: 1 }];
    }

    localStorage.setItem(getCartKey(userId), JSON.stringify(updatedCart));
    set({ cart: updatedCart });
  },

  removeFromCart: (productId, userId) => {
    const updatedCart = get().cart.filter((item) => item.id !== productId);
    localStorage.setItem(getCartKey(userId), JSON.stringify(updatedCart));
    set({ cart: updatedCart });
  },

  updateQuantity: (productId, quantity, userId) => {
    if (quantity < 1) return;

    const updatedCart = get().cart.map((item) =>
      item.id === productId ? { ...item, quantity } : item
    );

    localStorage.setItem(getCartKey(userId), JSON.stringify(updatedCart));
    set({ cart: updatedCart });
  },

  clearCart: (userId) => {
    localStorage.setItem(getCartKey(userId), JSON.stringify([]));
    set({ cart: [] });
  },

  reorderCart: (newOrder, userId) => {
    localStorage.setItem(getCartKey(userId), JSON.stringify(newOrder));
    set({ cart: newOrder });
  },

  getTotalItems: () =>
    get().cart.reduce((total, item) => total + item.quantity, 0),

  getTotalPrice: () =>
    get().cart.reduce((total, item) => total + item.quantity * item.price, 0),
}));

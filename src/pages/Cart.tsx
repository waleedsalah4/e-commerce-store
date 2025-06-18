import { useState } from "react";
// import { useCart } from "@/hooks/useCart";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useCartStore } from "@/store/useCartStore";
const Cart = () => {
  const { isAuthenticated, user } = useAuth();

  const {
    cart,
    removeFromCart,
    reorderCart,
    updateQuantity,
    getTotalPrice,
    clearCart,
  } = useCartStore();
  const [draggedItem, setDraggedItem] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedItem(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();

    if (draggedItem === null || draggedItem === dropIndex) {
      setDraggedItem(null);
      setDragOverIndex(null);
      return;
    }

    const newCart = [...cart];
    const draggedProduct = newCart[draggedItem];

    // Remove the dragged item
    newCart.splice(draggedItem, 1);

    // Insert at new position
    const adjustedDropIndex =
      draggedItem < dropIndex ? dropIndex - 1 : dropIndex;
    newCart.splice(adjustedDropIndex, 0, draggedProduct);

    reorderCart(newCart, user?.id || "");
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  if (!isAuthenticated && !user) {
    return (
      <div className="space-y-8 py-12 text-center">
        <h2 className="text-2xl font-bold">Please login to view your cart</h2>

        <Link
          to="/auth/login"
          className="w-fit cursor-pointer rounded-md bg-black px-6 py-3 text-white transition-colors hover:bg-black/80 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          Login
        </Link>
      </div>
    );
  }
  if (cart.length === 0) {
    return (
      <div className="space-y-4 py-12 text-center">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <p className="text-gray-600">
          Items would be added through your shopping interface
        </p>
        <Link
          to="/"
          className="w-fit cursor-pointer rounded-md bg-black px-6 py-3 text-white transition-colors hover:bg-black/80 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
        >
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <button
          className="bg-accent-foreground cursor-pointer rounded-md px-6 py-2 text-white"
          onClick={() => {
            if (user) {
              clearCart(user.id);
            }
          }}
        >
          Clear Cart
        </button>
      </div>
      <div className="mb-4 text-sm text-gray-600">
        💡 Drag and drop items to reorder them
      </div>

      <div className="space-y-4">
        {cart.map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={`relative flex cursor-move items-center space-x-4 rounded-lg bg-white p-4 shadow-md transition-all duration-200 hover:shadow-lg ${draggedItem === index ? "scale-105 rotate-2 transform opacity-50" : ""} ${dragOverIndex === index && draggedItem !== index ? "border-2 border-dashed border-blue-400" : "border border-gray-200"} `}
          >
            <div className="cursor-grab text-gray-400 active:cursor-grabbing">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11 18c0 1.1-.9 2-2 2s-2-.9-2-2 .9-2 2-2 2 .9 2 2zm-2-8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm6 4c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </div>
            <img
              src={item.image}
              alt={item.title}
              className="h-20 w-20 object-contain"
            />
            <div className="flex-grow">
              <h3 className="line-clamp-2 font-semibold">{item.title}</h3>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  if (user) {
                    updateQuantity(item.id, item.quantity - 1, user.id);
                  }
                }}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
              >
                -
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => {
                  if (user) {
                    updateQuantity(item.id, item.quantity + 1, user.id);
                  }
                }}
                className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <button
              onClick={() => {
                if (user) {
                  removeFromCart(item.id, user.id);
                }
              }}
              className="absolute top-1 right-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full p-1 text-red-600 transition-colors hover:bg-red-50 hover:text-red-800"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-xl font-semibold">Total:</span>
          <span className="text-2xl font-bold text-red-900">
            ${getTotalPrice().toFixed(2)}
          </span>
        </div>
        <button className="w-full cursor-pointer rounded-md bg-black px-6 py-3 text-white transition-colors hover:bg-black/80 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;

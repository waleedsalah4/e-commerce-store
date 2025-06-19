import { useParams } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";
import { Star, Truck, RefreshCcw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "@/services/api";
import { useAuth } from "@/store/useAuthStore";

import toast from "react-hot-toast";
import RecentProducts from "@/components/home/RecentProducts";

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const { isInCart, addToCart } = useCartStore();

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(Number(id)),
    enabled: !!id,
  });

  const handleAddToCart = () => {
    if (product && !isInCart(product.id)) {
      if (user) {
        addToCart(product, user.id);
        toast.success(`${product.title} Added to cart`);
      } else {
        toast.error(`You need to login to add items to cart`);
      }
    } else {
      toast.error(`item already in the cart`);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="black h-12 w-12 animate-spin rounded-full border-b-2"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="p-4 text-center text-red-600">
        <p>{error ? "Failed to fetch product details" : "Product not found"}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded-lg bg-white p-6">
          <img
            src={product.image}
            alt={product.title}
            className="h-96 w-full object-contain"
          />
        </div>
        <div className="flex flex-col rounded-lg bg-white p-6">
          <h1 className="mb-2 text-3xl font-bold">{product.title}</h1>
          <div className="mb-2 flex items-center gap-2">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="text-lg font-semibold">{product.rating.rate}</span>
            <span className="text-sm text-gray-500">
              ({product.rating.count} reviews)
            </span>
          </div>
          <p className="mb-4 text-2xl font-semibold text-red-900">
            ${product.price}
          </p>
          <p className="mb-6 text-gray-700">{product.description}</p>
          <button
            onClick={handleAddToCart}
            disabled={isInCart(product.id)}
            className={`mb-4 w-full rounded-md px-6 py-3 text-base font-semibold text-white transition-colors ${
              isInCart(product.id)
                ? "cursor-not-allowed bg-gray-200"
                : "cursor-pointer bg-black hover:bg-black/90 focus:outline-none"
            }`}
          >
            {isInCart(product.id) ? "In Cart" : "Add to Cart"}
          </button>
          {/* Info Box */}
          <div className="mt-2 rounded-lg border">
            <div className="mb-2 flex items-start gap-4 border-b p-4">
              <span>
                <Truck />
              </span>
              <div>
                <span className="block font-bold">Free Delivery</span>
                <span className="block text-sm text-gray-600">
                  Free delivery for all orders over $140
                </span>
              </div>
            </div>
            <div className="mb-2 flex items-start gap-4 p-4">
              <span>
                <RefreshCcw />
              </span>
              <div>
                <span className="block font-bold">Return Delivery</span>
                <span className="block text-sm text-gray-600">
                  Free 30 Days Delivery Returns
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 pt-60 pb-40">
        <h2 className="font-anton mb-10 text-center text-4xl font-bold uppercase">
          You Might also Like
        </h2>
        <RecentProducts />
      </section>
    </div>
  );
};

export default ProductDetails;

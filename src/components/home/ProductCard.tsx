import { Link } from "react-router-dom";
import type { Product } from "@/types";
import { Eye, Star } from "lucide-react";
// import { useCart } from "@/hooks/useCart";
import { useCartStore } from "@/store/useCartStore";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: Product;
  // onAddToCart: (product: Product) => void;
}

export function ProductCard({ product }: ProductCardProps) {
  const { user } = useAuth();
  const { addToCart } = useCartStore();
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.round(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="flex h-full flex-col rounded-lg border bg-white shadow-md transition-shadow hover:shadow-lg">
      <div className="group relative overflow-hidden">
        <Link
          to={`/product/${product.id}`}
          className="absolute top-2 right-2 z-20 flex size-8 items-center justify-center rounded-full bg-white text-black"
        >
          <Eye className="size-5" />
        </Link>
        <div className="overflow-hidden rounded-t-lg bg-[#fff] pt-[50%]">
          <img
            src={product.image}
            alt={product.title}
            className="absolute top-0 left-0 h-full w-full object-contain p-4"
          />
        </div>

        <button
          onClick={() => {
            if (user) {
              addToCart(product, user.id);
              toast.success(`${product.title} Added to cart`);
            } else {
              toast.error(`You need to login to add items to cart`);
            }
          }}
          className="absolute bottom-0 left-0 z-50 w-full translate-y-full cursor-pointer bg-black px-4 py-2 text-white transition-all duration-300 ease-in-out group-hover:translate-y-0 hover:bg-black/90 focus:outline-none"
        >
          Add to Cart
        </button>
      </div>
      <div className="font-montserrat flex flex-1 flex-col justify-between p-4">
        <Link to={`/product/${product.id}`} className="mb-2 block min-h-[48px]">
          <h3 className="line-clamp-2 text-base font-semibold text-black">
            {product.title}
          </h3>
        </Link>
        <div className="mt-auto flex items-center gap-4">
          <span className="text-xl font-bold text-red-900">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex">{renderStars(product.rating.rate)}</div>
          <span className="text-sm text-gray-500">
            ({product.rating.count})
          </span>
        </div>
      </div>
    </div>
  );
}

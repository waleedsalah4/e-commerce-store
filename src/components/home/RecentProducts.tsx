import { useQuery } from "@tanstack/react-query";
import { fetchRecentProducts } from "@/services/api";
import { ProductCard } from "@/components/home/ProductCard";
import type { Product } from "@/types";

interface Props {
  onAddToCart: (product: Product) => void;
}

function RecentProducts({ onAddToCart }: Props) {
  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["recentProducts"],
    queryFn: fetchRecentProducts,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="animate-pulse rounded-lg bg-white shadow-md"
          >
            <div className="h-48 rounded-t-lg bg-gray-200"></div>
            <div className="p-4">
              <div className="mb-2 h-4 rounded bg-gray-200"></div>
              <div className="h-4 w-1/2 rounded bg-gray-200"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center">
        <p className="text-red-600">Failed to load recent products</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}

export default RecentProducts;

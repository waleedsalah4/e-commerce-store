import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useCart } from "@/hooks/useCart";
import HeroSection from "@/components/home/HeroSection";
import RecentProducts from "@/components/home/RecentProducts";
import {
  fetchCategories,
  fetchProductsByCategory,
  type Product,
} from "@/services/api";
import CategoryProductsAccordion from "@/components/home/CategoryProductsAccordion";

const Home = () => {
  const { addToCart } = useCart();

  // Fetch categories
  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  // Fetch products for each category
  const {
    data: products = {},
    isLoading: isLoadingProducts,
    error: productsError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const productsByCategory: Record<string, Product[]> = {};
      for (const category of categories) {
        productsByCategory[category] = await fetchProductsByCategory(category);
      }
      return productsByCategory;
    },
    enabled: categories.length > 0,
  });

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    toast.success(`${product.title} added to cart`, {
      duration: 3000,
      position: "bottom-right",
    });
  };

  if (isLoadingCategories || isLoadingProducts) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-black"></div>
      </div>
    );
  }

  if (categoriesError || productsError) {
    return (
      <div className="p-4 text-center text-red-600">
        <p>
          {categoriesError?.message ||
            productsError?.message ||
            "An error occurred"}
        </p>
      </div>
    );
  }

  return (
    <div className="">
      {/* Hero Section */}
      <HeroSection />
      <section className="container mx-auto px-4 py-16">
        <h2 className="mb-8 text-start text-3xl font-bold">Recent Products</h2>
        <RecentProducts onAddToCart={handleAddToCart} />
      </section>
      {/* Categories Section */}
      <CategoryProductsAccordion
        categories={categories}
        products={products}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default Home;

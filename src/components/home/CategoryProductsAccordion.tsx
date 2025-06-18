import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ProductCard } from "@/components/home/ProductCard";
import type { Product } from "@/types";

interface CategoryProductsAccordionProps {
  categories: string[];
  products: Record<string, Product[]>;
  onAddToCart: (product: Product) => void;
}

export default function CategoryProductsAccordion({
  categories,
  products,
  onAddToCart,
}: CategoryProductsAccordionProps) {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="mb-8 text-start text-3xl font-bold">Product Categories</h2>
      <Accordion
        type="single"
        defaultValue={categories[0]}
        collapsible
        className="w-full border-0"
      >
        {categories.map((category) => (
          <AccordionItem
            key={category}
            value={category}
            className={`mb-4 rounded-lg border-0`}
          >
            <AccordionTrigger className="cursor-pointer border-b-0 px-6 py-4 text-xl font-semibold capitalize hover:no-underline">
              {category}
            </AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 lg:grid-cols-3">
                {products[category]?.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                  />
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

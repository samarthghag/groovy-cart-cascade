
import { useEffect, useRef } from "react";
import { ProductCard } from "./ProductCard";
import { Product } from "../hooks/useProducts";
import { useGSAPAnimations } from "../hooks/useGSAPAnimations";

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const ProductGrid = ({ products, onAddToCart }: ProductGridProps) => {
  const gridRef = useRef<HTMLDivElement>(null);
  const { animateStagger } = useGSAPAnimations();

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll('.product-card');
      animateStagger(Array.from(cards) as HTMLElement[], 0.1);
    }
  }, [products]);

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <span className="text-3xl">🔍</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div 
      ref={gridRef}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <ProductCard product={product} onAddToCart={onAddToCart} />
        </div>
      ))}
    </div>
  );
};


import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { ProductGrid } from "../components/ProductGrid";
import { Cart } from "../components/Cart";
import { Hero } from "../components/Hero";
import { Footer } from "../components/Footer";
import { useProducts } from "../hooks/useProducts";
import { useCart } from "../hooks/useCart";

const Index = () => {
  const { products, loading, error } = useProducts();
  const {
    cartItems,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    getTotalItems,
    getTotalPrice,
  } = useCart();

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];

  useEffect(() => {
    let filtered = products;
    
    if (selectedCategory !== "All") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <span className="text-3xl">⚠️</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Error loading products</h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header
        cartItemCount={getTotalItems()}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <Hero />
      
      <main className="container mx-auto px-4 py-8">
        <ProductGrid
          products={filteredProducts}
          onAddToCart={addToCart}
        />
      </main>
      
      <Footer />
      
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartItemQuantity}
        onRemoveItem={removeFromCart}
        totalPrice={getTotalPrice()}
      />
    </div>
  );
};

export default Index;

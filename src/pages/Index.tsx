
import { useState, useEffect } from "react";
import { Header } from "../components/Header";
import { ProductGrid } from "../components/ProductGrid";
import { Cart } from "../components/Cart";
import { Hero } from "../components/Hero";
import { Footer } from "../components/Footer";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  description: string;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.5,
    description: "Premium wireless headphones with noise cancellation",
    stock: 25
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    category: "Electronics",
    rating: 4.8,
    description: "Advanced fitness tracking with heart rate monitor",
    stock: 15
  },
  {
    id: "3",
    name: "Minimalist Desk Lamp",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
    category: "Home",
    rating: 4.3,
    description: "Modern LED desk lamp with adjustable brightness",
    stock: 40
  },
  {
    id: "4",
    name: "Premium Coffee Beans",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    category: "Food",
    rating: 4.7,
    description: "Single-origin coffee beans, medium roast",
    stock: 100
  },
  {
    id: "5",
    name: "Ergonomic Office Chair",
    price: 449.99,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    category: "Furniture",
    rating: 4.6,
    description: "Comfortable office chair with lumbar support",
    stock: 8
  },
  {
    id: "6",
    name: "Organic Skincare Set",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop",
    category: "Beauty",
    rating: 4.4,
    description: "Natural skincare routine for all skin types",
    stock: 30
  }
];

const Index = () => {
  const [products, setProducts] = useState<Product[]>(sampleProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(sampleProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
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

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { product, quantity: 1 }];
    });
  };

  const updateCartItemQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };

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

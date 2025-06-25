
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Product } from './useProducts';
import { useToast } from '@/hooks/use-toast';

export interface CartItem {
  product: Product;
  quantity: number;
}

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [sessionId] = useState(() => `guest_${Date.now()}_${Math.random()}`);
  const { user } = useAuth();
  const { toast } = useToast();

  // Load cart data on mount and when user changes
  useEffect(() => {
    if (user) {
      loadUserCart();
    } else {
      loadGuestCart();
    }
  }, [user]);

  const loadUserCart = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          quantity,
          product_id,
          products (*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      const items: CartItem[] = data?.map(item => ({
        product: item.products as Product,
        quantity: item.quantity
      })) || [];

      setCartItems(items);
    } catch (error) {
      console.error('Error loading user cart:', error);
    }
  };

  const loadGuestCart = () => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  };

  // Sync guest cart to user account when they log in
  const syncGuestCartToUser = async () => {
    if (!user || cartItems.length === 0) return;

    try {
      for (const item of cartItems) {
        await supabase
          .from('cart_items')
          .upsert({
            user_id: user.id,
            product_id: item.product.id,
            quantity: item.quantity
          });
      }
      
      localStorage.removeItem('cart');
      loadUserCart();
    } catch (error) {
      console.error('Error syncing cart:', error);
    }
  };

  // Save to localStorage for guests, Supabase for users
  const saveCart = async (items: CartItem[]) => {
    if (user) {
      // Clear existing cart items for user
      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      // Insert new items
      if (items.length > 0) {
        const cartData = items.map(item => ({
          user_id: user.id,
          product_id: item.product.id,
          quantity: item.quantity
        }));

        await supabase
          .from('cart_items')
          .insert(cartData);
      }
    } else {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  };

  const addToCart = async (product: Product) => {
    const existingItem = cartItems.find(item => item.product.id === product.id);
    let newItems: CartItem[];
    
    if (existingItem) {
      newItems = cartItems.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      newItems = [...cartItems, { product, quantity: 1 }];
    }
    
    setCartItems(newItems);
    await saveCart(newItems);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const updateCartItemQuantity = async (productId: string, quantity: number) => {
    let newItems: CartItem[];
    
    if (quantity <= 0) {
      newItems = cartItems.filter(item => item.product.id !== productId);
    } else {
      newItems = cartItems.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      );
    }
    
    setCartItems(newItems);
    await saveCart(newItems);
  };

  const removeFromCart = async (productId: string) => {
    const newItems = cartItems.filter(item => item.product.id !== productId);
    setCartItems(newItems);
    await saveCart(newItems);
  };

  const clearCart = async () => {
    setCartItems([]);
    await saveCart([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  };

  return {
    cartItems,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
    syncGuestCartToUser,
  };
};

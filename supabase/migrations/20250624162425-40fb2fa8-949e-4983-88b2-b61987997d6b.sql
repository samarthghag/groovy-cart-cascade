
-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  rating DECIMAL(3,2) DEFAULT 0,
  stock INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create cart_items table
CREATE TABLE public.cart_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  session_id TEXT, -- For guest users
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  total DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  guest_email TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create order_items table
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Create policies for products (public read access)
CREATE POLICY "Products are viewable by everyone" 
  ON public.products 
  FOR SELECT 
  USING (true);

-- Create policies for cart_items
CREATE POLICY "Users can view their own cart items" 
  ON public.cart_items 
  FOR SELECT 
  USING (auth.uid() = user_id OR session_id IS NOT NULL);

CREATE POLICY "Users can insert their own cart items" 
  ON public.cart_items 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update their own cart items" 
  ON public.cart_items 
  FOR UPDATE 
  USING (auth.uid() = user_id OR session_id IS NOT NULL);

CREATE POLICY "Users can delete their own cart items" 
  ON public.cart_items 
  FOR DELETE 
  USING (auth.uid() = user_id OR session_id IS NOT NULL);

-- Create policies for orders
CREATE POLICY "Users can view their own orders" 
  ON public.orders 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own orders" 
  ON public.orders 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

-- Create policies for order_items
CREATE POLICY "Users can view order items for their orders" 
  ON public.order_items 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.orders 
      WHERE orders.id = order_items.order_id 
      AND orders.user_id = auth.uid()
    )
  );

-- Insert sample products
INSERT INTO public.products (name, description, price, category, image, rating, stock) VALUES
('Wireless Bluetooth Headphones', 'Premium wireless headphones with noise cancellation', 199.99, 'Electronics', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', 4.5, 25),
('Smart Fitness Watch', 'Advanced fitness tracking with heart rate monitor', 299.99, 'Electronics', 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', 4.8, 15),
('Minimalist Desk Lamp', 'Modern LED desk lamp with adjustable brightness', 89.99, 'Home', 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop', 4.3, 40),
('Premium Coffee Beans', 'Single-origin coffee beans, medium roast', 24.99, 'Food', 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop', 4.7, 100),
('Ergonomic Office Chair', 'Comfortable office chair with lumbar support', 449.99, 'Furniture', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop', 4.6, 8),
('Organic Skincare Set', 'Natural skincare routine for all skin types', 79.99, 'Beauty', 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop', 4.4, 30);

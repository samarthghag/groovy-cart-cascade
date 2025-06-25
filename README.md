# Groovy Cart Cascade 🛒

A modern, full-stack e-commerce platform built with React, TypeScript, and Supabase. Experience seamless shopping with beautiful animations, real-time cart management, and user authentication.

## ✨ Features

### 🛍️ **Shopping Experience**
- **Product Catalog**: Browse products with categories and search functionality
- **Real-time Cart**: Add, remove, and update items with instant feedback
- **Guest & User Carts**: Seamless cart synchronization when users log in
- **Responsive Design**: Beautiful UI that works on all devices

### 🔐 **Authentication & User Management**
- **User Registration & Login**: Secure authentication with Supabase Auth
- **Profile Management**: User profiles and order history
- **Guest Shopping**: Shop without creating an account

### 🎨 **Modern UI/UX**
- **GSAP Animations**: Smooth page transitions and micro-interactions
- **shadcn/ui Components**: Beautiful, accessible UI components
- **Tailwind CSS**: Modern styling with utility-first approach
- **Dark/Light Mode**: Theme support with next-themes

### 🛒 **Cart & Checkout**
- **Persistent Cart**: Cart data saved locally for guests, cloud for users
- **Quantity Management**: Easy item quantity updates
- **Checkout Process**: Streamlined checkout experience
- **Order Tracking**: View order history and status

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **React Router** - Client-side routing
- **TanStack Query** - Server state management

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible component library
- **Radix UI** - Headless UI primitives
- **Lucide React** - Beautiful icons
- **GSAP** - Professional animations

### Backend & Database
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Real-time subscriptions
  - Row Level Security (RLS)
  - Authentication
- **React Hook Form** - Form handling
- **Zod** - Schema validation

## 📦 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Cart.tsx        # Shopping cart component
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Landing page hero
│   └── ProductGrid.tsx # Product display grid
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state
├── hooks/              # Custom React hooks
│   ├── useCart.ts      # Cart management
│   ├── useProducts.ts  # Product data fetching
│   └── useGSAPAnimations.ts # Animation utilities
├── pages/              # Route components
│   ├── Index.tsx       # Home page
│   ├── Auth.tsx        # Authentication page
│   ├── Profile.tsx     # User profile
│   └── Checkout.tsx    # Checkout process
└── integrations/       # External service integrations
    └── supabase/       # Supabase client and types
```

## 🗄️ Database Schema

### Products
- Product catalog with categories, pricing, and inventory
- Image URLs, ratings, and detailed descriptions

### Cart Items
- User-specific cart management
- Guest cart support with session IDs
- Quantity tracking and real-time updates

### Orders
- Order history and status tracking
- Guest order support with email
- Order items with pricing history

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account and project

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd groovy-cart-cascade
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new Supabase project
   - Run the migrations in `supabase/migrations/`
   - Copy your Supabase URL and anon key

4. **Configure environment variables**
   Create a `.env.local` file:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Key Features Implementation

#### Cart Management
- **Guest Cart**: Uses localStorage for persistence
- **User Cart**: Synced with Supabase database
- **Cart Sync**: Automatic migration when users log in

#### Authentication
- **Supabase Auth**: Email/password authentication
- **Session Management**: Automatic session handling
- **Protected Routes**: Route protection based on auth state

#### Product Management
- **Real-time Updates**: Products fetched from Supabase
- **Search & Filter**: Category and text-based filtering
- **Responsive Grid**: Adaptive product display

## 🎨 Customization

### Styling
- Modify `tailwind.config.ts` for theme customization
- Update component styles in individual component files
- Add new shadcn/ui components as needed

### Database
- Add new tables in Supabase migrations
- Update RLS policies for security
- Extend product schema for additional features

### Features
- Add payment processing (Stripe, PayPal)
- Implement inventory management
- Add product reviews and ratings
- Create admin dashboard

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full-featured experience with sidebar navigation
- **Tablet**: Adaptive layouts with touch-friendly interactions
- **Mobile**: Mobile-first design with optimized cart and checkout

## 🔒 Security

- **Row Level Security (RLS)**: Database-level security policies
- **Authentication**: Secure user authentication with Supabase
- **Input Validation**: Form validation with Zod schemas
- **XSS Protection**: Sanitized user inputs and outputs

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Configure environment variables

### Other Platforms
The app can be deployed to any static hosting platform that supports:
- Static file serving
- Environment variable configuration
- Client-side routing

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and commit: `git commit -m 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful components
- [Supabase](https://supabase.com/) for backend services
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [GSAP](https://greensock.com/gsap/) for animations

---

**Built with ❤️ using modern web technologies**

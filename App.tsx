
import React, { createContext, useContext, useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthState, User, UserRole, Product, CartItem } from './types';
import { db } from './services/mockDB';

// Components & Pages
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';

// Context for global state
interface AppContextType {
  auth: AuthState;
  setAuth: (auth: AuthState) => void;
  products: Product[];
  setProducts: (products: Product[]) => void;
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, delta: number) => void;
  toggleWishlist: (productId: string) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
};

const App: React.FC = () => {
  const [auth, setAuth] = useState<AuthState>(db.getAuth());
  const [products, setProducts] = useState<Product[]>(db.getProducts());

  useEffect(() => {
    db.saveAuth(auth);
  }, [auth]);

  useEffect(() => {
    db.saveProducts(products);
  }, [products]);

  const logout = () => {
    setAuth({ user: null, token: null });
  };

  const updateUserInDB = (updatedUser: User) => {
    const users = db.getUsers();
    const index = users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
      db.saveUsers(users);
    }
    setAuth({ ...auth, user: updatedUser });
  };

  const addToCart = (productId: string, quantity: number = 1) => {
    if (!auth.user) return;
    const cart = [...auth.user.cart];
    const existing = cart.find(item => item.productId === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }
    updateUserInDB({ ...auth.user, cart });
  };

  const removeFromCart = (productId: string) => {
    if (!auth.user) return;
    const cart = auth.user.cart.filter(item => item.productId !== productId);
    updateUserInDB({ ...auth.user, cart });
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    if (!auth.user) return;
    const cart = auth.user.cart.map(item => {
      if (item.productId === productId) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    });
    updateUserInDB({ ...auth.user, cart });
  };

  const toggleWishlist = (productId: string) => {
    if (!auth.user) return;
    let wishlist = [...auth.user.wishlist];
    if (wishlist.includes(productId)) {
      wishlist = wishlist.filter(id => id !== productId);
    } else {
      wishlist.push(productId);
    }
    updateUserInDB({ ...auth.user, wishlist });
  };

  return (
    <AppContext.Provider value={{ 
      auth, setAuth, products, setProducts, 
      addToCart, removeFromCart, updateCartQuantity, toggleWishlist, logout 
    }}>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow pt-20 pb-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={auth.user ? <Cart /> : <Navigate to="/login" />} />
              <Route path="/wishlist" element={auth.user ? <Wishlist /> : <Navigate to="/login" />} />
              <Route path="/checkout" element={auth.user ? <Checkout /> : <Navigate to="/login" />} />
              <Route path="/login" element={!auth.user ? <Login /> : <Navigate to="/" />} />
              <Route path="/register" element={!auth.user ? <Register /> : <Navigate to="/" />} />
              <Route 
                path="/admin" 
                element={auth.user?.role === UserRole.ADMIN ? <AdminDashboard /> : <Navigate to="/" />} 
              />
            </Routes>
          </main>
          <footer className="bg-white border-t py-6 text-center text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} AzureStore. Built with minimalism and blue skies.
          </footer>
        </div>
      </Router>
    </AppContext.Provider>
  );
};

export default App;

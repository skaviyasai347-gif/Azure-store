
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User as UserIcon, LogOut, Search, Menu, X, ShieldAlert } from 'lucide-react';
import { useApp } from '../App';
import { UserRole } from '../types';

const Navbar: React.FC = () => {
  const { auth, logout } = useApp();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const cartCount = auth.user?.cart.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const wishlistCount = auth.user?.wishlist.length || 0;

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">A</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">AzureStore</span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input 
                type="text" 
                placeholder="Search products..."
                className="w-full bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-6">
            {auth.user?.role === UserRole.ADMIN && (
              <Link to="/admin" className="text-slate-600 hover:text-blue-600 flex items-center gap-1 text-sm font-medium">
                <ShieldAlert className="w-4 h-4" /> Admin
              </Link>
            )}
            <Link to="/wishlist" className="relative text-slate-600 hover:text-blue-600 transition-colors">
              <Heart className="w-6 h-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="relative text-slate-600 hover:text-blue-600 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            {auth.user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-slate-700">Hi, {auth.user.name.split(' ')[0]}</span>
                <button 
                  onClick={() => { logout(); navigate('/'); }}
                  className="text-slate-600 hover:text-red-500 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button className="md:hidden text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 animate-in slide-in-from-top duration-300">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <div className="relative mb-4">
              <input 
                type="text" 
                placeholder="Search..."
                className="w-full bg-slate-100 border-none rounded-lg py-3 pl-10 pr-4 text-sm outline-none"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            </div>
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block py-2 text-slate-700 font-medium">Home</Link>
            <Link to="/wishlist" onClick={() => setIsMenuOpen(false)} className="block py-2 text-slate-700 font-medium">Wishlist ({wishlistCount})</Link>
            <Link to="/cart" onClick={() => setIsMenuOpen(false)} className="block py-2 text-slate-700 font-medium">Cart ({cartCount})</Link>
            {auth.user?.role === UserRole.ADMIN && (
              <Link to="/admin" onClick={() => setIsMenuOpen(false)} className="block py-2 text-blue-600 font-medium">Admin Dashboard</Link>
            )}
            <div className="pt-4 mt-4 border-t border-slate-100">
              {auth.user ? (
                <button 
                  onClick={() => { logout(); navigate('/'); setIsMenuOpen(false); }}
                  className="w-full text-left py-2 text-red-500 font-medium flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              ) : (
                <Link 
                  to="/login" 
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center bg-blue-600 text-white py-3 rounded-lg font-medium"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

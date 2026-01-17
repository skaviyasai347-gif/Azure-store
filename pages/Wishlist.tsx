
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useApp } from '../App';

const Wishlist: React.FC = () => {
  const { auth, products, toggleWishlist, addToCart } = useApp();

  const wishlistedItems = products.filter(p => auth.user?.wishlist.includes(p.id));

  if (wishlistedItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Your wishlist is empty</h2>
        <p className="text-slate-500 mb-8">Save items you love to find them easily later.</p>
        <Link 
          to="/" 
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">My Wishlist</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {wishlistedItems.map(item => (
          <div key={item.id} className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm group">
            <div className="relative aspect-square">
              <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
              <button 
                onClick={() => toggleWishlist(item.id)}
                className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-red-500 p-2 rounded-full shadow-sm hover:bg-white transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-slate-900 mb-1">{item.name}</h3>
              <p className="text-lg font-bold text-blue-600 mb-4">${item.price.toFixed(2)}</p>
              <button 
                onClick={() => { addToCart(item.id); toggleWishlist(item.id); }}
                className="w-full bg-slate-900 text-white py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
              >
                <ShoppingCart className="w-4 h-4" /> Move to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;

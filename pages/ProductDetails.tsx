
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, ArrowLeft, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useApp } from '../App';

const ProductDetails: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, auth, addToCart, toggleWishlist } = useApp();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);
  const isWishlisted = auth.user?.wishlist.includes(id || '');

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 text-center py-20">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <button onClick={() => navigate('/')} className="mt-4 text-blue-600 hover:underline">Back to home</button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <button 
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Image Section */}
        <div className="rounded-3xl overflow-hidden shadow-sm border border-slate-100">
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full aspect-square object-cover"
          />
        </div>

        {/* Info Section */}
        <div className="space-y-6">
          <div>
            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">{product.category}</span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mt-2">{product.name}</h1>
            <div className="flex items-center gap-4 mt-4">
              <span className="text-3xl font-bold text-blue-600">${product.price.toFixed(2)}</span>
              {product.stock > 0 ? (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">In Stock ({product.stock})</span>
              ) : (
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold">Out of Stock</span>
              )}
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed text-lg">
            {product.description}
          </p>

          <div className="flex flex-col gap-6 py-6 border-y border-slate-100">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-slate-900 uppercase">Quantity</span>
              <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-4 py-2 hover:bg-slate-50 transition-colors"
                >
                  -
                </button>
                <span className="px-6 py-2 font-medium border-x border-slate-200">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                  className="px-4 py-2 hover:bg-slate-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => addToCart(product.id, quantity)}
                disabled={product.stock <= 0}
                className="flex-1 flex items-center justify-center gap-3 bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:bg-slate-300 disabled:shadow-none"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button 
                onClick={() => toggleWishlist(product.id)}
                className={`w-16 h-16 flex items-center justify-center rounded-2xl border transition-all ${
                  isWishlisted 
                    ? 'bg-red-50 border-red-100 text-red-500' 
                    : 'bg-white border-slate-200 text-slate-400 hover:border-blue-300 hover:text-blue-600'
                }`}
              >
                <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
              <Truck className="w-5 h-5 text-blue-500" />
              <div className="text-xs">
                <p className="font-bold">Free Shipping</p>
                <p className="text-slate-500">Orders over $100</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
              <RefreshCw className="w-5 h-5 text-blue-500" />
              <div className="text-xs">
                <p className="font-bold">Easy Returns</p>
                <p className="text-slate-500">30 days policy</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
              <ShieldCheck className="w-5 h-5 text-blue-500" />
              <div className="text-xs">
                <p className="font-bold">Secure Payment</p>
                <p className="text-slate-500">100% encrypted</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

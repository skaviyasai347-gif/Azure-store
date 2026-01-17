
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../App';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { auth, addToCart, toggleWishlist } = useApp();
  const isWishlisted = auth.user?.wishlist.includes(product.id);

  return (
    <div className="group bg-white rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300">
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-3 right-3 flex flex-col gap-2 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
          <button 
            onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors ${isWishlisted ? 'bg-red-50 text-red-500' : 'bg-white text-slate-400 hover:text-blue-600'}`}
          >
            <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>
      </Link>
      
      <div className="p-5">
        <Link to={`/product/${product.id}`} className="block mb-1">
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">{product.category}</span>
          <h3 className="text-lg font-bold text-slate-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
          <button 
            onClick={() => addToCart(product.id)}
            disabled={product.stock <= 0}
            className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-blue-600 transition-colors disabled:bg-slate-300"
          >
            <ShoppingCart className="w-4 h-4" />
            {product.stock > 0 ? 'Add' : 'Out'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

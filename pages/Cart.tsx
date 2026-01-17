
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useApp } from '../App';

const Cart: React.FC = () => {
  const { auth, products, updateCartQuantity, removeFromCart } = useApp();
  const navigate = useNavigate();

  const cartDetails = auth.user?.cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return product ? { ...product, quantity: item.quantity } : null;
  }).filter(Boolean) || [];

  const subtotal = cartDetails.reduce((acc, item) => acc + (item?.price || 0) * (item?.quantity || 0), 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  if (cartDetails.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 mb-8">Looks like you haven't added anything yet.</p>
        <Link 
          to="/" 
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartDetails.map((item: any) => (
            <div key={item.id} className="bg-white border border-slate-100 p-4 rounded-2xl flex items-center gap-4 shadow-sm">
              <img src={item.imageUrl} alt={item.name} className="w-24 h-24 rounded-xl object-cover" />
              <div className="flex-1">
                <Link to={`/product/${item.id}`} className="font-bold text-slate-900 hover:text-blue-600 transition-colors">{item.name}</Link>
                <p className="text-slate-500 text-sm mb-2">{item.category}</p>
                <div className="flex items-center gap-4 mt-auto">
                  <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden h-9">
                    <button 
                      onClick={() => updateCartQuantity(item.id, -1)}
                      className="px-3 hover:bg-slate-50"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-4 text-sm font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => updateCartQuantity(item.id, 1)}
                      className="px-3 hover:bg-slate-50"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-400 hover:text-red-600 transition-colors p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</p>
                <p className="text-xs text-slate-400">${item.price.toFixed(2)} each</p>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-white border border-slate-100 p-6 rounded-3xl shadow-sm sticky top-24">
          <h3 className="text-xl font-bold mb-6">Order Summary</h3>
          <div className="space-y-4 text-slate-600 mb-6 pb-6 border-b border-slate-100">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span className="text-slate-900 font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-slate-900 font-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
            </div>
            {shipping > 0 && (
              <p className="text-[10px] text-blue-500 bg-blue-50 p-2 rounded-lg">
                Add ${(100 - subtotal).toFixed(2)} more for free shipping!
              </p>
            )}
          </div>
          <div className="flex justify-between text-xl font-bold text-slate-900 mb-8">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button 
            onClick={() => navigate('/checkout')}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
          >
            Checkout <ArrowRight className="w-5 h-5" />
          </button>
          <Link to="/" className="block text-center mt-4 text-sm text-slate-500 hover:text-blue-600 font-medium">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;

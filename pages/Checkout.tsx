
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, CreditCard, Home, ShieldCheck, Landmark } from 'lucide-react';
import { useApp } from '../App';
import { db } from '../services/mockDB';

const Checkout: React.FC = () => {
  const { auth, products, setAuth } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: auth.user?.name || '',
    address: '',
    city: '',
    zip: '',
    payment: 'card'
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const cartDetails = auth.user?.cart.map(item => {
    const product = products.find(p => p.id === item.productId);
    return product ? { ...product, quantity: item.quantity } : null;
  }).filter(Boolean) || [];

  const subtotal = cartDetails.reduce((acc, item) => acc + (item?.price || 0) * (item?.quantity || 0), 0);
  const total = subtotal + (subtotal > 100 ? 0 : 15);

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    // Simulate API call delay
    setTimeout(() => {
      const order = {
        id: Math.random().toString(36).substr(2, 9),
        userId: auth.user!.id,
        items: cartDetails.map(item => ({ 
          productId: item!.id, 
          quantity: item!.quantity, 
          name: item!.name, 
          price: item!.price 
        })),
        totalAmount: total,
        paymentStatus: 'completed' as const,
        shippingAddress: `${formData.address}, ${formData.city}, ${formData.zip}`,
        createdAt: new Date().toISOString()
      };

      const orders = db.getOrders();
      db.saveOrders([...orders, order]);

      // Clear cart
      const updatedUser = { ...auth.user!, cart: [] };
      const users = db.getUsers();
      const idx = users.findIndex(u => u.id === updatedUser.id);
      users[idx] = updatedUser;
      db.saveUsers(users);
      setAuth({ ...auth, user: updatedUser });

      setStep(3);
      setIsProcessing(false);
    }, 2500);
  };

  if (step === 3) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
          <CheckCircle className="w-12 h-12" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4">Order Confirmed!</h1>
        <p className="text-slate-500 mb-10 text-lg">Thank you for your purchase. Your minimalist treasures will be with you shortly.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/20"
        >
          Back to Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center w-full max-w-md">
          <div className={`flex flex-col items-center flex-1`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${step >= 1 ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 text-slate-400'}`}>1</div>
            <span className="text-xs font-bold mt-2 text-slate-500 uppercase">Shipping</span>
          </div>
          <div className={`h-1 flex-1 mx-2 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
          <div className={`flex flex-col items-center flex-1`}>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-colors ${step >= 2 ? 'bg-blue-600 border-blue-600 text-white' : 'border-slate-200 text-slate-400'}`}>2</div>
            <span className="text-xs font-bold mt-2 text-slate-500 uppercase">Payment</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left side: Form */}
        <div>
          {step === 1 ? (
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Home className="text-blue-600" /> Shipping Details
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 uppercase">Address</label>
                  <input 
                    type="text"
                    placeholder="123 Blue St."
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase">City</label>
                    <input 
                      type="text"
                      value={formData.city}
                      onChange={e => setFormData({...formData, city: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 uppercase">ZIP Code</label>
                    <input 
                      type="text"
                      value={formData.zip}
                      onChange={e => setFormData({...formData, zip: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                </div>
                <button 
                  onClick={() => setStep(2)}
                  disabled={!formData.address || !formData.city || !formData.zip}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 disabled:bg-slate-300"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <ShieldCheck className="text-blue-600" /> Payment Method
              </h2>
              <div className="space-y-4">
                <button 
                  onClick={() => setFormData({...formData, payment: 'card'})}
                  className={`w-full flex items-center justify-between p-5 border-2 rounded-2xl transition-all ${formData.payment === 'card' ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-blue-200'}`}
                >
                  <div className="flex items-center gap-4">
                    <CreditCard className={formData.payment === 'card' ? 'text-blue-600' : 'text-slate-400'} />
                    <span className="font-bold text-slate-800">Credit / Debit Card</span>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.payment === 'card' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
                    {formData.payment === 'card' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                </button>

                <button 
                  onClick={() => setFormData({...formData, payment: 'upi'})}
                  className={`w-full flex items-center justify-between p-5 border-2 rounded-2xl transition-all ${formData.payment === 'upi' ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-blue-200'}`}
                >
                  <div className="flex items-center gap-4">
                    <Landmark className={formData.payment === 'upi' ? 'text-blue-600' : 'text-slate-400'} />
                    <span className="font-bold text-slate-800">UPI / Net Banking</span>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${formData.payment === 'upi' ? 'border-blue-600 bg-blue-600' : 'border-slate-300'}`}>
                    {formData.payment === 'upi' && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                </button>

                {isProcessing ? (
                  <div className="text-center py-6">
                    <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-blue-600 font-bold">Verifying payment with Stripe...</p>
                  </div>
                ) : (
                  <button 
                    onClick={handlePlaceOrder}
                    className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                  >
                    Pay ${total.toFixed(2)} & Place Order
                  </button>
                )}
                <button 
                  onClick={() => setStep(1)}
                  className="w-full text-slate-500 font-medium py-2 hover:text-blue-600 transition-colors"
                >
                  Back to shipping
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right side: Summary */}
        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl">
            <h3 className="text-xl font-bold mb-6">Order Summary</h3>
            <div className="space-y-4 mb-6 pb-6 border-b border-white/10">
              {cartDetails.map((item: any) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <span className="text-slate-400">{item.quantity}x {item.name}</span>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Shipping</span>
                <span>{subtotal > 100 ? 'Free' : '$15.00'}</span>
              </div>
            </div>
            <div className="flex justify-between text-2xl font-bold">
              <span>Total</span>
              <span className="text-blue-400">${total.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
            <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Buyer Protection
            </h4>
            <p className="text-xs text-blue-600 leading-relaxed">
              Your purchase is protected by our Azure Guarantee. If your order doesn't arrive as described, we'll make it right.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

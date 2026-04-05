import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, CheckCircle2, ArrowRight, CreditCard, Truck, ShieldCheck } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutPageProps {
  cart: CartItem[];
  onClearCart: () => void;
}

export default function CheckoutPage({ cart, onClearCart }: CheckoutPageProps) {
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [paymentType, setPaymentType] = useState<'card' | 'momo'>('card');
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    region: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
    momoNumber: '',
    momoProvider: 'mtn'
  });

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const delivery = subtotal > 500 ? 0 : 50;
  const total = subtotal + delivery;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate order placement
    setIsOrderPlaced(true);
    onClearCart();
  };

  if (isOrderPlaced) {
    return (
      <div className="pt-48 pb-32 bg-white min-h-screen text-center">
        <div className="max-w-xl mx-auto px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 text-green-600 mb-8"
          >
            <CheckCircle2 size={48} />
          </motion.div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
          <p className="text-xl text-gray-600 mb-12">
            Thank you for shopping with BabyBox Ghana. We've sent a confirmation email to {formData.email}.
          </p>
          <a 
            href="/"
            className="inline-flex items-center justify-center bg-rose-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-rose-600 transition-all shadow-lg shadow-rose-200"
          >
            Return to Home <ArrowRight className="ml-2" size={20} />
          </a>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="pt-48 pb-32 bg-white min-h-screen text-center">
        <div className="max-w-xl mx-auto px-4">
          <ShoppingBag size={64} className="mx-auto text-gray-200 mb-8" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-lg text-gray-600 mb-12">
            Looks like you haven't added anything to your cart yet.
          </p>
          <a 
            href="/store"
            className="inline-flex items-center justify-center bg-rose-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-rose-600 transition-all shadow-lg shadow-rose-200"
          >
            Browse Store <ArrowRight className="ml-2" size={20} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-12">Checkout</h1>
        
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Checkout Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <div className="bg-white p-8 rounded-3xl shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <ShieldCheck className="mr-2 text-rose-500" size={24} /> Contact Information
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      required
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                      placeholder="eugene@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input 
                      required
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                      placeholder="+233 24 000 0000"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white p-8 rounded-3xl shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <Truck className="mr-2 text-rose-500" size={24} /> Shipping Address
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                    <input 
                      required
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                    <input 
                      required
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input 
                      required
                      type="text" 
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                      placeholder="House No, Street Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input 
                      required
                      type="text" 
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
                    <input 
                      required
                      type="text" 
                      name="region"
                      value={formData.region}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                      placeholder="Greater Accra"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white p-8 rounded-3xl shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                  <CreditCard className="mr-2 text-rose-500" size={24} /> Payment Method
                </h2>
                
                <div className="flex space-x-4 mb-8">
                  <button
                    type="button"
                    onClick={() => setPaymentType('card')}
                    className={`flex-1 py-3 rounded-xl border-2 transition-all font-bold ${
                      paymentType === 'card' 
                        ? 'border-rose-500 bg-rose-50 text-rose-500' 
                        : 'border-gray-100 text-gray-500 hover:border-gray-200'
                    }`}
                  >
                    Credit Card
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentType('momo')}
                    className={`flex-1 py-3 rounded-xl border-2 transition-all font-bold ${
                      paymentType === 'momo' 
                        ? 'border-rose-500 bg-rose-50 text-rose-500' 
                        : 'border-gray-100 text-gray-500 hover:border-gray-200'
                    }`}
                  >
                    Mobile Money
                  </button>
                </div>

                {paymentType === 'card' ? (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                      <input 
                        required
                        type="text" 
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                        placeholder="0000 0000 0000 0000"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                      <input 
                        required
                        type="text" 
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                      <input 
                        required
                        type="text" 
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                        placeholder="000"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Network Provider</label>
                      <select 
                        name="momoProvider"
                        value={formData.momoProvider}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all bg-white"
                      >
                        <option value="mtn">MTN Momo</option>
                        <option value="telecel">Telecel Cash</option>
                        <option value="at">AT Money</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                      <input 
                        required
                        type="tel" 
                        name="momoNumber"
                        value={formData.momoNumber}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                        placeholder="024 000 0000"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      You will receive a prompt on your phone to authorize the payment.
                    </p>
                  </div>
                )}
              </div>

              <button 
                type="submit"
                className="w-full bg-rose-500 text-white py-5 rounded-3xl text-xl font-bold hover:bg-rose-600 transition-all shadow-xl shadow-rose-200"
              >
                Complete Order (GHS {total})
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white p-8 rounded-3xl shadow-sm sticky top-32">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              <div className="space-y-4 mb-8">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-sm font-bold text-gray-900">{item.name}</h4>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-bold text-gray-900">GHS {item.price * item.quantity}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-3 pt-6 border-t border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>GHS {subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery</span>
                  <span>{delivery === 0 ? 'FREE' : `GHS ${delivery}`}</span>
                </div>
                <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-100">
                  <span>Total</span>
                  <span>GHS {total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

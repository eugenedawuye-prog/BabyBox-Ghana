/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  ShoppingBag, 
  ChevronDown,
  Baby,
  Gamepad2,
  Utensils,
  Bath,
  Home,
  Car,
  Instagram,
  Facebook,
  Twitter,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Heart,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Pages
import LandingPage from './pages/LandingPage';
import StorePage from './pages/StorePage';
import CheckoutPage from './pages/CheckoutPage';
import CustomerServicePage from './pages/CustomerServicePage';

// Types
import { Product, CartItem } from './types';

// --- Shared Components ---

const AGES = [
  { label: '0-6 Months', href: '/store?age=0-6 Months' },
  { label: '7-12 Months', href: '/store?age=7-12 Months' },
  { label: '1-2 Years', href: '/store?age=1-2 Years' },
  { label: '2-3 Years', href: '/store?age=2-3 Years' },
  { label: '3+ Years', href: '/store?age=3+ Years' },
];

const CATEGORIES = [
  { label: 'Hygiene & Diapering', href: '/store?category=Hygiene & Diapering', icon: <Bath size={20} /> },
  { label: 'Feeding & Nutrition', href: '/store?category=Feeding & Nutrition', icon: <Utensils size={20} /> },
  { label: 'Health & Comfort', href: '/store?category=Health & Comfort', icon: <Heart size={20} /> },
  { label: 'Development & Play', href: '/store?category=Development & Play', icon: <Gamepad2 size={20} /> },
];

const Navbar = ({ cartCount, onOpenCart }: { cartCount: number; onOpenCart: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileExpanded = (item: string) => {
    setMobileExpanded(mobileExpanded === item ? null : item);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || location.pathname !== '/' ? 'bg-white shadow-sm py-3' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold tracking-tight text-rose-500">
              BabyBox <span className="text-gray-900">Ghana</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown('age')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center text-sm font-medium text-gray-700 hover:text-rose-500 transition-colors py-2">
                Shop by Age <ChevronDown size={14} className={`ml-1 transition-transform ${activeDropdown === 'age' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'age' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-2xl p-4 border border-gray-100"
                  >
                    {AGES.map((age) => (
                      <Link key={age.label} to={age.href} className="block py-2 text-sm text-gray-600 hover:text-rose-500 transition-colors">
                        {age.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown('category')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center text-sm font-medium text-gray-700 hover:text-rose-500 transition-colors py-2">
                Shop by Category <ChevronDown size={14} className={`ml-1 transition-transform ${activeDropdown === 'category' ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'category' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 w-56 bg-white shadow-xl rounded-2xl p-4 border border-gray-100 grid grid-cols-1 gap-1"
                  >
                    {CATEGORIES.map((cat) => (
                      <Link key={cat.label} to={cat.href} className="flex items-center space-x-3 py-2 text-sm text-gray-600 hover:text-rose-500 transition-colors">
                        <span className="text-rose-400">{cat.icon}</span>
                        <span>{cat.label}</span>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/store" className="text-sm font-medium text-gray-700 hover:text-rose-500 transition-colors">How it Works</Link>
            <Link to="/customer-service" className="text-sm font-medium text-gray-700 hover:text-rose-500 transition-colors">Support</Link>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={onOpenCart}
              className="text-gray-700 hover:text-rose-500 transition-colors relative"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button 
              className="md:hidden text-gray-700"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/store" className="hidden md:block bg-rose-500 text-white px-6 py-2 rounded-full text-sm font-medium hover:bg-rose-600 transition-colors">
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              <div>
                <button 
                  onClick={() => toggleMobileExpanded('age')}
                  className="flex items-center justify-between w-full px-3 py-4 text-base font-medium text-gray-700 hover:bg-rose-50 rounded-lg"
                >
                  <span>Shop by Age</span>
                  <ChevronDown size={20} className={`transition-transform ${mobileExpanded === 'age' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileExpanded === 'age' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="pl-6 overflow-hidden"
                    >
                      {AGES.map((age) => (
                        <Link key={age.label} to={age.href} className="block py-3 text-sm text-gray-600 hover:text-rose-500">
                          {age.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div>
                <button 
                  onClick={() => toggleMobileExpanded('category')}
                  className="flex items-center justify-between w-full px-3 py-4 text-base font-medium text-gray-700 hover:bg-rose-50 rounded-lg"
                >
                  <span>Shop by Category</span>
                  <ChevronDown size={20} className={`transition-transform ${mobileExpanded === 'category' ? 'rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {mobileExpanded === 'category' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="pl-6 overflow-hidden"
                    >
                      {CATEGORIES.map((cat) => (
                        <Link key={cat.label} to={cat.href} className="flex items-center space-x-3 py-3 text-sm text-gray-600 hover:text-rose-500">
                          <span className="text-rose-400">{cat.icon}</span>
                          <span>{cat.label}</span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/store" className="block px-3 py-4 text-base font-medium text-gray-700 hover:bg-rose-50 rounded-lg">How it Works</Link>
              <Link to="/customer-service" className="block px-3 py-4 text-base font-medium text-gray-700 hover:bg-rose-50 rounded-lg">Support</Link>
              
              <div className="pt-4 border-t border-gray-100 mt-4">
                <Link to="/store" className="block px-3 py-4 text-base font-medium text-gray-700 hover:bg-rose-50 rounded-lg">Sign In</Link>
                <Link to="/customer-service" className="block px-3 py-4 text-base font-medium text-gray-700 hover:bg-rose-50 rounded-lg">Help & FAQs</Link>
              </div>

              <div className="pt-4">
                <Link to="/store" className="w-full bg-rose-500 text-white px-6 py-3 rounded-full text-base font-medium text-center block">
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-white pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div>
          <Link to="/" className="text-2xl font-bold tracking-tight text-rose-500 mb-6 block">
            BabyBox <span className="text-white">Ghana</span>
          </Link>
          <p className="text-gray-400 mb-6">
            Curating joy for your little ones across Ghana. Sustainable, stylish, and consciously selected.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-rose-500 transition-colors"><Instagram size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-rose-500 transition-colors"><Facebook size={24} /></a>
            <a href="#" className="text-gray-400 hover:text-rose-500 transition-colors"><Twitter size={24} /></a>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-6">Shop</h4>
          <ul className="space-y-4 text-gray-400">
            <li><Link to="/store" className="hover:text-rose-500 transition-colors">Subscription Boxes</Link></li>
            <li><Link to="/store" className="hover:text-rose-500 transition-colors">Gift Boxes</Link></li>
            <li><Link to="/store" className="hover:text-rose-500 transition-colors">Individual Items</Link></li>
            <li><Link to="/store" className="hover:text-rose-500 transition-colors">New Arrivals</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-6">Support</h4>
          <ul className="space-y-4 text-gray-400">
            <li><Link to="/store" className="hover:text-rose-500 transition-colors">How it Works</Link></li>
            <li><Link to="/customer-service" className="hover:text-rose-500 transition-colors">FAQs</Link></li>
            <li><Link to="/customer-service" className="hover:text-rose-500 transition-colors">Shipping Policy</Link></li>
            <li><Link to="/customer-service" className="hover:text-rose-500 transition-colors">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold mb-6">Newsletter</h4>
          <p className="text-gray-400 mb-4 text-sm">Get baby tips and exclusive offers in your inbox.</p>
          <form className="flex flex-col space-y-3">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="bg-gray-800 border-none rounded-full px-6 py-3 text-sm focus:ring-2 focus:ring-rose-500 outline-none"
            />
            <button className="bg-rose-500 text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-rose-600 transition-colors">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} BabyBox Ghana. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

const CartDrawer = ({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateQuantity, 
  onRemoveItem 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
}) => {
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Your Cart ({cart.length})</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag size={48} className="mx-auto text-gray-200 mb-4" />
                  <p className="text-gray-500">Your cart is empty</p>
                  <Link 
                    to="/store" 
                    onClick={onClose}
                    className="text-rose-500 font-bold hover:underline mt-2 block"
                  >
                    Start Shopping
                  </Link>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex space-x-4">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                        <button 
                          onClick={() => onRemoveItem(item.id)}
                          className="text-gray-400 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mb-3">{item.category}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 bg-gray-50 rounded-full px-3 py-1">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="text-gray-500 hover:text-rose-500"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="text-gray-500 hover:text-rose-500"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="font-bold text-gray-900">GHS {item.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 space-y-4">
                <div className="flex justify-between items-center text-xl font-bold text-gray-900">
                  <span>Subtotal</span>
                  <span>GHS {subtotal}</span>
                </div>
                <p className="text-xs text-gray-500">Delivery calculated at checkout.</p>
                <Link 
                  to="/checkout" 
                  onClick={onClose}
                  className="w-full bg-rose-500 text-white py-4 rounded-full font-bold flex items-center justify-center hover:bg-rose-600 transition-colors shadow-lg shadow-rose-200"
                >
                  Checkout <ArrowRight className="ml-2" size={20} />
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <Router>
      <div className="min-h-screen bg-white font-sans selection:bg-rose-100 selection:text-rose-900">
        <Navbar cartCount={cart.reduce((acc, i) => acc + i.quantity, 0)} onOpenCart={() => setIsCartOpen(true)} />
        
        <CartDrawer 
          isOpen={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
        />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/store" element={<StorePage onAddToCart={addToCart} />} />
          <Route path="/checkout" element={<CheckoutPage cart={cart} onClearCart={clearCart} />} />
          <Route path="/customer-service" element={<CustomerServicePage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

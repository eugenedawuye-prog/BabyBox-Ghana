import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, 
  Trash2, 
  Edit2, 
  Save, 
  X, 
  Lock, 
  LayoutDashboard, 
  Package, 
  LogOut,
  ChevronRight,
  Search,
  Filter,
  Database,
  Upload,
  Image as ImageIcon
} from 'lucide-react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy,
  serverTimestamp,
  Timestamp,
  writeBatch
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { Product } from '../types';
import { resolveImageUrl } from '../utils';

const CATEGORIES = [
  'Hygiene & Diapering',
  'Feeding & Nutrition',
  'Health & Comfort',
  'Development & Play'
];

const AGE_RANGES = [
  '0-6 Months',
  '7-12 Months',
  '1-2 Years',
  '2-3 Years',
  '3+ Years'
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [isUploading, setIsUploading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: CATEGORIES[0],
    ageRange: AGE_RANGES[0],
    image: '',
    description: ''
  });

  useEffect(() => {
    const q = query(collection(db, 'products'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(productsData);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'products');
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 800000) { // ~800KB limit for base64 in Firestore
      alert('Image is too large. Please select an image smaller than 800KB.');
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({ ...prev, image: reader.result as string }));
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      price: '',
      category: CATEGORIES[0],
      ageRange: AGE_RANGES[0],
      image: '',
      description: ''
    });
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, 'products', editingId), {
          ...productData,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'products'), {
          ...productData,
          createdAt: serverTimestamp()
        });
      }
      resetForm();
    } catch (err) {
      handleFirestoreError(err, editingId ? OperationType.UPDATE : OperationType.CREATE, 'products');
    }
  };

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      ageRange: product.ageRange,
      image: product.image,
      description: product.description
    });
    setEditingId(product.id);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteDoc(doc(db, 'products', id));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, 'products');
      }
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'All' || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-rose-100 p-4 rounded-2xl">
              <Lock className="text-rose-500" size={32} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">Admin Login</h1>
          <p className="text-gray-500 text-center mb-8">Enter your password to access the CMS.</p>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                placeholder="••••••••"
                required
              />
              {error && <p className="text-rose-500 text-sm mt-2">{error}</p>}
            </div>
            <button 
              type="submit"
              className="w-full bg-rose-500 text-white py-4 rounded-xl font-bold hover:bg-rose-600 transition-colors shadow-lg shadow-rose-200"
            >
              Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <div className="flex items-center space-x-2 text-rose-500 mb-2">
              <LayoutDashboard size={20} />
              <span className="font-bold uppercase tracking-widest text-xs">Admin Dashboard</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900">Product CMS</h1>
          </div>
          <div className="flex items-center space-x-4 mt-6 md:mt-0">
            <button 
              onClick={() => setIsAdding(true)}
              className="bg-rose-500 text-white px-6 py-3 rounded-full font-bold flex items-center space-x-2 hover:bg-rose-600 transition-colors shadow-lg shadow-rose-200"
            >
              <Plus size={20} />
              <span>Add Product</span>
            </button>
            <button 
              onClick={handleLogout}
              className="bg-white text-gray-600 px-6 py-3 rounded-full font-bold flex items-center space-x-2 hover:bg-gray-100 transition-colors border border-gray-200"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-50 p-3 rounded-2xl">
                <Package className="text-blue-500" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-rose-500 outline-none transition-all"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400" size={20} />
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-gray-50 border-none rounded-2xl px-4 py-3 focus:ring-2 focus:ring-rose-500 outline-none transition-all"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
        </div>

        {/* Product List */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-widest">Product</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-widest">Category</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-widest">Price</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-widest">Age Range</th>
                  <th className="px-6 py-4 text-sm font-bold text-gray-500 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                          <img src={resolveImageUrl(product.image)} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{product.name}</p>
                          <p className="text-xs text-gray-500 truncate max-w-[200px]">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-full bg-rose-50 text-rose-500 text-xs font-bold">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900">GHS {product.price}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{product.ageRange}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => handleEdit(product)}
                          className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => handleDelete(product.id)}
                          className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No products found.</p>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetForm}
              className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingId ? 'Edit Product' : 'Add New Product'}
                  </h2>
                  <button onClick={resetForm} className="text-gray-400 hover:text-gray-600">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                      <input 
                        required
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price (GHS)</label>
                      <input 
                        required
                        type="number" 
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                      <select 
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 outline-none transition-all bg-white"
                      >
                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Age Range</label>
                      <select 
                        name="ageRange"
                        value={formData.ageRange}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 outline-none transition-all bg-white"
                      >
                        {AGE_RANGES.map(age => <option key={age} value={age}>{age}</option>)}
                      </select>
                    </div>
                    
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Product Image</label>
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-grow">
                          <div className="relative group">
                            <input 
                              type="file" 
                              accept="image/*"
                              onChange={handleImageUpload}
                              className="hidden"
                              id="image-upload"
                            />
                            <label 
                              htmlFor="image-upload"
                              className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:border-rose-500 hover:bg-rose-50 transition-all"
                            >
                              {isUploading ? (
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500" />
                              ) : formData.image ? (
                                <div className="relative w-full h-full p-2">
                                  <img 
                                    src={resolveImageUrl(formData.image)} 
                                    alt="Preview" 
                                    className="w-full h-full object-contain rounded-lg"
                                  />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg transition-opacity">
                                    <Upload className="text-white" size={24} />
                                  </div>
                                </div>
                              ) : (
                                <div className="flex flex-col items-center text-gray-400">
                                  <Upload size={24} className="mb-2" />
                                  <span className="text-xs font-medium">Click to upload image</span>
                                  <span className="text-[10px]">Max 800KB</span>
                                </div>
                              )}
                            </label>
                          </div>
                        </div>
                        <div className="md:w-1/2">
                          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Or Image Path/URL</label>
                          <input 
                            type="text" 
                            name="image"
                            value={formData.image}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 outline-none transition-all text-sm"
                            placeholder="e.g. Health and Comfort/Baby FirstAid.jpeg"
                          />
                          <p className="text-[10px] text-gray-400 mt-1">
                            Tip: For images in your public folder, just type the path (e.g. "Health and Comfort/image.jpg")
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea 
                        required
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-rose-500 outline-none transition-all resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <button 
                      type="submit"
                      disabled={isUploading}
                      className="flex-grow bg-rose-500 text-white py-4 rounded-xl font-bold hover:bg-rose-600 transition-colors shadow-lg shadow-rose-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Save size={20} />
                      <span>{editingId ? 'Update Product' : 'Save Product'}</span>
                    </button>
                    <button 
                      type="button"
                      onClick={resetForm}
                      className="px-8 py-4 rounded-xl font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

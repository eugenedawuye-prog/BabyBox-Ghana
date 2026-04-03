import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingBag, Filter, X } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';

interface StorePageProps {
  onAddToCart: (product: Product) => void;
}

export default function StorePage({ onAddToCart }: StorePageProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const activeCategory = searchParams.get('category');
  const activeAge = searchParams.get('age');

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const categoryMatch = !activeCategory || product.category === activeCategory;
      const ageMatch = !activeAge || product.ageRange === activeAge;
      return categoryMatch && ageMatch;
    });
  }, [activeCategory, activeAge]);

  const categories = Array.from(new Set(PRODUCTS.map(p => p.category)));
  const ages = Array.from(new Set(PRODUCTS.map(p => p.ageRange)));

  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Shop All Essentials</h1>
            <p className="text-gray-600">Curated products for your baby's development and comfort.</p>
          </div>
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="mt-4 md:mt-0 flex items-center space-x-2 bg-gray-100 px-6 py-3 rounded-full text-sm font-bold hover:bg-gray-200 transition-colors"
          >
            <Filter size={18} />
            <span>Filters {(activeCategory || activeAge) && '(Active)'}</span>
          </button>
        </div>

        {/* Filter Bar */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden mb-12 border-b border-gray-100 pb-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setSearchParams({ ...Object.fromEntries(searchParams), category: cat })}
                        className={`px-4 py-2 rounded-full text-sm transition-colors ${
                          activeCategory === cat ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-4">Age Range</h3>
                  <div className="flex flex-wrap gap-2">
                    {ages.map(age => (
                      <button
                        key={age}
                        onClick={() => setSearchParams({ ...Object.fromEntries(searchParams), age: age })}
                        className={`px-4 py-2 rounded-full text-sm transition-colors ${
                          activeAge === age ? 'bg-rose-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {age}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {(activeCategory || activeAge) && (
                <button 
                  onClick={clearFilters}
                  className="mt-6 text-sm text-rose-500 font-bold flex items-center hover:underline"
                >
                  <X size={14} className="mr-1" /> Clear All Filters
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="group"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100 mb-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={() => onAddToCart(product)}
                  className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg hover:bg-rose-500 hover:text-white transition-all transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  <ShoppingBag size={20} />
                </button>
              </div>
              <div className="px-2">
                <p className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-1">{product.category}</p>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{product.ageRange}</p>
                <p className="text-lg font-bold text-gray-900">GHS {product.price}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500">No products found for the selected filters.</p>
            <button 
              onClick={clearFilters}
              className="mt-4 text-rose-500 font-bold hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

import { AnimatePresence } from 'motion/react';

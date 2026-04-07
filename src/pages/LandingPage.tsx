import { motion } from 'motion/react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Package, 
  Heart, 
  Truck, 
  Star,
  ShoppingBag,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { resolveImageUrl } from '../utils';

interface LandingPageProps {
  onAddToCart: (product: Product) => void;
}

const FeaturedProducts = ({ onAddToCart }: { onAddToCart: (product: Product) => void }) => {
  const featured = PRODUCTS.slice(0, 4);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-rose-500 font-bold uppercase tracking-widest text-sm mb-4">Our Favorites</h2>
            <h3 className="text-4xl font-bold text-gray-900">Featured Essentials</h3>
          </div>
          <Link to="/store" className="text-rose-500 font-bold flex items-center hover:underline">
            View All <ChevronRight size={20} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100 mb-4">
                <img 
                  src={resolveImageUrl(product.image)} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <button 
                  onClick={() => onAddToCart(product)}
                  className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg hover:bg-rose-500 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                >
                  <ShoppingBag size={20} />
                </button>
              </div>
              <p className="text-xs font-bold text-rose-500 uppercase tracking-widest mb-1">{product.category}</p>
              <h4 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h4>
              <p className="text-lg font-bold text-gray-900">GHS {product.price}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AGES = [
  { label: '0-6 Months', href: `/store?age=${encodeURIComponent('0-6 Months')}` },
  { label: '7-12 Months', href: `/store?age=${encodeURIComponent('7-12 Months')}` },
  { label: '1-2 Years', href: `/store?age=${encodeURIComponent('1-2 Years')}` },
  { label: '2-3 Years', href: `/store?age=${encodeURIComponent('2-3 Years')}` },
  { label: '3+ Years', href: `/store?age=${encodeURIComponent('3+ Years')}` },
];

const CATEGORIES = [
  { label: 'Hygiene & Diapering', href: `/store?category=${encodeURIComponent('Hygiene & Diapering')}` },
  { label: 'Feeding & Nutrition', href: `/store?category=${encodeURIComponent('Feeding & Nutrition')}` },
  { label: 'Health & Comfort', href: `/store?category=${encodeURIComponent('Health & Comfort')}` },
  { label: 'Development & Play', href: `/store?category=${encodeURIComponent('Development & Play')}` },
];

const Hero = () => (
  <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
    <div className="absolute top-0 right-0 w-1/2 h-full bg-rose-50 -z-10 rounded-l-[100px] hidden lg:block" />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-rose-500 font-semibold tracking-widest uppercase text-sm mb-4">
            Curated | Conscious | Cute
          </h2>
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6">
            The Best For Your <br />
            <span className="text-rose-500">Little One</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-lg">
            Consciously curated baby essentials delivered to your door in Ghana. 
            Sustainable, stylish, and perfect for every milestone.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/store" className="bg-rose-500 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-rose-600 transition-all shadow-lg shadow-rose-200 flex items-center justify-center">
              Shop Now <ArrowRight className="ml-2" size={20} />
            </Link>
            <button className="bg-white text-gray-900 border-2 border-gray-100 px-8 py-4 rounded-full text-lg font-medium hover:border-rose-200 transition-all flex items-center justify-center">
              Give a Gift
            </button>
          </div>
          <div className="mt-10 flex items-center space-x-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`https://i.postimg.cc/h46W59R7/New-Baby-Starter-Set-Girls-Gift-Box.jpg`}
                  alt="Happy Baby"
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-bold text-gray-900">5,000+</span> Happy Families in Ghana
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 lg:mt-0 relative"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1594608661623-aa0bd3a69d98?auto=format&fit=crop&q=80&w=800&h=1000" 
              alt="African Baby and Mother" 
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl hidden sm:block"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle2 className="text-green-600" size={20} />
              </div>
              <div>
                <p className="text-xs text-gray-500">Eco-Friendly</p>
                <p className="text-sm font-bold text-gray-900">100% Organic</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </section>
);

const ShopBy = () => (
  <section className="py-24 bg-white overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Shop by Age</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {AGES.map((age) => (
              <motion.div key={age.label} whileHover={{ y: -5 }}>
                <Link
                  to={age.href}
                  className="block bg-rose-50 p-6 rounded-2xl text-center hover:bg-rose-100 transition-colors"
                >
                  <span className="block text-lg font-bold text-gray-900">{age.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {CATEGORIES.map((cat) => (
              <motion.div key={cat.label} whileHover={{ y: -5 }}>
                <Link
                  to={cat.href}
                  className="block bg-gray-50 p-6 rounded-2xl text-center hover:bg-gray-100 transition-colors flex flex-col items-center"
                >
                  <span className="block text-sm font-bold text-gray-900">{cat.label}</span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FeaturedIn = () => {
  const publications = ["Ghana Web", "Daily Graphic", "Modern Ghana", "Pulse Ghana", "YEN News"];
  return (
    <section className="py-12 border-y border-gray-100 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">Featured In</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale">
          {publications.map((pub) => (
            <span key={pub} className="text-xl font-bold text-gray-600 italic">{pub}</span>
          ))}
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      icon: <Package className="text-rose-500" size={32} />,
      title: "Select a Plan",
      description: "Choose from monthly or multi-month plans that fit your baby's age and your budget."
    },
    {
      icon: <Heart className="text-rose-500" size={32} />,
      title: "Personalize",
      description: "Tell us about your little one's size, style, and needs. We curate specifically for them."
    },
    {
      icon: <Truck className="text-rose-500" size={32} />,
      title: "Receive & Unbox",
      description: "Get your BabyBox delivered anywhere in Ghana. Unbox curated joy every month."
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Consciously Curated For Your Little One</h2>
          <p className="text-lg text-gray-600">We make it easy to provide the best for your baby while supporting local and sustainable brands.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="text-center p-8 rounded-3xl bg-rose-50/50 hover:bg-rose-50 transition-colors group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white shadow-sm mb-6 group-hover:scale-110 transition-transform">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ValueProps = () => {
  const props = [
    {
      title: "Unique Curation",
      description: "Each box is unique and consciously curated for a special little one.",
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80&w=800&h=600"
    },
    {
      title: "Sustainable Brands",
      description: "We introduce you to premium brands that care about the planet and your baby.",
      image: "https://images.unsplash.com/photo-1544126592-807daa2b567b?auto=format&fit=crop&q=80&w=800&h=600"
    },
    {
      title: "Save Time & Money",
      description: "Premium products at a fraction of the retail price, delivered to your door.",
      image: "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&q=80&w=800&h=600"
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-24">
          {props.map((prop, index) => (
            <div key={index} className={`flex flex-col lg:items-center gap-12 ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
              <div className="lg:w-1/2">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="rounded-3xl overflow-hidden shadow-xl"
                >
                  <img 
                    src={prop.image} 
                    alt={prop.title} 
                    className="w-full h-[400px] object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </div>
              <div className="lg:w-1/2">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">{prop.title}</h3>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">{prop.description}</p>
                <button className="text-rose-500 font-bold flex items-center hover:translate-x-2 transition-transform">
                  Learn More <ArrowRight className="ml-2" size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const plans = [
    {
      name: "Monthly",
      price: "GHS 450",
      period: "per box",
      features: ["5-10 Curated Items", "Free Delivery in Accra", "Cancel Anytime", "Personalized Style"],
      popular: false
    },
    {
      name: "3 Month Bundle",
      price: "GHS 1,200",
      period: "save GHS 150",
      features: ["10-15 Curated Items", "Free Delivery Nationwide", "Priority Support", "Personalized Style", "Bonus Gift in 1st Box"],
      popular: true
    },
    {
      name: "6 Month Bundle",
      price: "GHS 2,200",
      period: "save GHS 500",
      features: ["15-20 Curated Items", "Free Delivery Nationwide", "VIP Support", "Personalized Style", "Bonus Gift in Every Box"],
      popular: false
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Select Your Plan</h2>
          <p className="text-lg text-gray-600">Choose the subscription that works best for you and your baby.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`relative p-8 rounded-3xl border-2 transition-all ${
                plan.popular ? 'border-rose-500 shadow-xl scale-105 z-10 bg-white' : 'border-gray-100 hover:border-rose-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-rose-500 text-white px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </div>
              )}
              <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                <span className="text-gray-500 ml-2 text-sm">{plan.period}</span>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center text-gray-600 text-sm">
                    <CheckCircle2 className="text-rose-500 mr-2" size={16} />
                    {feature}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 rounded-full font-bold transition-all ${
                plan.popular ? 'bg-rose-500 text-white hover:bg-rose-600' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
              }`}>
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Reviews = () => {
  const reviews = [
    {
      name: "Ama Mensah",
      location: "Accra",
      text: "The quality of the clothes in the BabyBox is amazing. My daughter looks so cute in her new outfits!",
      stars: 5
    },
    {
      name: "Kofi Boateng",
      location: "Kumasi",
      text: "Best gift I've given my sister. She loves the surprise every month and the products are actually useful.",
      stars: 5
    },
    {
      name: "Efua Addo",
      location: "Tema",
      text: "I love that they include local Ghanaian brands. It's great to support our own while getting premium quality.",
      stars: 5
    }
  ];

  return (
    <section className="py-24 bg-rose-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center space-x-1 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="text-yellow-400 fill-yellow-400" size={24} />
            ))}
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Loved by Thousands of Families</h2>
          <p className="text-lg text-gray-600">Join our community of happy parents in Ghana.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl shadow-sm">
              <p className="text-gray-600 italic mb-6">"{review.text}"</p>
              <div>
                <p className="font-bold text-gray-900">{review.name}</p>
                <p className="text-sm text-gray-500">{review.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function LandingPage({ onAddToCart }: LandingPageProps) {
  return (
    <>
      <Hero />
      <ShopBy />
      <FeaturedProducts onAddToCart={onAddToCart} />
      <FeaturedIn />
      <HowItWorks />
      <ValueProps />
      <Pricing />
      <Reviews />
    </>
  );
}

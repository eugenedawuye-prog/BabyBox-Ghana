import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronDown, 
  Mail, 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  HelpCircle,
  Truck,
  RotateCcw,
  ShieldCheck
} from 'lucide-react';

const FAQS = [
  {
    question: "How does the subscription work?",
    answer: "Our subscription boxes are delivered every month. You can choose a monthly plan or a multi-month bundle to save more. Each box is curated based on your baby's age and stage of development."
  },
  {
    question: "Where do you deliver in Ghana?",
    answer: "We deliver nationwide across Ghana! Delivery within Accra is typically 1-2 business days, while other regions may take 3-5 business days."
  },
  {
    question: "Can I cancel my subscription?",
    answer: "Yes, you can cancel your monthly subscription at any time through your account settings. For multi-month bundles, the cancellation will take effect after the current bundle period ends."
  },
  {
    question: "What if I receive a damaged item?",
    answer: "We take great care in packaging our BabyBoxes, but if you receive a damaged item, please contact us within 48 hours of delivery with a photo of the item, and we will arrange a replacement."
  },
  {
    question: "Are the products safe for my baby?",
    answer: "Absolutely. We only source products from trusted brands that meet international safety standards. Many of our items are organic, BPA-free, and eco-friendly."
  }
];

export default function CustomerServicePage() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="pt-32 pb-20 bg-white min-h-screen">
      {/* Hero Section */}
      <section className="bg-rose-50 py-20 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">How can we help you?</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our team is here to support you and your little one. Find answers to common questions or get in touch with us.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Contact Us</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-rose-100 p-3 rounded-2xl text-rose-500">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Email</p>
                    <p className="text-gray-600">support@babyboxghana.com</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-rose-100 p-3 rounded-2xl text-rose-500">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Phone</p>
                    <p className="text-gray-600">+233 24 123 4567</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-rose-100 p-3 rounded-2xl text-rose-500">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">WhatsApp</p>
                    <p className="text-gray-600">+233 24 123 4567</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-rose-100 p-3 rounded-2xl text-rose-500">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Office</p>
                    <p className="text-gray-600">East Legon, Accra, Ghana</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-rose-100 p-3 rounded-2xl text-rose-500">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">Hours</p>
                    <p className="text-gray-600">Mon - Fri: 9am - 5pm</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-gray-50 p-6 rounded-2xl flex items-center space-x-4">
                <Truck className="text-rose-500" size={24} />
                <span className="font-bold text-gray-900">Track Order</span>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl flex items-center space-x-4">
                <RotateCcw className="text-rose-500" size={24} />
                <span className="font-bold text-gray-900">Returns & Exchanges</span>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl flex items-center space-x-4">
                <ShieldCheck className="text-rose-500" size={24} />
                <span className="font-bold text-gray-900">Privacy Policy</span>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
              <HelpCircle className="mr-3 text-rose-500" size={32} /> Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {FAQS.map((faq, index) => (
                <div 
                  key={index} 
                  className="border border-gray-100 rounded-3xl overflow-hidden"
                >
                  <button 
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-lg font-bold text-gray-900">{faq.question}</span>
                    <ChevronDown 
                      size={20} 
                      className={`text-gray-400 transition-transform ${expandedIndex === index ? 'rotate-180' : ''}`} 
                    />
                  </button>
                  <AnimatePresence>
                    {expandedIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-0 text-gray-600 leading-relaxed">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="mt-16 bg-gray-900 text-white p-10 rounded-[40px]">
              <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
              <p className="text-gray-400 mb-8">Send us a message and we'll get back to you as soon as possible.</p>
              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    type="text" 
                    placeholder="Name" 
                    className="bg-gray-800 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-rose-500 outline-none"
                  />
                  <input 
                    type="email" 
                    placeholder="Email" 
                    className="bg-gray-800 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-rose-500 outline-none"
                  />
                </div>
                <textarea 
                  placeholder="Your message" 
                  rows={4}
                  className="w-full bg-gray-800 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-rose-500 outline-none resize-none"
                ></textarea>
                <button className="bg-rose-500 text-white px-10 py-4 rounded-full font-bold hover:bg-rose-600 transition-colors">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

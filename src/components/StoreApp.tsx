'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import Header from './Header';
import Hero from './Hero';
import FeaturesBanner from './FeaturesBanner';
import ProductCatalog from './ProductCatalog';
import Testimonials from './Testimonials';
import Newsletter from './Newsletter';
import Footer from './Footer';
import ProductDetailModal from './ProductDetailModal';
import CartDrawer from './CartDrawer';
import CheckoutModal from './CheckoutModal';
import AboutModal from './AboutModal';
import ContactModal from './ContactModal';
import AdminPriceModal from './AdminPriceModal';
import { CheckCircle2 } from 'lucide-react';

export default function StoreApp() {
  const [searchQuery, setSearchQuery] = useState('');
  const { toastMessage } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-neutral-900 text-white text-xs font-semibold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 border border-neutral-700 animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Page Sections */}
      <main className="flex-1">
        <Hero />
        <FeaturesBanner />
        <ProductCatalog
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery('')}
        />
        <Testimonials />
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals & Drawers */}
      <ProductDetailModal />
      <CartDrawer />
      <CheckoutModal />
      <AboutModal />
      <ContactModal />
      <AdminPriceModal />
    </div>
  );
}

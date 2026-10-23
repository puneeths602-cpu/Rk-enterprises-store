'use client';

import React, { useState } from 'react';
import { ShoppingCart, Search, Menu, X, Phone, MapPin, MessageCircle, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { STORE_INFO } from '@/data/products';

interface HeaderProps {
  onSearchChange: (query: string) => void;
  searchQuery: string;
}

export default function Header({ onSearchChange, searchQuery }: HeaderProps) {
  const { cartCount, setIsCartOpen, setIsAboutOpen, setIsContactOpen, setIsAdminOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const scrollToCatalog = (category?: string) => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-amber-200 shadow-xs">
      {/* Top Business Notification Bar */}
      <div className="bg-amber-600 text-white text-xs py-2 px-4 font-medium">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 sm:gap-4">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <MapPin className="w-3.5 h-3.5 text-amber-200 shrink-0" />
            <span className="font-semibold tracking-wide">
              {STORE_INFO.address}, {STORE_INFO.district} - {STORE_INFO.pincode}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-semibold">
            <span className="hidden md:inline">Open Daily: 7:00 AM – 9:00 PM</span>
            <span className="hidden sm:inline">•</span>
            <a
              href={`tel:${STORE_INFO.phone1}`}
              className="hover:underline flex items-center gap-1 font-bold text-amber-100 hover:text-white"
            >
              <Phone className="w-3 h-3" />
              <span>{STORE_INFO.phone1}</span>
            </a>
            <span>/</span>
            <a
              href={`tel:${STORE_INFO.phone2}`}
              className="hover:underline font-bold text-amber-100 hover:text-white"
            >
              <span>{STORE_INFO.phone2}</span>
            </a>
            <a
              href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Hello%20RK%20Enterprises,%20I%20want%20to%20inquire%20about%20materials`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-0.5 rounded-full flex items-center gap-1 font-bold transition-colors"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Main Logo & Business Identity */}
          <div className="flex items-center gap-4 sm:gap-8">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-amber-600 flex items-center justify-center text-white font-black text-xl shadow-md group-hover:scale-105 transition-transform border border-amber-500">
                RK
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900">
                    RK ENTERPRISES
                  </span>
                </div>
                <span className="text-[11px] uppercase tracking-wider text-amber-700 font-bold -mt-0.5">
                  Cement • Steel • Pipes • Roofing & Hardware
                </span>
                <span className="text-[10px] text-neutral-500 font-medium hidden sm:inline">
                  Near APSRTC Bus Stand, Parchur
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-5 text-xs font-bold text-neutral-700">
              <button
                onClick={() => scrollToCatalog()}
                className="hover:text-amber-600 transition-colors py-1 cursor-pointer"
              >
                All Materials
              </button>
              <button
                onClick={() => scrollToCatalog()}
                className="hover:text-amber-600 transition-colors py-1 cursor-pointer"
              >
                Cement & Steel
              </button>
              <button
                onClick={() => scrollToCatalog()}
                className="hover:text-amber-600 transition-colors py-1 cursor-pointer"
              >
                MS & GI Pipes
              </button>
              <button
                onClick={() => scrollToCatalog()}
                className="hover:text-amber-600 transition-colors py-1 cursor-pointer"
              >
                Roofing Sheets
              </button>
              <button
                onClick={() => setIsAboutOpen(true)}
                className="hover:text-amber-600 transition-colors py-1 cursor-pointer"
              >
                About Store
              </button>
              <button
                onClick={() => setIsContactOpen(true)}
                className="hover:text-amber-600 transition-colors py-1 cursor-pointer"
              >
                Locate Us
              </button>
            </nav>
          </div>

          {/* Right Action Icons & Direct Contacts */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Input on Desktop */}
            <div className="relative hidden md:block w-56 lg:w-64">
              <input
                type="text"
                placeholder="Search cement, 8mm steel, pipes..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-neutral-100 hover:bg-neutral-200/70 focus:bg-white text-xs rounded-full pl-9 pr-8 py-2.5 text-neutral-900 placeholder:text-neutral-500 outline-none ring-1 ring-neutral-200 focus:ring-amber-500 transition-all"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-3 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3 top-2.5 text-xs text-neutral-400 hover:text-neutral-900"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Mobile Search Button */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden p-2 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Call Store Instant Action */}
            <a
              href={`tel:${STORE_INFO.phone1}`}
              className="hidden sm:flex items-center gap-1.5 bg-amber-50 border border-amber-200 hover:bg-amber-100 text-amber-800 text-xs font-bold px-3 py-2 rounded-xl transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-600" />
              <span>Call Us</span>
            </a>

            {/* Owner Daily Rates Quick Access */}
            <button
              onClick={() => setIsAdminOpen(true)}
              className="hidden sm:flex items-center gap-1.5 text-xs font-black text-amber-950 bg-amber-400 hover:bg-amber-300 px-3 py-2 rounded-xl transition-all cursor-pointer shadow-xs"
              title="Update daily market rates"
            >
              <span>⚡ Update Rates</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-neutral-900 bg-amber-500 hover:bg-amber-600 text-white rounded-xl transition-all group flex items-center gap-2 shadow-sm cursor-pointer"
              aria-label="View Materials Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden sm:inline text-xs font-bold text-neutral-950">Materials</span>
              {cartCount > 0 && (
                <span className="bg-neutral-950 text-amber-400 text-[11px] font-black w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-700 hover:text-neutral-900 rounded-xl hover:bg-neutral-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Input */}
        {searchOpen && (
          <div className="md:hidden pb-3 pt-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Deccan, Sagar, Tata, 8mm, JSW, CPVC..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                autoFocus
                className="w-full bg-neutral-100 text-sm rounded-xl pl-10 pr-4 py-2.5 text-neutral-900 placeholder:text-neutral-500 outline-none ring-2 ring-amber-500"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-200 px-6 py-6 space-y-4 animate-in fade-in">
          <div className="space-y-3 font-semibold text-sm text-neutral-800">
            <button
              onClick={() => scrollToCatalog()}
              className="flex items-center justify-between w-full text-left py-2 border-b border-neutral-100"
            >
              <span>Explore All Hardware & Materials</span>
              <ArrowRight className="w-4 h-4 text-amber-600" />
            </button>
            <button
              onClick={() => {
                setIsAboutOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between w-full text-left py-2 border-b border-neutral-100"
            >
              <span>About RK Enterprises</span>
              <ArrowRight className="w-4 h-4 text-amber-600" />
            </button>
            <button
              onClick={() => {
                setIsAdminOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between w-full text-left py-2 border-b border-neutral-100 text-amber-700 font-bold"
            >
              <span>⚡ Owner Panel: Update Daily Rates</span>
              <ArrowRight className="w-4 h-4 text-amber-600" />
            </button>
            <button
              onClick={() => {
                setIsContactOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between w-full text-left py-2 border-b border-neutral-100"
            >
              <span>Store Address & Map (Parchur)</span>
              <MapPin className="w-4 h-4 text-amber-600" />
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <a
              href={`tel:${STORE_INFO.phone1}`}
              className="w-full py-2.5 bg-amber-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call: {STORE_INFO.phone1}</span>
            </a>
            <a
              href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Hello%20RK%20Enterprises,%20I%20need%20price%20quotation`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 bg-emerald-600 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send WhatsApp Inquiry</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

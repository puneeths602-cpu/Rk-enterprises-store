'use client';

import React, { useState } from 'react';
import { Phone, CheckCircle2, MessageCircle, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { STORE_INFO } from '@/data/products';

export default function Newsletter() {
  const [mobile, setMobile] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const { showToast } = useCart();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobile.trim().length >= 10) {
      setSubscribed(true);
      showToast('Thank you! You are registered for RK Enterprises daily steel & cement rate updates.');
    }
  };

  return (
    <section className="bg-neutral-900 text-white py-14 sm:py-18 relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-64 bg-amber-600/15 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-5">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-800 text-amber-300 text-xs font-bold tracking-wider">
          <MessageCircle className="w-3.5 h-3.5 text-amber-400" />
          <span>DAILY PRICE NOTIFICATION SERVICE</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-black tracking-tight">
          Get Today&apos;s Cement & Steel Market Rates
        </h2>

        <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
          TMT steel and cement rates fluctuate daily. Enter your phone number to receive morning price bulletins directly on WhatsApp.
        </p>

        {subscribed ? (
          <div className="bg-neutral-800 border border-neutral-700 max-w-md mx-auto p-4 rounded-2xl flex items-center justify-center gap-2.5 text-emerald-400 text-xs font-bold animate-in zoom-in-95">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Subscribed! You will receive daily rate quotes on {mobile}.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input
                type="tel"
                required
                placeholder="Enter 10-digit Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 focus:border-amber-400 text-xs rounded-xl pl-9 pr-4 py-3 text-white placeholder:text-neutral-500 focus:outline-none transition-colors"
              />
              <Phone className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-3.5" />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs rounded-xl transition-all flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-md"
            >
              <span>Get Daily Rates</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] text-neutral-400 pt-2 font-mono">
          <span>Direct Contact: {STORE_INFO.phone1} / {STORE_INFO.phone2}</span>
          <span>•</span>
          <span>Near APSRTC Bus Stand, Parchur (523169)</span>
        </div>
      </div>
    </section>
  );
}

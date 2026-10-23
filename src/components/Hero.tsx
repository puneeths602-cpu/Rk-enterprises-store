'use client';

import React from 'react';
import { ArrowRight, Phone, MessageCircle, ShieldCheck, Truck, CheckCircle2, Award } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { STORE_INFO, PRODUCTS } from '@/data/products';

export default function Hero() {
  const { setQuickViewProduct } = useCart();
  const featuredTataTmt = PRODUCTS.find((p) => p.id === 'tmt-tata-tiscon') || PRODUCTS[3];

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-amber-50/60 via-white to-neutral-50 py-10 lg:py-16 border-b border-amber-200/80">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Store Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Store Location & Status Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-600 text-white text-xs font-bold tracking-wide shadow-sm">
              <Award className="w-4 h-4 text-amber-200" />
              <span>PARCHUR&apos;S PREMIER BUILDING MATERIALS & HARDWARE STORE</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-neutral-900 leading-[1.12]">
              Building Materials, <span className="text-amber-600 underline decoration-amber-400 decoration-wavy decoration-2">Steel, Cement</span> & Hardware.
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Authorized dealer for <strong>UltraTech, Deccan, & Sagar Cement</strong>, original <strong>Tata Tiscon, Vizag Steel & Godavari TMT Rebars (8mm to 20mm)</strong>, 
              <strong> MS & GI Pipes (Round & Square)</strong>, <strong>JSW & Jindal Roofing Sheets</strong>, plus full-size <strong>CPVC, PVC, HDPE & Garden Pipes</strong> with all joints.
            </p>

            {/* Key Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1">
              <button
                onClick={scrollToCatalog}
                className="w-full sm:w-auto px-7 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Browse Products & Prices</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Hello%20RK%20Enterprises,%20I%20want%20to%20send%20my%20building%20material%20requirement%20for%20price%20quotation`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all duration-200 flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Material List</span>
              </a>

              <a
                href={`tel:${STORE_INFO.phone1}`}
                className="w-full sm:w-auto px-5 py-3.5 bg-amber-50 hover:bg-amber-100 text-amber-900 font-bold text-xs rounded-xl border border-amber-300 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-700" />
                <span>Call {STORE_INFO.phone1}</span>
              </a>
            </div>

            {/* Trust Points */}
            <div className="pt-6 border-t border-neutral-200 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-neutral-600">
              <div className="flex items-center gap-1.5 font-bold text-neutral-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Genuine Factory Direct Brands</span>
              </div>

              <div className="flex items-center gap-1.5 font-semibold text-neutral-800">
                <Truck className="w-4 h-4 text-amber-600" />
                <span>Direct Site Tractor / Lorry Delivery</span>
              </div>

              <div className="flex items-center gap-1.5 font-semibold text-neutral-800">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                <span>Computerized Weighbridge Verification</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual Product Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Product Card Showcase */}
              <div className="relative rounded-3xl overflow-hidden bg-neutral-900 text-white shadow-2xl p-6 sm:p-7 border border-neutral-800">
                <div className="absolute top-4 right-4 z-10 bg-amber-500 text-neutral-950 font-black text-[11px] uppercase tracking-wider px-3 py-1 rounded-full shadow">
                  Daily Best Price
                </div>

                {/* Hero Image */}
                <div className="relative h-60 sm:h-68 w-full rounded-2xl overflow-hidden bg-neutral-950 mb-5 flex items-center justify-center border border-neutral-800">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={featuredTataTmt.image}
                    alt={featuredTataTmt.name}
                    className="w-full h-full object-contain p-2"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-neutral-200">
                    <span className="bg-amber-600 px-2.5 py-1 rounded-md font-bold text-white text-[11px]">
                      TATA TISCON 550D
                    </span>
                    <span className="font-semibold text-white">8mm • 10mm • 12mm • 16mm</span>
                  </div>
                </div>

                {/* Info & Price */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                        Primary Steel TMT Rebars
                      </p>
                      <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                        Tata Tiscon / Vizag Steel / Godavari
                      </h2>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-amber-400">
                        ₹495
                      </div>
                      <div className="text-[11px] text-neutral-400">
                        Per Rod (12m)
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-neutral-300">
                    High-strength earthquake-resistant steel with original brand embossing. Special wholesale tonnage rates available for house construction and commercial builders.
                  </p>

                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => setQuickViewProduct(featuredTataTmt)}
                      className="flex-1 py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      View Sizes & Specs
                    </button>
                    <a
                      href={`tel:${STORE_INFO.phone1}`}
                      className="py-2.5 px-4 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-bold text-xs rounded-xl transition-colors flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-amber-400" />
                      <span>Inquire Rate</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Floating Verified Depot badge */}
              <div className="hidden sm:flex absolute -bottom-5 -left-5 bg-white text-neutral-900 p-3.5 rounded-2xl shadow-xl border border-neutral-200 items-center gap-3 max-w-xs">
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-700 font-bold shrink-0">
                  RK
                </div>
                <div className="text-xs">
                  <p className="font-black text-neutral-900">Near APSRTC Bus Stand</p>
                  <p className="text-neutral-500 font-medium">Parchur, Bapatla Dist - 523169</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

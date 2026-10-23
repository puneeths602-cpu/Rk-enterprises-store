'use client';

import React from 'react';
import { Phone, MapPin, MessageCircle, Clock, ShieldCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { STORE_INFO } from '@/data/products';

export default function Footer() {
  const { setIsAboutOpen, setIsContactOpen, setIsAdminOpen } = useCart();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToCatalog = () => {
    const el = document.getElementById('catalog');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 text-neutral-400 text-xs border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-600 text-white font-black flex items-center justify-center text-lg shadow">
                RK
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-wider block">
                  RK ENTERPRISES
                </span>
                <span className="text-[10px] uppercase font-bold text-amber-500 tracking-wider">
                  Hardware • Steel • Cement & Pipes Depot
                </span>
              </div>
            </div>

            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Authorized wholesale & retail suppliers of UltraTech, Deccan, Sagar cement, Tata Tiscon, Vizag Steel & Godavari TMT rebars (8mm to 20mm), MS & GI pipes, JSW/Jindal roofing sheets, and complete CPVC/PVC/HDPE plumbing fittings.
            </p>

            <div className="space-y-2 text-neutral-300 text-xs">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{STORE_INFO.address}, {STORE_INFO.city}, {STORE_INFO.district} - {STORE_INFO.pincode}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Phones: </span>
                <a href={`tel:${STORE_INFO.phone1}`} className="text-white hover:underline font-bold">{STORE_INFO.phone1}</a>
                <span>/</span>
                <a href={`tel:${STORE_INFO.phone2}`} className="text-white hover:underline font-bold">{STORE_INFO.phone2}</a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Working Hours: Mon - Sun (7:00 AM - 9:00 PM)</span>
              </div>
            </div>

            <div className="pt-1">
              <a
                href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Hello%20RK%20Enterprises,%20I%20need%20price%20quotation`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Directly on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Product Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              Cement & Steel
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={scrollToCatalog} className="hover:text-white transition-colors cursor-pointer text-left">
                  UltraTech Cement (OPC & PPC)
                </button>
              </li>
              <li>
                <button onClick={scrollToCatalog} className="hover:text-white transition-colors cursor-pointer text-left">
                  Deccan Cements
                </button>
              </li>
              <li>
                <button onClick={scrollToCatalog} className="hover:text-white transition-colors cursor-pointer text-left">
                  Sagar Cements
                </button>
              </li>
              <li>
                <button onClick={scrollToCatalog} className="hover:text-white transition-colors cursor-pointer text-left">
                  Tata Tiscon 550D TMT Steel
                </button>
              </li>
              <li>
                <button onClick={scrollToCatalog} className="hover:text-white transition-colors cursor-pointer text-left">
                  Vizag Steel (RINL 8mm to 20mm)
                </button>
              </li>
              <li>
                <button onClick={scrollToCatalog} className="hover:text-white transition-colors cursor-pointer text-left">
                  Godavari High Strength Rebars
                </button>
              </li>
            </ul>
          </div>

          {/* Pipes & Roofing */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              Pipes & Roofing
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={scrollToCatalog} className="hover:text-white transition-colors cursor-pointer text-left">
                  MS Round & Square Hollow Pipes
                </button>
              </li>
              <li>
                <button onClick={scrollToCatalog} className="hover:text-white transition-colors cursor-pointer text-left">
                  MS Structural Angles (L-Angle)
                </button>
              </li>
              <li>
                <button onClick={scrollToCatalog} className="hover:text-white transition-colors cursor-pointer text-left">
                  GI Round Pipes (A, B, C Class)
                </button>
              </li>
              <li>
                <button onClick={scrollToCatalog} className="hover:text-white transition-colors cursor-pointer text-left">
                  GI Square & Rectangular Tubes
                </button>
              </li>
              <li>
                <button onClick={scrollToCatalog} className="hover:text-white transition-colors cursor-pointer text-left">
                  JSW Colouron+ Profile Sheets
                </button>
              </li>
              <li>
                <button onClick={scrollToCatalog} className="hover:text-white transition-colors cursor-pointer text-left">
                  Jindal Corrugated Roofing
                </button>
              </li>
            </ul>
          </div>

          {/* Plumbing & Depot Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-black text-white uppercase tracking-wider">
              Plumbing & Support
            </h4>
            <ul className="space-y-2">
              <li>
                <button onClick={scrollToCatalog} className="hover:text-white transition-colors cursor-pointer text-left">
                  CPVC Hot & Cold Water Pipes
                </button>
              </li>
              <li>
                <button onClick={scrollToCatalog} className="hover:text-white transition-colors cursor-pointer text-left">
                  CPVC Joints: Tees, Elbows, Couplers
                </button>
              </li>
              <li>
                <button onClick={scrollToCatalog} className="hover:text-white transition-colors cursor-pointer text-left">
                  PVC Agriculture & SWR Pipes
                </button>
              </li>
              <li>
                <button onClick={scrollToCatalog} className="hover:text-white transition-colors cursor-pointer text-left">
                  HDPE High-Density Pipes & Joints
                </button>
              </li>
              <li>
                <button onClick={scrollToCatalog} className="hover:text-white transition-colors cursor-pointer text-left">
                  Flexible Braided Garden Hoses
                </button>
              </li>
              <li>
                <button onClick={() => setIsContactOpen(true)} className="hover:text-amber-400 font-bold transition-colors cursor-pointer text-left">
                  Store Map & Phone Inquiry
                </button>
              </li>
              <li>
                <button onClick={() => setIsAdminOpen(true)} className="hover:text-amber-400 font-bold text-amber-500 transition-colors cursor-pointer text-left flex items-center gap-1">
                  <span>⚡ Update Daily Rates (Owner)</span>
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Location */}
        <div className="mt-10 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <div className="flex flex-wrap items-center gap-3">
            <p>© 2026 RK ENTERPRISES. All rights reserved.</p>
            <span>•</span>
            <span>Near APSRTC Bus Stand, Parchur, Bapatla Dist - 523169</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-400 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Authorized Building Material Stockist</span>
            </span>
            <button onClick={scrollToTop} className="hover:text-white transition-colors cursor-pointer">
              Top ↑
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}

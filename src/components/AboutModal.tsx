'use client';

import React from 'react';
import { X, CheckCircle, ShieldCheck, MapPin, Phone, Award } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { STORE_INFO } from '@/data/products';

export default function AboutModal() {
  const { isAboutOpen, setIsAboutOpen } = useCart();

  if (!isAboutOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsAboutOpen(false)}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-amber-600">
              Welcome To RK Enterprises
            </span>
            <h2 className="text-2xl font-black text-neutral-900 tracking-tight">
              Parchur&apos;s Trusted Building Materials Partner
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Located conveniently <strong>Near the APSRTC Bus Stand in Parchur (Bapatla District, AP)</strong>, 
            <strong> RK ENTERPRISES</strong> has built an outstanding reputation as the premier one-stop depot for contractors, builders, engineers, and independent homeowners.
          </p>

          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            We directly stock and supply certified materials from India&apos;s most reputed manufacturing plants:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1">
              <h4 className="font-black text-neutral-900 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-amber-600" />
                <span>Cement & Structural Steel</span>
              </h4>
              <p className="text-[11px] text-neutral-600">
                UltraTech, Deccan Cements, Sagar Cements, and Tata Tiscon, Vizag Steel, Godavari TMT rebars (8mm, 10mm, 12mm, 16mm, 20mm).
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1">
              <h4 className="font-black text-neutral-900 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-amber-600" />
                <span>MS & GI Structural Pipes</span>
              </h4>
              <p className="text-[11px] text-neutral-600">
                MS Round & Square Hollow pipes, heavy GI pipes in all diameters, and standard MS angular structural irons.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1">
              <h4 className="font-black text-neutral-900 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-amber-600" />
                <span>JSW & Jindal Roofing Sheets</span>
              </h4>
              <p className="text-[11px] text-neutral-600">
                JSW Colouron+ color coated sheets and Jindal Sabrang galvalume profile sheets custom cut to size.
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1">
              <h4 className="font-black text-neutral-900 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-amber-600" />
                <span>Plumbing, CPVC, PVC, HDPE</span>
              </h4>
              <p className="text-[11px] text-neutral-600">
                Complete CPVC & PVC pipes and fittings (Tees, Elbows, Couplings), HDPE agricultural pipes and flexible garden hoses.
              </p>
            </div>
          </div>

          {/* Store Location Card */}
          <div className="bg-neutral-900 text-white p-4 rounded-2xl space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-amber-400">
              <MapPin className="w-4 h-4" />
              <span>Depot Address & Contact Numbers</span>
            </div>
            <p className="text-neutral-300">
              {STORE_INFO.address}, {STORE_INFO.city}, {STORE_INFO.district}, Andhra Pradesh - {STORE_INFO.pincode}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-1 font-mono text-xs">
              <span className="flex items-center gap-1 text-emerald-400">
                <Phone className="w-3.5 h-3.5" />
                <span>{STORE_INFO.phone1}</span>
              </span>
              <span className="flex items-center gap-1 text-emerald-400">
                <Phone className="w-3.5 h-3.5" />
                <span>{STORE_INFO.phone2}</span>
              </span>
            </div>
          </div>

          <div className="pt-1 text-right">
            <button
              onClick={() => setIsAboutOpen(false)}
              className="px-6 py-2.5 bg-neutral-900 text-white font-bold text-xs rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Close Window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

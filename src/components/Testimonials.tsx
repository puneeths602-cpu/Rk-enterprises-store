'use client';

import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

const REVIEWS = [
  {
    name: 'K. Venkateswara Rao',
    role: 'Civil Contractor, Parchur Mandal',
    rating: 5,
    title: 'Genuine Tata Tiscon & UltraTech with exact weighbridge billing',
    text: 'I have been sourcing steel and cement from RK Enterprises for over 15 independent duplex projects in Parchur. Their computerized billing, genuine 8mm/10mm/12mm Tata Tiscon steel, and timely tractor unloading on site make them unbeatable.',
    material: 'UltraTech & Tata Tiscon 550D',
  },
  {
    name: 'M. Subba Rao',
    role: 'Industrial Shed & Truss Fabricator, Bapatla',
    rating: 5,
    title: 'Flawless JSW sheets and accurate gauge MS square pipes',
    text: 'For warehouse and factory shed works, JSW Colouron+ roofing sheets and MS square pipes from RK Enterprises are 100% genuine gauge. Zero sheet leakage, excellent profile finish, and wholesale prices.',
    material: 'JSW Roofing & MS Square Pipes',
  },
  {
    name: 'P. Anjaneyulu',
    role: 'Agricultural Farmer & Borewell Works, Near Parchur',
    rating: 5,
    title: 'Complete plumbing fittings & HDPE pipes in ready stock',
    text: 'Whenever we need CPVC pipes, T-joints, couplers, or heavy HDPE agricultural coils, RK Enterprises has all sizes ready in the shop near the bus stand. No need to travel to Guntur or Chirala.',
    material: 'CPVC Joints, PVC & HDPE Pipes',
  },
];

export default function Testimonials() {
  return (
    <section id="featured" className="bg-neutral-50 py-14 sm:py-18 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-black uppercase tracking-widest text-amber-600">
            Trusted In Parchur & Bapatla District
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
            Verified Contractor & Builder Experiences
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600">
            Over 1,000+ building projects supplied with genuine steel, cement, pipes, and roofing materials.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((review, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-3xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-amber-300" />
                </div>

                <h3 className="font-extrabold text-neutral-900 text-sm">
                  &ldquo;{review.title}&rdquo;
                </h3>

                <p className="text-xs text-neutral-600 leading-relaxed">
                  {review.text}
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-black text-neutral-900">{review.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <span className="text-[11px] text-neutral-500 block">{review.role}</span>
                </div>

                <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-right max-w-[120px] truncate">
                  {review.material}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

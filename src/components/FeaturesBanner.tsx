'use client';

import React from 'react';
import { Truck, ShieldCheck, Scale, PhoneCall } from 'lucide-react';
import { STORE_INFO } from '@/data/products';

const FEATURES = [
  {
    icon: ShieldCheck,
    title: '100% Genuine Brands',
    desc: 'Authorized supply of UltraTech, Deccan, Sagar, Tata Tiscon, Vizag Steel, JSW & Jindal.',
  },
  {
    icon: Truck,
    title: 'Site Delivery Service',
    desc: 'Prompt tractor and mini-lorry delivery directly to your building site across Parchur & Bapatla.',
  },
  {
    icon: Scale,
    title: 'Accurate Weight & Length',
    desc: 'Exact weight verified on digital electronic scale and standard factory-cut 6m/12m lengths.',
  },
  {
    icon: PhoneCall,
    title: 'Direct Contractor Rates',
    desc: `Call ${STORE_INFO.phone1} or ${STORE_INFO.phone2} for today's live wholesale market quotes.`,
  },
];

export default function FeaturesBanner() {
  return (
    <section className="bg-white py-10 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="flex items-start gap-4 p-4 rounded-2xl bg-amber-50/40 border border-amber-200/60 hover:bg-amber-50/80 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Icon className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-neutral-900 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useState } from 'react';
import { X, Phone, MapPin, MessageCircle, Clock, CheckCircle2, Send } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { STORE_INFO } from '@/data/products';

export default function ContactModal() {
  const { isContactOpen, setIsContactOpen, showToast } = useCart();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    siteLocation: 'Parchur',
    requirement: 'Cement & TMT Steel Rebars (8mm / 10mm / 12mm)',
    details: '',
  });

  if (!isContactOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showToast('Your inquiry has been submitted! RK Enterprises will contact you immediately.');
    
    // Also trigger WhatsApp with this inquiry
    setTimeout(() => {
      const msg = `*NEW MATERIAL INQUIRY - RK ENTERPRISES*\nName: ${formData.name}\nPhone: ${formData.phone}\nSite: ${formData.siteLocation}\nRequirement: ${formData.requirement}\nDetails: ${formData.details}`;
      window.open(`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
      setSubmitted(false);
      setIsContactOpen(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsContactOpen(false)}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 sm:p-8 space-y-5">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase tracking-widest text-amber-600">
              Direct Contact & Depot Visit
            </span>
            <h2 className="text-2xl font-black text-neutral-900 tracking-tight">
              RK ENTERPRISES - Parchur
            </h2>
            <p className="text-xs text-neutral-600">
              Call us directly or send your material estimate for instant contractor pricing.
            </p>
          </div>

          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-amber-50/70 p-4 rounded-2xl border border-amber-200">
            <div className="space-y-1">
              <span className="text-neutral-500 font-bold block">Contact Numbers:</span>
              <a href={`tel:${STORE_INFO.phone1}`} className="flex items-center gap-1.5 font-black text-amber-900 text-sm hover:underline">
                <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{STORE_INFO.formattedPhone1}</span>
              </a>
              <a href={`tel:${STORE_INFO.phone2}`} className="flex items-center gap-1.5 font-black text-amber-900 text-sm hover:underline">
                <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{STORE_INFO.formattedPhone2}</span>
              </a>
            </div>

            <div className="space-y-1">
              <span className="text-neutral-500 font-bold block">Store Location:</span>
              <p className="text-neutral-900 font-bold flex items-start gap-1">
                <MapPin className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{STORE_INFO.address}, {STORE_INFO.city}, {STORE_INFO.district} - {STORE_INFO.pincode}</span>
              </p>
              <p className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 pt-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Open 7 Days: 7:00 AM – 9:00 PM</span>
              </p>
            </div>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
              <h3 className="font-bold text-neutral-900 text-sm">Estimate Request Sent!</h3>
              <p className="text-xs text-neutral-600">
                Opening WhatsApp to connect you directly with RK Enterprises dispatch team.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Srinivas Rao"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 mb-1">Mobile Phone Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="10-digit mobile number"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 mb-1">Delivery Site Area / Town</label>
                  <input
                    type="text"
                    placeholder="Parchur / Inkollu / Karamchedu / Bapatla"
                    value={formData.siteLocation}
                    onChange={(e) => setFormData({ ...formData, siteLocation: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-600"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 mb-1">Primary Material Needed</label>
                  <select
                    value={formData.requirement}
                    onChange={(e) => setFormData({ ...formData, requirement: e.target.value })}
                    className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-600 font-medium"
                  >
                    <option value="Cement (UltraTech / Deccan / Sagar)">Cement (UltraTech / Deccan / Sagar)</option>
                    <option value="TMT Steel Bars (8mm, 10mm, 12mm, 16mm)">TMT Steel Bars (8mm, 10mm, 12mm, 16mm)</option>
                    <option value="MS Round & Square Pipes / Angles">MS Round & Square Pipes / Angles</option>
                    <option value="GI Pipes (Round / Square)">GI Pipes (Round / Square)</option>
                    <option value="Roofing Sheets (JSW / Jindal)">Roofing Sheets (JSW / Jindal)</option>
                    <option value="Plumbing CPVC & PVC Pipes and Joints">Plumbing CPVC & PVC Pipes and Joints</option>
                    <option value="HDPE Agricultural & Garden Hose Pipes">HDPE Agricultural & Garden Hose Pipes</option>
                    <option value="Full House Construction Package">Full House Construction Package</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-neutral-700 mb-1">Estimated Quantities / Sizes</label>
                <textarea
                  rows={2}
                  placeholder="e.g. 100 bags UltraTech, 2 tons 10mm Tata steel, 30 JSW sheets..."
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl p-3 text-xs text-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-600"
                />
              </div>

              <div className="pt-2 flex items-center justify-between gap-3">
                <a
                  href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Hello%20RK%20Enterprises,%20I%20want%20to%20inquire%20about%20materials`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Open WhatsApp Direct</span>
                </a>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsContactOpen(false)}
                    className="px-4 py-2.5 text-xs font-bold text-neutral-600 hover:text-neutral-900 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-black text-xs rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Inquiry</span>
                  </button>
                </div>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}

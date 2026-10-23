'use client';

import React, { useState } from 'react';
import { X, Search, Check, RotateCcw, ShieldCheck, Tag, Save } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function AdminPriceModal() {
  const { products, updateProductPrice, resetAllPrices, isAdminOpen, setIsAdminOpen, showToast } = useCart();
  const [search, setSearch] = useState('');
  const [editPrices, setEditPrices] = useState<Record<string, { price: number; originalPrice?: number }>>({});
  const [savedId, setSavedId] = useState<string | null>(null);

  if (!isAdminOpen) return null;

  const handlePriceChange = (id: string, value: string) => {
    const num = parseFloat(value);
    setEditPrices((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        price: isNaN(num) ? 0 : num,
      },
    }));
  };

  const handleOriginalPriceChange = (id: string, value: string) => {
    const num = parseFloat(value);
    setEditPrices((prev) => ({
      ...prev,
      [id]: {
        price: prev[id]?.price ?? products.find((p) => p.id === id)?.price ?? 0,
        originalPrice: isNaN(num) ? undefined : num,
      },
    }));
  };

  const handleSaveSingle = (id: string) => {
    const current = editPrices[id];
    if (current && current.price > 0) {
      updateProductPrice(id, current.price, current.originalPrice);
      setSavedId(id);
      setTimeout(() => setSavedId(null), 1500);
    }
  };

  const handleSaveAll = () => {
    let count = 0;
    Object.entries(editPrices).forEach(([id, data]) => {
      if (data.price > 0) {
        updateProductPrice(id, data.price, data.originalPrice);
        count++;
      }
    });
    if (count > 0) {
      showToast(`Updated live rates for ${count} building materials.`);
    }
    setIsAdminOpen(false);
  };

  const filtered = products.filter((p) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-200 bg-neutral-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-neutral-950 font-black flex items-center justify-center text-lg">
              ₹
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black tracking-tight">
                  RK Enterprises — Daily Price & Rate Manager
                </h2>
                <span className="text-[10px] bg-amber-500 text-neutral-950 font-black px-2 py-0.5 rounded-full uppercase">
                  Owner Panel
                </span>
              </div>
              <p className="text-xs text-neutral-400 mt-0.5">
                Update market rates for Cement, TMT Steel, Pipes & Roofing in seconds. Changes apply live to all cards, cart & WhatsApp.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminOpen(false)}
            className="p-1.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Bulk Action Bar */}
        <div className="p-4 border-b border-neutral-200 bg-amber-50/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Filter materials (e.g. UltraTech, Tata, 8mm)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white border border-neutral-300 rounded-xl pl-9 pr-3 py-2 text-xs text-neutral-900 focus:outline-none focus:ring-1 focus:ring-amber-600"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={resetAllPrices}
              className="px-3.5 py-2 text-xs font-bold text-neutral-600 hover:text-rose-600 border border-neutral-300 rounded-xl bg-white hover:bg-rose-50 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>

            <button
              onClick={handleSaveAll}
              className="px-5 py-2 text-xs font-black text-neutral-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Apply & Close</span>
            </button>
          </div>
        </div>

        {/* Material Price List Table */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 divide-y divide-neutral-100 space-y-3">
          {filtered.map((item) => {
            const currentPrice = editPrices[item.id]?.price ?? item.price;
            const currentOriginal = editPrices[item.id]?.originalPrice ?? item.originalPrice ?? '';
            const isModified = editPrices[item.id] !== undefined && editPrices[item.id].price !== item.price;
            const isJustSaved = savedId === item.id;

            return (
              <div
                key={item.id}
                className="pt-3 pb-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:bg-neutral-50 p-2.5 rounded-2xl transition-colors"
              >
                {/* Item Thumbnail & Details */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-14 h-14 rounded-xl bg-white border border-neutral-200 overflow-hidden shrink-0 flex items-center justify-center p-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                        {item.brand}
                      </span>
                      <span className="text-[10px] text-neutral-400">
                        {item.category}
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-black text-neutral-900 truncate">
                      {item.name}
                    </h4>
                    <span className="text-[11px] text-neutral-500 font-medium">
                      Unit: {item.unit}
                    </span>
                  </div>
                </div>

                {/* Price Editing Inputs */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex items-center gap-1.5">
                    <div>
                      <label className="block text-[10px] font-bold text-neutral-500 mb-0.5">
                        New Selling Rate (₹)
                      </label>
                      <div className="relative">
                        <span className="absolute left-2.5 top-1.5 text-xs font-bold text-neutral-500">₹</span>
                        <input
                          type="number"
                          value={currentPrice}
                          onChange={(e) => handlePriceChange(item.id, e.target.value)}
                          className="w-24 sm:w-28 bg-white border-2 border-neutral-300 focus:border-amber-600 rounded-xl pl-6 pr-2 py-1.5 text-xs font-black text-neutral-900 outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold text-neutral-400 mb-0.5">
                        Strikethrough MRP (₹)
                      </label>
                      <div className="relative">
                        <span className="absolute left-2.5 top-1.5 text-xs text-neutral-400">₹</span>
                        <input
                          type="number"
                          placeholder="MRP"
                          value={currentOriginal}
                          onChange={(e) => handleOriginalPriceChange(item.id, e.target.value)}
                          className="w-20 sm:w-24 bg-white border border-neutral-300 focus:border-neutral-500 rounded-xl pl-6 pr-2 py-1.5 text-xs font-medium text-neutral-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Save Single Item Button */}
                  <div className="self-end pt-3 sm:pt-0">
                    <button
                      onClick={() => handleSaveSingle(item.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                        isJustSaved
                          ? 'bg-emerald-600 text-white'
                          : isModified
                          ? 'bg-amber-600 hover:bg-amber-500 text-white shadow'
                          : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                      }`}
                    >
                      {isJustSaved ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Saved</span>
                        </>
                      ) : (
                        <span>Update</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Changes persist automatically in your browser storage.</span>
          </div>
          <button
            onClick={() => setIsAdminOpen(false)}
            className="font-bold text-neutral-800 hover:text-neutral-950 cursor-pointer"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { X, Search, Check, RotateCcw, ShieldCheck, Save, Lock, KeyRound, Eye, EyeOff, LogOut, Settings } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function AdminPriceModal() {
  const { products, updateProductPrice, resetAllPrices, isAdminOpen, setIsAdminOpen, showToast } = useCart();
  
  // Security states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [storedPin, setStoredPin] = useState('9948'); // Default owner PIN (matches 9948847768)
  
  // Change PIN mode
  const [isChangingPin, setIsChangingPin] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinChangeMsg, setPinChangeMsg] = useState('');

  // Editing states
  const [search, setSearch] = useState('');
  const [editPrices, setEditPrices] = useState<Record<string, { price: number; originalPrice?: number }>>({});
  const [savedId, setSavedId] = useState<string | null>(null);

  // Load custom PIN if set
  useEffect(() => {
    try {
      const saved = localStorage.getItem('rk_owner_pin');
      if (saved) {
        setStoredPin(saved);
      }
    } catch {
      // Ignore
    }
  }, []);

  if (!isAdminOpen) return null;

  const handleVerifyPin = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredPin === storedPin) {
      setIsAuthenticated(true);
      setPinError('');
      setEnteredPin('');
      showToast('Owner access verified successfully.');
    } else {
      setPinError('Incorrect Owner PIN. Access restricted to RK Enterprises management only.');
      setEnteredPin('');
    }
  };

  const handleLockLogout = () => {
    setIsAuthenticated(false);
    setIsChangingPin(false);
    setEnteredPin('');
    setPinError('');
    setIsAdminOpen(false);
    showToast('Owner panel locked and logged out.');
  };

  const handleChangePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length < 4) {
      setPinChangeMsg('PIN must be at least 4 digits.');
      return;
    }
    if (newPin !== confirmPin) {
      setPinChangeMsg('New PIN and Confirm PIN do not match.');
      return;
    }
    try {
      localStorage.setItem('rk_owner_pin', newPin);
      setStoredPin(newPin);
      setIsChangingPin(false);
      setNewPin('');
      setConfirmPin('');
      setPinChangeMsg('');
      showToast('New Owner Security PIN saved successfully.');
    } catch {
      setPinChangeMsg('Failed to save PIN.');
    }
  };

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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* If Not Authenticated: Show Owner PIN Security Gate */}
      {!isAuthenticated ? (
        <div
          className="relative bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 p-6 sm:p-8 animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => setIsAdminOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto shadow-sm">
              <Lock className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-black uppercase tracking-widest text-amber-600">
                RK ENTERPRISES • RESTRICTED ACCESS
              </span>
              <h2 className="text-xl font-black text-neutral-900 tracking-tight">
                Shop Owner Verification
              </h2>
              <p className="text-xs text-neutral-500 leading-relaxed max-w-xs mx-auto">
                Only the shop owner is authorized to update daily steel, cement, and pipe market rates.
              </p>
            </div>

            <form onSubmit={handleVerifyPin} className="space-y-4 pt-2 text-left">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Enter Owner Security PIN:
                </label>
                <div className="relative">
                  <input
                    type={showPin ? 'text' : 'password'}
                    required
                    autoFocus
                    placeholder="Enter 4-digit PIN"
                    value={enteredPin}
                    onChange={(e) => {
                      setEnteredPin(e.target.value);
                      setPinError('');
                    }}
                    className="w-full bg-neutral-50 border-2 border-neutral-300 focus:border-amber-600 rounded-xl pl-10 pr-10 py-2.5 text-center text-lg font-mono font-bold tracking-widest text-neutral-900 outline-none transition-colors"
                  />
                  <KeyRound className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3.5" />
                  <button
                    type="button"
                    onClick={() => setShowPin(!showPin)}
                    className="absolute right-3.5 top-3.5 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                  >
                    {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {pinError && (
                  <p className="text-xs text-rose-600 font-bold mt-1 text-center animate-shake">
                    {pinError}
                  </p>
                )}
                <p className="text-[11px] text-neutral-400 text-center mt-1">
                  Default PIN: <strong className="font-mono text-neutral-600">9948</strong> (Changeable inside)
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-white font-black text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Verify & Unlock Rate Manager</span>
              </button>
            </form>

            <div className="pt-2 text-[11px] text-neutral-400">
              Customers and unauthorized visitors cannot modify store prices.
            </div>
          </div>
        </div>
      ) : (
        /* If Authenticated: Show Full Rate Editor with Lock & PIN Management */
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
                  <span className="text-[10px] bg-emerald-500 text-neutral-950 font-black px-2 py-0.5 rounded-full uppercase flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    <span>Owner Verified</span>
                  </span>
                </div>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Update live market rates for Cement, TMT Steel, Pipes & Roofing. Updates apply instantly across the site & WhatsApp.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsChangingPin(!isChangingPin)}
                className="p-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white transition-colors cursor-pointer text-xs font-bold flex items-center gap-1"
                title="Change Owner PIN"
              >
                <Settings className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Change PIN</span>
              </button>

              <button
                onClick={handleLockLogout}
                className="p-2 rounded-xl bg-rose-900/60 hover:bg-rose-800 text-rose-200 hover:text-white transition-colors cursor-pointer text-xs font-bold flex items-center gap-1"
                title="Lock & Logout"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Lock</span>
              </button>
            </div>
          </div>

          {/* Change PIN Dropdown Form */}
          {isChangingPin && (
            <div className="bg-amber-50 p-4 border-b border-amber-200 animate-in slide-in-from-top-2">
              <form onSubmit={handleChangePinSubmit} className="max-w-xl mx-auto space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-amber-900 flex items-center gap-1">
                    <KeyRound className="w-3.5 h-3.5 text-amber-700" />
                    <span>Set Custom Owner Security PIN</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsChangingPin(false)}
                    className="text-xs text-neutral-500 hover:text-neutral-800"
                  >
                    Cancel
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="password"
                    placeholder="New PIN (min 4 digits)"
                    value={newPin}
                    onChange={(e) => setNewPin(e.target.value)}
                    className="bg-white border border-neutral-300 rounded-xl px-3 py-1.5 text-xs text-neutral-900 outline-none"
                  />
                  <input
                    type="password"
                    placeholder="Confirm New PIN"
                    value={confirmPin}
                    onChange={(e) => setConfirmPin(e.target.value)}
                    className="bg-white border border-neutral-300 rounded-xl px-3 py-1.5 text-xs text-neutral-900 outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs rounded-xl py-1.5 px-3"
                  >
                    Save New PIN
                  </button>
                </div>
                {pinChangeMsg && (
                  <p className="text-[11px] font-bold text-rose-600">{pinChangeMsg}</p>
                )}
              </form>
            </div>
          )}

          {/* Search & Bulk Action Bar */}
          <div className="p-4 border-b border-neutral-200 bg-neutral-50 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search material (e.g. UltraTech, Tata, 8mm)..."
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

          {/* Material Price List */}
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

                  {/* Price Inputs */}
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

                    {/* Save Single Item */}
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
              <span>Protected by Owner PIN. Click &apos;Lock&apos; when done.</span>
            </div>
            <button
              onClick={handleLockLogout}
              className="font-bold text-neutral-800 hover:text-neutral-950 cursor-pointer flex items-center gap-1"
            >
              <LogOut className="w-3.5 h-3.5 text-neutral-500" />
              <span>Lock & Close</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}

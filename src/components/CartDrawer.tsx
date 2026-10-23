'use client';

import React, { useState } from 'react';
import { X, Trash2, ShoppingCart, ArrowRight, Tag, MessageCircle, Truck, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { STORE_INFO } from '@/data/products';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    discount,
    promoCode,
    promoError,
    applyPromo,
    removePromo,
    delivery,
    total,
    setIsCheckoutOpen,
    sendOrderToWhatsApp,
  } = useCart();

  const [inputCode, setInputCode] = useState('');

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = 5000;
  const progressPercent = Math.min(100, Math.round((subtotal / freeDeliveryThreshold) * 100));
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCode.trim()) {
      applyPromo(inputCode);
      setInputCode('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-amber-50/50">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-amber-600" />
              <h2 className="text-base font-black text-neutral-900">
                Selected Building Materials
              </h2>
              <span className="text-xs bg-amber-600 text-white font-black px-2 py-0.5 rounded-full">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-neutral-500 hover:text-rose-600 font-medium mr-2 cursor-pointer"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-1.5 rounded-full text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Local Parchur Site Delivery Progress */}
          <div className="bg-amber-50 px-5 py-3 border-b border-amber-200">
            {remainingForFreeDelivery > 0 ? (
              <div className="space-y-1 text-xs text-amber-950">
                <div className="flex items-center justify-between font-semibold">
                  <span>Add <strong>₹{remainingForFreeDelivery.toLocaleString('en-IN')}</strong> for <strong>Free Site Delivery (Parchur)</strong></span>
                  <span className="font-bold">{progressPercent}%</span>
                </div>
                <div className="w-full bg-amber-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>You qualify for <strong>Free Local Site Transport (Parchur area)!</strong></span>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                  <ShoppingCart className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-black text-neutral-800 text-sm">No materials added yet</h3>
                  <p className="text-xs text-neutral-500 max-w-xs">
                    Browse our UltraTech/Deccan cement, Tata Tiscon/Vizag steel rebars, MS/GI pipes, and plumbing fittings.
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 bg-neutral-900 text-white font-bold text-xs rounded-xl hover:bg-amber-600 transition-colors cursor-pointer"
                >
                  Browse Hardware Catalog
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedSize || ''}`}
                  className="flex gap-3.5 p-3 rounded-2xl bg-neutral-50 border border-neutral-200 relative group"
                >
                  {/* Thumbnail */}
                  <div className="w-18 h-18 rounded-xl overflow-hidden bg-white shrink-0 border border-neutral-200 flex items-center justify-center">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-contain p-1"
                    />
                  </div>

                  {/* Info & Quantity */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-neutral-900 leading-snug line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                          className="text-neutral-400 hover:text-rose-600 transition-colors cursor-pointer p-0.5"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-1.5 py-0.5 rounded">
                          {item.selectedSize || 'Standard'}
                        </span>
                        <span className="text-[10px] text-neutral-500 font-medium">
                          {item.product.unit}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity stepper */}
                      <div className="flex items-center border border-neutral-300 rounded-lg bg-white px-1.5 py-0.5">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedSize)}
                          className="w-5 h-5 flex items-center justify-center text-xs text-neutral-600 hover:text-neutral-900 cursor-pointer font-bold"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-black text-neutral-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedSize)}
                          className="w-5 h-5 flex items-center justify-center text-xs text-neutral-600 hover:text-neutral-900 cursor-pointer font-bold"
                        >
                          +
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-xs font-black text-neutral-900">
                          ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                        </span>
                        {item.quantity > 1 && (
                          <span className="block text-[10px] text-neutral-400">
                            ₹{item.product.price} each
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Area: Promo Code & Checkout / WhatsApp Actions */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-neutral-200 bg-neutral-50 space-y-3.5">
              
              {/* Promo / Discount Coupon */}
              <div className="space-y-1">
                {promoCode ? (
                  <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl px-3 py-1.5 text-xs text-emerald-800">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Code <strong>{promoCode}</strong> applied</span>
                    </div>
                    <button
                      onClick={removePromo}
                      className="text-emerald-700 hover:text-rose-600 font-bold text-xs cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g. RKBUILD5)"
                      value={inputCode}
                      onChange={(e) => setInputCode(e.target.value)}
                      className="flex-1 bg-white border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-amber-600"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoError && (
                  <p className="text-[11px] text-rose-600 pl-1">{promoError}</p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-neutral-700 border-t border-neutral-200 pt-2.5">
                <div className="flex justify-between">
                  <span>Materials Subtotal</span>
                  <span className="font-bold text-neutral-900">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount</span>
                    <span>-₹{discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Site Delivery (Parchur area)</span>
                  <span className="font-bold">
                    {delivery === 0 ? <strong className="text-emerald-700">FREE</strong> : `₹${delivery}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black text-neutral-900 border-t border-neutral-200 pt-2">
                  <span>Estimated Total</span>
                  <span className="text-amber-700">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                {/* 1. Direct WhatsApp Order Send */}
                <button
                  onClick={() => sendOrderToWhatsApp()}
                  className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Order directly via WhatsApp</span>
                </button>

                {/* 2. Site Delivery Order Form */}
                <button
                  onClick={handleProceedToCheckout}
                  className="w-full py-3 px-4 bg-neutral-900 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2 cursor-pointer group"
                >
                  <span>Book Site Delivery & Invoice</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-500 font-medium">
                <Truck className="w-3.5 h-3.5 text-amber-600" />
                <span>RK Enterprises • Direct Unloading at Construction Site</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { X, Check, ShoppingCart, MessageCircle, Phone, Truck, ShieldCheck, Scale } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { STORE_INFO } from '@/data/products';

export default function ProductDetailModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, setIsCartOpen } = useCart();
  const [selectedImgIdx, setSelectedImgIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  if (!quickViewProduct) return null;

  const product = quickViewProduct;
  const currentSize = selectedSize || (product.availableSizes && product.availableSizes.length > 0 ? product.availableSizes[0] : undefined);
  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  const handleAddToCart = () => {
    addToCart(product, quantity, currentSize);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      setQuickViewProduct(null);
      setIsCartOpen(true);
    }, 600);
  };

  const handleWhatsAppQuote = () => {
    const text = `Hello RK Enterprises, I am looking for *${product.name}*.\n• Selected Size/Type: ${currentSize || 'Standard'}\n• Quantity Required: ${quantity} (${product.unit})\n• Rate: ₹${product.price}\nPlease confirm current stock and best rate for site delivery in Parchur.`;
    const url = `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div
        className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden border border-neutral-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Image & Assurance Badges */}
          <div className="p-6 sm:p-8 bg-neutral-50 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-200">
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-white shadow-sm border border-neutral-200 flex items-center justify-center">
                {product.badge && (
                  <div className="absolute top-3 left-3 z-10 text-[10px] uppercase font-black tracking-wider px-3 py-1 rounded-md bg-amber-600 text-white shadow">
                    {product.badge}
                  </div>
                )}
                <div className="absolute top-3 right-3 z-10 text-xs font-black px-2.5 py-1 rounded-md bg-neutral-900 text-white shadow">
                  {product.brand}
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={images[selectedImgIdx] || product.image}
                  alt={product.name}
                  className="w-full h-full object-contain p-4"
                />
              </div>

              {/* Thumbnails if multiple */}
              {images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImgIdx(idx)}
                      className={`relative w-16 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer shrink-0 ${
                        selectedImgIdx === idx ? 'border-amber-600 shadow-sm' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Store Guarantee Pillars */}
            <div className="pt-6 border-t border-neutral-200/80 grid grid-cols-3 gap-2 text-center text-[11px] text-neutral-600 font-bold">
              <div className="flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Original Brand</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Scale className="w-4 h-4 text-blue-600" />
                <span>Weighbridge Verified</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-amber-600" />
                <span>Parchur Site Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Material Specs & Purchase Form */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto space-y-6">
            <div className="space-y-4">
              
              {/* Category */}
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-wider font-black text-amber-700">
                  {product.category}
                </span>
                <span className="text-emerald-700 font-bold bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                  In Stock at Parchur
                </span>
              </div>

              {/* Title & Tagline */}
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-neutral-900 tracking-tight leading-snug">
                  {product.name}
                </h2>
                <p className="text-xs text-neutral-600 font-medium mt-1">
                  {product.tagline}
                </p>
              </div>

              {/* Price & Unit */}
              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-3xl font-black text-neutral-900">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-bold text-neutral-500">
                  {product.unit}
                </span>
                {product.originalPrice && (
                  <span className="text-xs text-neutral-400 line-through ml-2">
                    ₹{product.originalPrice}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-xs text-neutral-600 leading-relaxed">
                {product.description}
              </p>

              {/* Available Sizes / Variants */}
              {product.availableSizes && product.availableSizes.length > 0 && (
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-neutral-800">Select Available Size / Gauge:</span>
                    <span className="text-amber-700 font-black">{currentSize}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.availableSizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                          currentSize === sz
                            ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                            : 'bg-neutral-50 text-neutral-700 border-neutral-300 hover:border-neutral-500'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Features / Highlights */}
              {product.features && product.features.length > 0 && (
                <div className="space-y-1.5 bg-amber-50/50 p-3.5 rounded-xl border border-amber-200/60">
                  <p className="text-[11px] font-black uppercase tracking-wider text-amber-900">
                    Product Highlights & Quality Benchmarks
                  </p>
                  <ul className="space-y-1 text-xs text-neutral-700">
                    {product.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technical Specifications */}
              {product.specs && (
                <div className="pt-2 border-t border-neutral-200">
                  <p className="text-[11px] font-black uppercase tracking-wider text-neutral-500 mb-2">
                    Technical Specifications
                  </p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(product.specs).map(([key, val]) => (
                      <div key={key} className="bg-neutral-50 p-2.5 rounded-lg border border-neutral-200">
                        <span className="text-neutral-500 block text-[10px] uppercase font-bold">{key}</span>
                        <span className="font-bold text-neutral-900">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions: Quantity, Add to Cart & WhatsApp */}
            <div className="pt-4 border-t border-neutral-200 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center border border-neutral-300 rounded-xl bg-white px-2 py-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-neutral-900 font-bold transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-black text-neutral-900">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:text-neutral-900 font-bold transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer ${
                    added
                      ? 'bg-emerald-600 text-white'
                      : 'bg-neutral-900 hover:bg-neutral-800 text-white'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Materials List!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Materials Order • ₹{(product.price * quantity).toLocaleString('en-IN')}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Instant WhatsApp Quote Button */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleWhatsAppQuote}
                  className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Quote</span>
                </button>

                <a
                  href={`tel:${STORE_INFO.phone1}`}
                  className="py-2.5 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors text-center"
                >
                  <Phone className="w-4 h-4 text-amber-700" />
                  <span>Call {STORE_INFO.phone1}</span>
                </a>
              </div>

              <p className="text-[11px] text-center text-neutral-500">
                RK Enterprises • Near APSRTC Bus Stand, Parchur • Ph: 9948847768 / 9063646468
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

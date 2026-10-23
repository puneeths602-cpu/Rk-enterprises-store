'use client';

import React, { useState } from 'react';
import { Eye, Plus, Check, MessageCircle } from 'lucide-react';
import { Product } from '@/types/ecommerce';
import { useCart } from '@/context/CartContext';
import { STORE_INFO } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, setQuickViewProduct } = useCart();
  const [selectedSize, setSelectedSize] = useState(
    product.availableSizes && product.availableSizes.length > 0 ? product.availableSizes[0] : undefined
  );
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case 'Authorized Dealer':
        return 'bg-amber-600 text-white';
      case 'ISI Certified':
        return 'bg-emerald-700 text-white';
      case 'Best Seller':
        return 'bg-neutral-900 text-amber-300';
      case 'Bulk Deal':
        return 'bg-blue-600 text-white';
      default:
        return 'bg-neutral-800 text-white';
    }
  };

  const handleWhatsAppInquiry = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = `Hello RK Enterprises, I am inquiring about *${product.name}* (Size: ${selectedSize || 'Standard'}, Rate: ₹${product.price} ${product.unit}). Please share availability and delivery quote to Parchur.`;
    const url = `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <div
      onClick={() => setQuickViewProduct(product)}
      className="group relative bg-white rounded-2xl border border-neutral-200 overflow-hidden hover:shadow-xl hover:border-amber-300 transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Top Media Area */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-neutral-50 flex items-center justify-center">
        {/* Badge */}
        {product.badge && (
          <div
            className={`absolute top-3 left-3 z-10 text-[10px] uppercase font-black tracking-wider px-2.5 py-1 rounded-md shadow-sm ${getBadgeColor(
              product.badge
            )}`}
          >
            {product.badge}
          </div>
        )}

        {/* Brand Tag */}
        <div className="absolute top-3 right-3 z-10 bg-white/95 backdrop-blur-md text-neutral-900 text-[11px] font-black px-2.5 py-0.5 rounded-md border border-neutral-200 shadow-sm">
          {product.brand}
        </div>

        {/* Product Image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
        />

        {/* Quick View Hover Button */}
        <div className="absolute inset-0 bg-neutral-900/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="px-3.5 py-1.5 bg-white text-neutral-900 font-bold text-xs rounded-xl shadow-lg flex items-center gap-1.5 hover:bg-neutral-100 transition-transform cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-amber-600" />
            <span>Specifications</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Category */}
          <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
            {product.category}
          </div>

          {/* Product Title */}
          <h3 className="font-extrabold text-neutral-900 text-sm leading-snug group-hover:text-amber-700 transition-colors line-clamp-1">
            {product.name}
          </h3>

          {/* Tagline */}
          <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed">
            {product.tagline}
          </p>
        </div>

        {/* Available Sizes / Variants */}
        {product.availableSizes && product.availableSizes.length > 0 && (
          <div
            className="space-y-1 pt-1"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between text-[11px] text-neutral-500">
              <span className="font-semibold">Select Size / Type:</span>
              <span className="font-bold text-neutral-800">{selectedSize}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.availableSizes.slice(0, 4).map((sz) => (
                <button
                  key={sz}
                  type="button"
                  onClick={() => setSelectedSize(sz)}
                  className={`text-[10px] font-bold px-2 py-1 rounded-md border transition-all cursor-pointer ${
                    selectedSize === sz
                      ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                      : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-400'
                  }`}
                >
                  {sz}
                </button>
              ))}
              {product.availableSizes.length > 4 && (
                <span className="text-[10px] text-neutral-400 self-center">
                  +{product.availableSizes.length - 4} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Pricing & Add to Materials Cart */}
        <div className="pt-3 border-t border-neutral-100 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-base sm:text-lg font-black text-neutral-900">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-neutral-400 line-through">
                  ₹{product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[10px] text-neutral-500 font-medium block">
              {product.unit}
            </span>
          </div>

          <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
            {/* Direct WhatsApp quote button */}
            <button
              onClick={handleWhatsAppInquiry}
              title="Inquire on WhatsApp"
              className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
            </button>

            {/* Add to order cart */}
            <button
              onClick={handleAdd}
              className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 transition-all cursor-pointer shadow-sm ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-neutral-900 hover:bg-amber-600 text-white'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

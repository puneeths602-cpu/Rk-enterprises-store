'use client';

import React, { useState, useMemo } from 'react';
import { CATEGORIES, STORE_INFO } from '@/data/products';
import ProductCard from './ProductCard';
import { SlidersHorizontal, ArrowUpDown, MessageCircle, Phone } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface ProductCatalogProps {
  searchQuery: string;
  onClearSearch: () => void;
}

export default function ProductCatalog({ searchQuery, onClearSearch }: ProductCatalogProps) {
  const { products } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');

  // Extract all distinct brands
  const brands = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.brand) set.add(p.brand);
    });
    return ['All', ...Array.from(set)];
  }, [products]);

  // Filter & sort logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      // Brand filter
      if (selectedBrand !== 'All' && product.brand !== selectedBrand) {
        return false;
      }
      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesCat = product.category.toLowerCase().includes(query);
        const matchesTagline = product.tagline.toLowerCase().includes(query);
        const matchesSizes = product.availableSizes?.some((sz) => sz.toLowerCase().includes(query));
        const matchesSpecs = Object.values(product.specs).some((v) => v.toLowerCase().includes(query));
        if (!matchesName && !matchesBrand && !matchesCat && !matchesTagline && !matchesSizes && !matchesSpecs) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return 0; // default / featured
    });
  }, [products, selectedCategory, selectedBrand, searchQuery, sortBy]);

  const resetAll = () => {
    setSelectedCategory('All');
    setSelectedBrand('All');
    setSortBy('featured');
    onClearSearch();
  };

  return (
    <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 scroll-mt-20">
      
      {/* Wholesale Quote Callout Banner */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 text-white p-5 sm:p-6 rounded-3xl shadow-lg mb-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center md:text-left">
          <div className="text-amber-200 text-xs font-black uppercase tracking-wider">
            Contractor & Bulk Site Delivery Pricing
          </div>
          <h3 className="text-xl sm:text-2xl font-black">
            Building a House or Commercial Project in Parchur / Bapatla?
          </h3>
          <p className="text-xs text-amber-100 max-w-2xl">
            Get special project wholesale bundle rates for cement bags, full-ton TMT steel loads, roofing sheets, and complete plumbing pipe sets delivered directly to your site.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <a
            href={`tel:${STORE_INFO.phone1}`}
            className="px-4 py-2.5 bg-white text-neutral-900 hover:bg-neutral-100 font-black text-xs rounded-xl shadow transition-colors flex items-center gap-1.5"
          >
            <Phone className="w-4 h-4 text-amber-600" />
            <span>Call: {STORE_INFO.phone1}</span>
          </a>

          <a
            href={`https://wa.me/${STORE_INFO.whatsappNumber}?text=Hello%20RK%20Enterprises,%20I%20am%20planning%20construction%20in%20Parchur.%20Please%20share%20bulk%20rates%20for%20Cement,%20TMT%20Steel%20and%20Pipes.`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white font-black text-xs rounded-xl shadow transition-colors flex items-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Estimate</span>
          </a>
        </div>
      </div>

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <div className="text-xs uppercase font-black tracking-widest text-amber-600">
            RK ENTERPRISES PRODUCT INVENTORY
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight mt-1">
            Explore All Materials & Hardware
          </h2>
          <p className="text-xs sm:text-sm text-neutral-600 mt-1">
            Choose from UltraTech/Deccan/Sagar cement, Tata/Vizag/Godavari TMT steel (8mm to 20mm), MS/GI pipes, JSW/Jindal roofing, and CPVC/PVC plumbing joints.
          </p>
        </div>

        {/* Controls: Sorting & Filter status */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Brand Selector */}
          <div className="flex items-center gap-1.5 bg-neutral-100 px-3 py-2 rounded-xl border border-neutral-200">
            <span className="text-[11px] font-bold text-neutral-500">Brand:</span>
            <select
              value={selectedBrand}
              onChange={(e) => setSelectedBrand(e.target.value)}
              className="bg-transparent text-xs font-bold text-neutral-800 outline-none cursor-pointer"
            >
              {brands.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 bg-neutral-100 px-3 py-2 rounded-xl border border-neutral-200">
            <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs font-bold text-neutral-800 outline-none cursor-pointer"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Filter Horizontal Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar mb-6">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 hover:text-neutral-900 border border-neutral-200/60'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Active Search & Filter Info */}
      {(searchQuery || selectedCategory !== 'All' || selectedBrand !== 'All') && (
        <div className="flex items-center justify-between bg-amber-50/70 border border-amber-200 rounded-xl px-4 py-2.5 mb-6 text-xs text-neutral-700">
          <div className="flex items-center gap-2 flex-wrap">
            <SlidersHorizontal className="w-3.5 h-3.5 text-amber-600" />
            <span>Filtering by:</span>
            {searchQuery && (
              <span className="font-bold text-neutral-900 bg-white px-2 py-0.5 rounded border border-neutral-300">
                &ldquo;{searchQuery}&rdquo;
              </span>
            )}
            {selectedCategory !== 'All' && (
              <span className="font-bold text-neutral-900 bg-white px-2 py-0.5 rounded border border-neutral-300">
                Category: {selectedCategory}
              </span>
            )}
            {selectedBrand !== 'All' && (
              <span className="font-bold text-neutral-900 bg-white px-2 py-0.5 rounded border border-neutral-300">
                Brand: {selectedBrand}
              </span>
            )}
            <span className="text-neutral-500 font-semibold">({filteredProducts.length} items)</span>
          </div>

          <button
            onClick={resetAll}
            className="font-bold text-amber-700 hover:text-amber-900 text-xs underline cursor-pointer"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-16 px-4 bg-neutral-50 rounded-3xl border border-dashed border-neutral-300">
          <div className="w-16 h-16 rounded-full bg-neutral-200 flex items-center justify-center mx-auto text-neutral-500 mb-4 text-2xl">
            🏗️
          </div>
          <h3 className="text-lg font-bold text-neutral-900 mb-1">
            No matching building materials found
          </h3>
          <p className="text-xs text-neutral-600 max-w-sm mx-auto mb-6">
            We supply all sizes of cement, TMT steel, pipes, roofing, and CPVC/PVC fittings. Contact our store team directly for non-listed sizes.
          </p>
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={resetAll}
              className="px-5 py-2.5 bg-neutral-900 text-white text-xs font-bold rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
            <a
              href={`tel:${STORE_INFO.phone1}`}
              className="px-5 py-2.5 bg-amber-600 text-white text-xs font-bold rounded-xl hover:bg-amber-500 transition-colors"
            >
              Call {STORE_INFO.phone1}
            </a>
          </div>
        </div>
      )}
    </section>
  );
}

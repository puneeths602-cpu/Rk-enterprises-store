'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, Truck, Phone, Printer, MessageCircle, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { STORE_INFO } from '@/data/products';
import { OrderDetails } from '@/types/ecommerce';

export default function CheckoutModal() {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    clearCart,
    subtotal,
    discount,
    delivery,
    total,
  } = useCart();

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderType, setOrderType] = useState<'Site Delivery' | 'Shop Self-Pickup'>('Site Delivery');
  const [paymentMode, setPaymentMode] = useState<'Cash on Delivery (Site)' | 'UPI / Bank Transfer' | 'Pay at Store Counter'>('Cash on Delivery (Site)');
  
  // Form fields
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    alternatePhone: '',
    siteAddress: '',
    villageOrCity: 'Parchur',
    mandalOrDist: 'Bapatla Dist',
    pincode: '523169',
    notes: '',
  });

  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  if (!isCheckoutOpen) return null;

  const currentDeliveryFee = orderType === 'Shop Self-Pickup' ? 0 : delivery;
  const currentTotal = subtotal - discount + currentDeliveryFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderNumber = `RK-${Math.floor(100000 + Math.random() * 900000)}`;
      const order: OrderDetails = {
        orderId: orderNumber,
        date: new Date().toLocaleDateString('en-IN', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        customer: {
          fullName: formData.fullName,
          phone: formData.phone,
          alternatePhone: formData.alternatePhone,
          siteAddress: formData.siteAddress,
          villageOrCity: formData.villageOrCity,
          mandalOrDist: formData.mandalOrDist,
          pincode: formData.pincode,
          orderType,
        },
        deliveryCost: currentDeliveryFee,
        subtotal,
        discount,
        tax: 0,
        total: currentTotal,
        items: [...cart],
        paymentMode,
        notes: formData.notes,
      };

      setCompletedOrder(order);
      setIsSubmitting(false);
      setStep('success');
      clearCart();
    }, 1000);
  };

  const handleSendToWhatsApp = () => {
    if (!completedOrder) return;
    let msg = `*CONFIRMED MATERIAL ORDER - ${completedOrder.orderId}*\n`;
    msg += `--------------------------------\n`;
    msg += `*Customer:* ${completedOrder.customer.fullName}\n`;
    msg += `*Phone:* ${completedOrder.customer.phone}\n`;
    if (completedOrder.customer.alternatePhone) msg += `*Alt Phone:* ${completedOrder.customer.alternatePhone}\n`;
    msg += `*Order Type:* ${completedOrder.customer.orderType}\n`;
    msg += `*Delivery Site:* ${completedOrder.customer.siteAddress}, ${completedOrder.customer.villageOrCity} (${completedOrder.customer.pincode})\n`;
    msg += `*Payment Mode:* ${completedOrder.paymentMode}\n`;
    if (completedOrder.notes) msg += `*Notes:* ${completedOrder.notes}\n`;
    msg += `--------------------------------\n`;
    msg += `*ITEMS:*\n`;
    completedOrder.items.forEach((it, idx) => {
      msg += `${idx + 1}. ${it.product.name} (${it.selectedSize || 'Std'})\n`;
      msg += `   Qty: ${it.quantity} ${it.product.unit} | ₹${it.product.price * it.quantity}\n`;
    });
    msg += `--------------------------------\n`;
    msg += `*Total Amount:* ₹${completedOrder.total.toLocaleString('en-IN')}\n`;
    msg += `\nPlease confirm lorry/tractor loading dispatch. Thank you!`;

    window.open(`https://wa.me/${STORE_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep('form');
    setCompletedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 hover:text-neutral-900 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {step === 'form' ? (
          <div>
            {/* Header */}
            <div className="p-6 border-b border-neutral-200 bg-amber-50/60">
              <div className="flex items-center gap-2">
                <Truck className="w-5 h-5 text-amber-600" />
                <h2 className="text-lg font-black text-neutral-900">
                  Book Site Delivery / Order Confirmation
                </h2>
              </div>
              <p className="text-xs text-neutral-600 mt-0.5">
                RK ENTERPRISES • Near APSRTC Bus Stand, Parchur • Ph: 9948847768 / 9063646468
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmitOrder} className="p-6 sm:p-8 space-y-5">
              
              {/* Delivery or Self Pickup */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500">
                  1. Choose Supply Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label
                    onClick={() => setOrderType('Site Delivery')}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      orderType === 'Site Delivery'
                        ? 'border-amber-600 bg-amber-50/50 shadow-xs'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <Truck className="w-4 h-4 text-amber-600" />
                    <div>
                      <p className="text-xs font-bold text-neutral-900">Direct Site Delivery</p>
                      <p className="text-[11px] text-neutral-500">Tractor / Mini Lorry</p>
                    </div>
                  </label>

                  <label
                    onClick={() => setOrderType('Shop Self-Pickup')}
                    className={`flex items-center gap-2.5 p-3 rounded-xl border-2 cursor-pointer transition-all ${
                      orderType === 'Shop Self-Pickup'
                        ? 'border-amber-600 bg-amber-50/50 shadow-xs'
                        : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <div className="w-4 h-4 rounded-full bg-amber-600 text-white font-black text-[10px] flex items-center justify-center">
                      RK
                    </div>
                    <div>
                      <p className="text-xs font-bold text-neutral-900">Self Pickup at Store</p>
                      <p className="text-[11px] text-neutral-500">APSRTC Bus Stand, Parchur</p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Customer Contact Information */}
              <div className="space-y-3 pt-2 border-t border-neutral-200">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500">
                  2. Contractor / Owner Contact Details
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-1">
                    <label className="block text-[11px] font-semibold text-neutral-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh V."
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9848012345"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-700 mb-1">Alternate / WhatsApp Phone</label>
                    <input
                      type="tel"
                      placeholder="Optional"
                      value={formData.alternatePhone}
                      onChange={(e) => setFormData({ ...formData, alternatePhone: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-600"
                    />
                  </div>
                </div>
              </div>

              {/* Construction Site Address */}
              <div className="space-y-3 pt-2 border-t border-neutral-200">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500">
                  3. Construction Site Location (For Unloading)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-neutral-700 mb-1">Site Street / Landmark *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Plot No 42, Near High School or Panchayati Office"
                      value={formData.siteAddress}
                      onChange={(e) => setFormData({ ...formData, siteAddress: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-700 mb-1">Town / Village *</label>
                    <input
                      type="text"
                      required
                      value={formData.villageOrCity}
                      onChange={(e) => setFormData({ ...formData, villageOrCity: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-700 mb-1">District</label>
                    <input
                      type="text"
                      value={formData.mandalOrDist}
                      onChange={(e) => setFormData({ ...formData, mandalOrDist: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-700 mb-1">Pincode</label>
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-600"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-neutral-700 mb-1">Special Unloading Notes</label>
                    <input
                      type="text"
                      placeholder="e.g. Needs tractor with tipping"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-amber-600"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Mode */}
              <div className="space-y-2 pt-2 border-t border-neutral-200">
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500">
                  4. Payment Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {(['Cash on Delivery (Site)', 'UPI / Bank Transfer', 'Pay at Store Counter'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setPaymentMode(mode)}
                      className={`py-2 px-3 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                        paymentMode === mode
                          ? 'bg-neutral-900 text-white border-neutral-900'
                          : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Total & Submit */}
              <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-neutral-500 block">Total Est. Payable:</span>
                  <span className="text-2xl font-black text-amber-700">
                    ₹{currentTotal.toLocaleString('en-IN')}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || cart.length === 0}
                  className="w-full sm:w-auto px-7 py-3.5 bg-amber-600 hover:bg-amber-500 disabled:bg-neutral-400 text-white font-black text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Booking Material Order...</span>
                  ) : (
                    <>
                      <span>Confirm Material Order</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        ) : (
          /* Order Confirmation / Success View */
          completedOrder && (
            <div className="p-6 sm:p-8 space-y-5 text-center animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-black uppercase tracking-widest text-emerald-700">
                  Order Successfully Registered
                </span>
                <h2 className="text-2xl font-black text-neutral-900 tracking-tight">
                  RK ENTERPRISES - Order #{completedOrder.orderId}
                </h2>
                <p className="text-xs text-neutral-600">
                  Our dispatch coordinator will call you at <strong>{completedOrder.customer.phone}</strong> for loading & delivery schedule.
                </p>
              </div>

              {/* Receipt Summary Box */}
              <div className="text-left bg-neutral-50 p-5 rounded-2xl border border-neutral-200 space-y-3.5 max-h-72 overflow-y-auto">
                <div className="grid grid-cols-2 gap-4 text-xs pb-3 border-b border-neutral-200">
                  <div>
                    <span className="text-neutral-500 block font-bold">Unloading Site:</span>
                    <span className="font-extrabold text-neutral-900">{completedOrder.customer.fullName}</span>
                    <p className="text-neutral-600">{completedOrder.customer.siteAddress}</p>
                    <p className="text-neutral-600">{completedOrder.customer.villageOrCity}, {completedOrder.customer.pincode}</p>
                  </div>
                  <div>
                    <span className="text-neutral-500 block font-bold">Delivery & Mode:</span>
                    <span className="font-extrabold text-neutral-900">{completedOrder.customer.orderType}</span>
                    <p className="text-neutral-600">Payment: {completedOrder.paymentMode}</p>
                    <p className="text-emerald-700 font-bold">Dispatch: Same-Day / Next-Day Morning</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-black uppercase tracking-wider text-neutral-500 block">
                    Booked Materials
                  </span>
                  {completedOrder.items.map((it, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs">
                      <span className="text-neutral-800">
                        {it.quantity}x {it.product.name} ({it.selectedSize || 'Std'})
                      </span>
                      <span className="font-black text-neutral-900">
                        ₹{(it.product.price * it.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-neutral-200 space-y-1 text-xs">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal:</span>
                    <span>₹{completedOrder.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {completedOrder.discount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Discount:</span>
                      <span>-₹{completedOrder.discount.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-neutral-600">
                    <span>Site Transport (Parchur):</span>
                    <span>{completedOrder.deliveryCost === 0 ? 'FREE' : `₹${completedOrder.deliveryCost}`}</span>
                  </div>
                  <div className="flex justify-between text-sm font-black text-neutral-900 pt-1 border-t border-neutral-200">
                    <span>Total Amount Payable:</span>
                    <span className="text-amber-700">₹{completedOrder.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons: WhatsApp Send & Print Receipt */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={handleSendToWhatsApp}
                  className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black rounded-xl shadow flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Order to RK Enterprises via WhatsApp</span>
                </button>

                <button
                  onClick={() => window.print()}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-neutral-300 text-xs font-bold text-neutral-700 hover:bg-neutral-50 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Delivery Challan</span>
                </button>

                <button
                  onClick={handleClose}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>

              <div className="text-xs text-neutral-500 pt-1">
                Store Support: <a href={`tel:${STORE_INFO.phone1}`} className="font-bold text-amber-700 underline">{STORE_INFO.phone1}</a> / <a href={`tel:${STORE_INFO.phone2}`} className="font-bold text-amber-700 underline">{STORE_INFO.phone2}</a>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem } from '@/types/ecommerce';
import { PRODUCTS as DEFAULT_PRODUCTS, PROMO_CODES, STORE_INFO } from '@/data/products';

interface CartContextType {
  products: Product[];
  updateProductPrice: (productId: string, newPrice: number, newOriginalPrice?: number) => void;
  resetAllPrices: () => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedSize?: string, customNote?: string) => void;
  removeFromCart: (productId: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedSize?: string) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  discount: number;
  promoCode: string;
  promoError: string;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  delivery: number;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isAboutOpen: boolean;
  setIsAboutOpen: (open: boolean) => void;
  isContactOpen: boolean;
  setIsContactOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  sendOrderToWhatsApp: (customerDetails?: { name: string; phone: string; address: string }) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoDiscountRate, setPromoDiscountRate] = useState(0);
  const [promoFlatDiscount, setPromoFlatDiscount] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load cart and custom prices from localStorage on mount
  useEffect(() => {
    try {
      // 1. Load cart
      const savedCart = localStorage.getItem('rk_enterprises_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }

      // 2. Load custom prices
      const savedPrices = localStorage.getItem('rk_custom_prices');
      if (savedPrices) {
        const priceMap: Record<string, { price: number; originalPrice?: number }> = JSON.parse(savedPrices);
        setProducts((prev) =>
          prev.map((p) => {
            if (priceMap[p.id]) {
              return {
                ...p,
                price: priceMap[p.id].price,
                originalPrice: priceMap[p.id].originalPrice ?? p.originalPrice,
              };
            }
            return p;
          })
        );
      }
    } catch {
      // Ignore storage errors
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('rk_enterprises_cart', JSON.stringify(cart));
      } catch {
        // Ignore storage errors
      }
    }
  }, [cart, isLoaded]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 3500);
  };

  // Price Update Function for Owner / Admin
  const updateProductPrice = (productId: string, newPrice: number, newOriginalPrice?: number) => {
    // 1. Immediately save to localStorage synchronously
    try {
      const currentSaved = localStorage.getItem('rk_custom_prices');
      const priceMap: Record<string, { price: number; originalPrice?: number }> = currentSaved ? JSON.parse(currentSaved) : {};
      priceMap[productId] = { price: newPrice, originalPrice: newOriginalPrice };
      localStorage.setItem('rk_custom_prices', JSON.stringify(priceMap));
    } catch {
      // Ignore storage errors
    }

    // 2. Update React products state with fresh immutable objects
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          return {
            ...p,
            price: newPrice,
            originalPrice: newOriginalPrice !== undefined ? newOriginalPrice : p.originalPrice,
          };
        }
        return p;
      })
    );

    // 3. Update existing item price if already in cart
    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId) {
          return {
            ...item,
            product: { ...item.product, price: newPrice, originalPrice: newOriginalPrice },
          };
        }
        return item;
      })
    );

    showToast(`Price updated to ₹${newPrice.toLocaleString('en-IN')}`);
  };

  const resetAllPrices = () => {
    try {
      localStorage.removeItem('rk_custom_prices');
    } catch {
      // Ignore
    }
    setProducts(DEFAULT_PRODUCTS);
    showToast('Reset all material prices to store defaults.');
  };

  const addToCart = (product: Product, quantity = 1, selectedSize?: string, customNote?: string) => {
    const size = selectedSize || (product.availableSizes && product.availableSizes.length > 0 ? product.availableSizes[0] : undefined);

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === size
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        return [...prev, { product, quantity, selectedSize: size, customNote }];
      }
    });

    showToast(`Added "${product.name}" (${size || 'Standard'}) to cart`);
  };

  const removeFromCart = (productId: string, selectedSize?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.selectedSize === selectedSize)
      )
    );
  };

  const updateQuantity = (productId: string, quantity: number, selectedSize?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedSize);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.product.id === productId && item.selectedSize === selectedSize) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
    setPromoCode('');
    setPromoDiscountRate(0);
    setPromoFlatDiscount(0);
  };

  const applyPromo = (code: string): boolean => {
    const upper = code.trim().toUpperCase();
    if (upper in PROMO_CODES) {
      const val = PROMO_CODES[upper];
      setPromoCode(upper);
      setPromoError('');
      if (val < 1) {
        setPromoDiscountRate(val);
        setPromoFlatDiscount(0);
      } else {
        setPromoFlatDiscount(val);
        setPromoDiscountRate(0);
      }
      showToast(`Discount "${upper}" applied!`);
      return true;
    } else {
      setPromoError('Invalid coupon code. Try "RKBUILD5" or "PARCHUR10".');
      return false;
    }
  };

  const removePromo = () => {
    setPromoCode('');
    setPromoDiscountRate(0);
    setPromoFlatDiscount(0);
    setPromoError('');
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const discount = Math.min(
    subtotal,
    promoDiscountRate > 0 ? Math.round(subtotal * promoDiscountRate) : promoFlatDiscount
  );

  const discountedSubtotal = Math.max(0, subtotal - discount);
  const delivery = discountedSubtotal >= 5000 || discountedSubtotal === 0 ? 0 : 200;
  const total = discountedSubtotal + delivery;

  // WhatsApp order generator helper
  const sendOrderToWhatsApp = (customerDetails?: { name: string; phone: string; address: string }) => {
    if (cart.length === 0) return;

    let text = `*NEW ORDER INQUIRY - RK ENTERPRISES*\n`;
    text += `--------------------------------\n`;
    if (customerDetails) {
      text += `*Customer:* ${customerDetails.name}\n`;
      text += `*Phone:* ${customerDetails.phone}\n`;
      text += `*Delivery Site:* ${customerDetails.address}\n`;
      text += `--------------------------------\n`;
    }
    text += `*ORDER ITEMS:*\n`;

    cart.forEach((it, idx) => {
      text += `${idx + 1}. *${it.product.name}*\n`;
      text += `   • Size/Type: ${it.selectedSize || 'Standard'}\n`;
      text += `   • Quantity: ${it.quantity} (${it.product.unit})\n`;
      text += `   • Est. Rate: ₹${it.product.price} = ₹${it.product.price * it.quantity}\n`;
    });

    text += `--------------------------------\n`;
    text += `*Subtotal:* ₹${subtotal.toLocaleString('en-IN')}\n`;
    if (discount > 0) {
      text += `*Discount:* -₹${discount.toLocaleString('en-IN')}\n`;
    }
    text += `*Estimated Total:* ₹${total.toLocaleString('en-IN')}\n`;
    text += `*Store Location:* Near APSRTC Bus Stand, Parchur (523169)\n`;
    text += `\nPlease confirm final site delivery quote and availability. Thank you!`;

    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/${STORE_INFO.whatsappNumber}?text=${encoded}`;
    window.open(url, '_blank');
  };

  return (
    <CartContext.Provider
      value={{
        products,
        updateProductPrice,
        resetAllPrices,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        discount,
        promoCode,
        promoError,
        applyPromo,
        removePromo,
        delivery,
        total,
        isCartOpen,
        setIsCartOpen,
        quickViewProduct,
        setQuickViewProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isAboutOpen,
        setIsAboutOpen,
        isContactOpen,
        setIsContactOpen,
        isAdminOpen,
        setIsAdminOpen,
        toastMessage,
        showToast,
        sendOrderToWhatsApp,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

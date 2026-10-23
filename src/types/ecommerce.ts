export interface ProductVariant {
  label: string;
  price: number;
  unit?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  tagline: string;
  description: string;
  price: number; // base price in INR
  originalPrice?: number;
  unit: string; // e.g., 'Bag (50 Kg)', 'Per Rod (12m)', 'Per Pipe (6m)', 'Per Sq.Ft', 'Per Piece'
  rating: number;
  reviewCount: number;
  category: 
    | 'Cement' 
    | 'TMT Steel Bars' 
    | 'MS Pipes & Angles' 
    | 'GI Pipes' 
    | 'Roofing Sheets' 
    | 'CPVC Plumbing & Fittings' 
    | 'PVC & HDPE Pipes' 
    | 'Garden Pipes';
  image: string;
  gallery: string[];
  badge?: 'Best Seller' | 'Authorized Dealer' | 'ISI Certified' | 'Bulk Deal' | 'In Stock';
  inStock: boolean;
  stockCount: number;
  features: string[];
  specs: Record<string, string>;
  availableSizes?: string[]; // e.g. ['8mm', '10mm', '12mm', '16mm'] or ['1/2 inch', '3/4 inch', '1 inch']
  variants?: ProductVariant[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  customNote?: string;
}

export interface OrderDetails {
  orderId: string;
  date: string;
  customer: {
    fullName: string;
    phone: string;
    alternatePhone?: string;
    siteAddress: string;
    villageOrCity: string;
    mandalOrDist: string;
    pincode: string;
    orderType: 'Site Delivery' | 'Shop Self-Pickup';
  };
  deliveryCost: number;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  items: CartItem[];
  paymentMode: 'Cash on Delivery (Site)' | 'UPI / Bank Transfer' | 'Pay at Store Counter';
  notes?: string;
}

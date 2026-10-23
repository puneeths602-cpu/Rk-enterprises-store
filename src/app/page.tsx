import { CartProvider } from '@/context/CartContext';
import StoreApp from '@/components/StoreApp';

export default function Home() {
  return (
    <CartProvider>
      <StoreApp />
    </CartProvider>
  );
}

import type { MetaFunction } from 'react-router';
import CheckoutPage from '../ui/pages/checkout/checkout';

export const meta: MetaFunction = () => {
  return [
    { title: 'Checkout - Óptica Suárez' },
    { name: 'description', content: 'Completa tu compra de forma segura con Óptica Suárez.' },
  ];
};

export default function Checkout() {
  return <CheckoutPage />;
}
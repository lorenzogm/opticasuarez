import type { MetaFunction } from 'react-router';
import CarritoPage from '../ui/pages/carrito/carrito';

export const meta: MetaFunction = () => {
  return [
    { title: 'Carrito de Compras - Óptica Suárez' },
    { name: 'description', content: 'Revisa los productos en tu carrito de compras antes de proceder al checkout.' },
  ];
};

export default function Carrito() {
  return <CarritoPage />;
}
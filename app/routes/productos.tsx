import type { MetaFunction } from 'react-router';
import { useLoaderData } from 'react-router';
import productos from '../content/productos.json';
import ProductosPage from '../ui/pages/productos/productos';

export const meta: MetaFunction = () => {
  return [
    { title: 'Productos - Óptica Suárez' },
    { 
      name: 'description', 
      content: 'Descubre nuestra amplia gama de productos ópticos de alta calidad. Gafas de sol, monturas y lentes de contacto de las mejores marcas.' 
    },
  ];
};

export async function loader() {
  return {
    productos: productos.featured,
    categories: productos.categories,
    title: productos.title,
    description: productos.description,
  };
}

export default function Productos() {
  const data = useLoaderData<typeof loader>();
  return <ProductosPage {...data} />;
}
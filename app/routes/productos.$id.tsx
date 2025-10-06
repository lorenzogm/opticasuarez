import type { MetaFunction, LoaderFunctionArgs } from 'react-router';
import { useLoaderData } from 'react-router';
import productos from '../content/productos.json';
import ProductDetailPage from '../ui/pages/productos/product-detail';

type LoaderData = {
  product: typeof productos.featured[0];
  relatedProducts: typeof productos.featured;
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data?.product) {
    return [
      { title: 'Producto no encontrado - Óptica Suárez' },
      { name: 'description', content: 'El producto solicitado no fue encontrado.' },
    ];
  }
  
  return [
    { title: `${data.product.name} - Óptica Suárez` },
    { name: 'description', content: data.product.description },
  ];
};

export async function loader({ params }: LoaderFunctionArgs) {
  const product = productos.featured.find(p => p.id === params.id);
  
  if (!product) {
    throw new Response('Producto no encontrado', { status: 404 });
  }
  
  return {
    product,
    relatedProducts: productos.featured
      .filter(p => p.id !== params.id && p.category === product.category)
      .slice(0, 3),
  } as LoaderData;
}

export default function ProductDetail() {
  const data = useLoaderData<typeof loader>();
  return <ProductDetailPage {...data} />;
}
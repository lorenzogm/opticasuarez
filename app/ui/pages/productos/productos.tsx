import { Link } from 'react-router';
import { Text } from '../../components/text';
import { Button } from '../../components/button';
import BookAppointment from '../../sections/book-appointment';
import { useCart } from '../../lib/cart-context';

interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  inStock: boolean;
}

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface ProductosPageProps {
  productos: Product[];
  categories: Category[];
  title: string;
  description: string;
}

export default function ProductosPage({ productos, categories, title, description }: ProductosPageProps) {
  const { addItem } = useCart();

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
    });
  };

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto max-w-7xl text-center">
          <Text as="h1" variant="heading-1" className="mb-6">
            {title}
          </Text>
          <Text variant="body-lg" className="max-w-3xl mx-auto">
            {description}
          </Text>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 sm:px-6 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <Text as="h2" variant="heading-2" align="center" className="mb-12">
            Categorías
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category) => (
              <div key={category.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div className="p-6">
                  <Text as="h3" variant="heading-4" className="mb-2">
                    {category.name}
                  </Text>
                  <Text variant="body-md" colour="light" className="mb-4">
                    {category.description}
                  </Text>
                  <Button href={`/productos?categoria=${category.id}`} variant="secondary" size="sm">
                    Ver productos
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4 sm:px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <Text as="h2" variant="heading-2" align="center" className="mb-12">
            Productos Destacados
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {productos.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <Link to={`/productos/${product.id}`} className="block">
                  <div className="h-64 bg-gray-200 flex items-center justify-center">
                    <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                </Link>
                <div className="p-6">
                  <div className="text-sm text-blue-600 font-medium mb-2">{product.brand}</div>
                  <Link to={`/productos/${product.id}`}>
                    <Text as="h3" variant="heading-4" className="mb-2 hover:text-blue-600 transition-colors">
                      {product.name}
                    </Text>
                  </Link>
                  <Text variant="body-sm" colour="light" className="mb-4 line-clamp-2">
                    {product.description}
                  </Text>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-gray-900">€{product.price.toFixed(2)}</span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">€{product.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.inStock 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.inStock ? 'En stock' : 'Agotado'}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      href={`/productos/${product.id}`} 
                      variant="secondary" 
                      size="sm" 
                      className="flex-1"
                    >
                      Ver detalles
                    </Button>
                    <Button 
                      onClick={() => handleAddToCart(product)}
                      disabled={!product.inStock}
                      size="sm"
                      className="flex-1"
                    >
                      Añadir al carrito
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BookAppointment
        title="¿Necesitas asesoramiento?"
        description="Nuestros especialistas pueden ayudarte a elegir el producto perfecto para tus necesidades. Reserva una cita gratuita."
        buttonText="Reservar Cita"
      />
    </main>
  );
}
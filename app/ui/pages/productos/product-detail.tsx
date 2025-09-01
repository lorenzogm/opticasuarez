import { useState } from 'react';
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
  images?: string[];
  description: string;
  features?: string[];
  specifications?: Record<string, string>;
  inStock: boolean;
  stock?: number;
}

interface ProductDetailPageProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailPage({ product, relatedProducts }: ProductDetailPageProps) {
  const { addItem } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const images = product.images || [product.image];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        image: product.image,
      });
    }
  };

  return (
    <main className="pt-20">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl">
          <nav className="flex text-sm">
            <Link to="/" className="text-blue-600 hover:text-blue-800">Inicio</Link>
            <span className="mx-2 text-gray-500">/</span>
            <Link to="/productos" className="text-blue-600 hover:text-blue-800">Productos</Link>
            <span className="mx-2 text-gray-500">/</span>
            <span className="text-gray-700">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-16 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="mb-4">
                <div className="h-96 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                  <svg className="w-32 h-32 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>
              {images.length > 1 && (
                <div className="flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`h-20 w-20 bg-gray-200 rounded-lg flex items-center justify-center ${
                        selectedImage === index ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="text-sm text-blue-600 font-medium mb-2">{product.brand}</div>
              <Text as="h1" variant="heading-2" className="mb-4">
                {product.name}
              </Text>
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">€{product.price.toFixed(2)}</span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-xl text-gray-500 line-through">€{product.originalPrice.toFixed(2)}</span>
                )}
              </div>
              
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-6 ${
                product.inStock 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.inStock ? (
                  <>
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    En stock
                    {product.stock && ` (${product.stock} unidades)`}
                  </>
                ) : (
                  'Agotado'
                )}
              </div>

              <Text variant="body-lg" className="mb-6">
                {product.description}
              </Text>

              {/* Quantity and Add to Cart */}
              <div className="flex items-center space-x-4 mb-8">
                <div className="flex items-center">
                  <label htmlFor="quantity" className="text-sm font-medium text-gray-700 mr-3">
                    Cantidad:
                  </label>
                  <select
                    id="quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                    disabled={!product.inStock}
                  >
                    {Array.from({ length: Math.min(product.stock || 10, 10) }, (_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
                <Button 
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 max-w-xs"
                >
                  Añadir al carrito
                </Button>
              </div>

              {/* Features */}
              {product.features && (
                <div className="mb-8">
                  <Text as="h3" variant="heading-4" className="mb-4">
                    Características
                  </Text>
                  <ul className="space-y-2">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Specifications */}
              {product.specifications && (
                <div className="mb-8">
                  <Text as="h3" variant="heading-4" className="mb-4">
                    Especificaciones
                  </Text>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-2">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key}>
                          <dt className="text-sm font-medium text-gray-700 capitalize">{key}:</dt>
                          <dd className="text-sm text-gray-900">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-16 px-4 sm:px-6 bg-gray-50">
          <div className="container mx-auto max-w-7xl">
            <Text as="h2" variant="heading-2" align="center" className="mb-12">
              Productos Relacionados
            </Text>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <Link to={`/productos/${relatedProduct.id}`} className="block">
                    <div className="h-48 bg-gray-200 flex items-center justify-center">
                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                  </Link>
                  <div className="p-6">
                    <div className="text-sm text-blue-600 font-medium mb-2">{relatedProduct.brand}</div>
                    <Link to={`/productos/${relatedProduct.id}`}>
                      <Text as="h3" variant="heading-4" className="mb-2 hover:text-blue-600 transition-colors">
                        {relatedProduct.name}
                      </Text>
                    </Link>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-gray-900">€{relatedProduct.price.toFixed(2)}</span>
                      <Button href={`/productos/${relatedProduct.id}`} variant="secondary" size="sm">
                        Ver detalles
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <BookAppointment
        title="¿Necesitas asesoramiento personalizado?"
        description="Nuestros especialistas pueden ayudarte a elegir el producto perfecto para tus necesidades específicas."
        buttonText="Reservar Cita"
      />
    </main>
  );
}
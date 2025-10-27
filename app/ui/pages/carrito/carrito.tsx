import { Link } from 'react-router';
import { Text } from '../../components/text';
import { Button } from '../../components/button';
import { useCart } from '../../lib/cart-context';

export default function CarritoPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <main className="pt-20 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl py-16">
          <div className="text-center">
            <svg className="w-24 h-24 text-gray-400 mx-auto mb-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15.5M7 13v6a2 2 0 002 2h6a2 2 0 002-2v-6" />
            </svg>
            <Text as="h1" variant="heading-2" className="mb-4">
              Tu carrito está vacío
            </Text>
            <Text variant="body-lg" colour="light" className="mb-8">
              ¡Explora nuestros productos y encuentra las gafas perfectas para ti!
            </Text>
            <Button href="/productos" size="lg">
              Ver productos
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl py-8">
        <div className="mb-8">
          <Text as="h1" variant="heading-2" className="mb-2">
            Carrito de Compras
          </Text>
          <Text variant="body-md" colour="light">
            {items.length} {items.length === 1 ? 'producto' : 'productos'} en tu carrito
          </Text>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center space-x-4">
                  {/* Product Image */}
                  <div className="h-20 w-20 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm text-blue-600 font-medium">{item.brand}</div>
                    <Link to={`/productos/${item.id}`} className="hover:text-blue-600 transition-colors">
                      <Text variant="body-md" className="font-medium truncate">
                        {item.name}
                      </Text>
                    </Link>
                    <div className="text-lg font-bold text-gray-900 mt-1">
                      €{item.price.toFixed(2)}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={item.quantity <= 1}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  </div>

                  {/* Subtotal */}
                  <div className="text-lg font-bold text-gray-900 min-w-0">
                    €{(item.price * item.quantity).toFixed(2)}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 p-2"
                    title="Eliminar producto"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-4">
              <Button 
                onClick={clearCart} 
                variant="secondary" 
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                Vaciar carrito
              </Button>
              <Button href="/productos" variant="secondary">
                Seguir comprando
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
              <Text as="h2" variant="heading-4" className="mb-6">
                Resumen del pedido
              </Text>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">€{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Envío:</span>
                  <span className="font-medium text-green-600">Gratis</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">IVA (21%):</span>
                  <span className="font-medium">€{(getTotalPrice() * 0.21).toFixed(2)}</span>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>€{(getTotalPrice() * 1.21).toFixed(2)}</span>
                </div>
              </div>

              <Button href="/checkout" className="w-full" size="lg">
                Proceder al checkout
              </Button>

              <div className="mt-6 text-center">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Compra segura</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
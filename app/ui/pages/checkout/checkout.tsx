import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Text } from '../../components/text';
import { Button } from '../../components/button';
import { useCart } from '../../lib/cart-context';

interface CustomerInfo {
  email: string;
  nombre: string;
  apellidos: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  codigoPostal: string;
  provincia: string;
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getTotalPrice } = useCart();
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    email: '',
    nombre: '',
    apellidos: '',
    telefono: '',
    direccion: '',
    ciudad: '',
    codigoPostal: '',
    provincia: '',
  });
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // If cart is empty, redirect to cart
  if (items.length === 0) {
    navigate('/carrito');
    return null;
  }

  const subtotal = getTotalPrice();
  const iva = subtotal * 0.21;
  const total = subtotal + iva;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptedTerms) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }

    setIsProcessing(true);

    try {
      // Here we would normally send the order to our backend
      // For now, we'll simulate the process and redirect to payment
      
      // Save order data to localStorage for the payment process
      const orderData = {
        items,
        customer: customerInfo,
        subtotal,
        iva,
        total,
        timestamp: Date.now(),
      };
      
      localStorage.setItem('current-order', JSON.stringify(orderData));
      
      // Redirect to payment page
      navigate('/checkout/pago');
      
    } catch (error) {
      console.error('Error processing checkout:', error);
      alert('Error al procesar el pedido. Por favor, inténtalo de nuevo.');
      setIsProcessing(false);
    }
  };

  return (
    <main className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl py-8">
        <Text as="h1" variant="heading-2" className="mb-8">
          Finalizar Compra
        </Text>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer Information Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Text as="h2" variant="heading-4" className="mb-4">
                  Información de Contacto
                </Text>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={customerInfo.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="tu@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      id="telefono"
                      name="telefono"
                      required
                      value={customerInfo.telefono}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+34 XXX XXX XXX"
                    />
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Text as="h2" variant="heading-4" className="mb-4">
                  Datos Personales
                </Text>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      required
                      value={customerInfo.nombre}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="apellidos" className="block text-sm font-medium text-gray-700 mb-2">
                      Apellidos *
                    </label>
                    <input
                      type="text"
                      id="apellidos"
                      name="apellidos"
                      required
                      value={customerInfo.apellidos}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <Text as="h2" variant="heading-4" className="mb-4">
                  Dirección de Facturación
                </Text>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-2">
                      Dirección *
                    </label>
                    <input
                      type="text"
                      id="direccion"
                      name="direccion"
                      required
                      value={customerInfo.direccion}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Calle, número, piso..."
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="ciudad" className="block text-sm font-medium text-gray-700 mb-2">
                        Ciudad *
                      </label>
                      <input
                        type="text"
                        id="ciudad"
                        name="ciudad"
                        required
                        value={customerInfo.ciudad}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="codigoPostal" className="block text-sm font-medium text-gray-700 mb-2">
                        Código Postal *
                      </label>
                      <input
                        type="text"
                        id="codigoPostal"
                        name="codigoPostal"
                        required
                        value={customerInfo.codigoPostal}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="23001"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="provincia" className="block text-sm font-medium text-gray-700 mb-2">
                        Provincia *
                      </label>
                      <input
                        type="text"
                        id="provincia"
                        name="provincia"
                        required
                        value={customerInfo.provincia}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Jaén"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms and Conditions */}
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-gray-700">
                    Acepto los{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-800">
                      términos y condiciones
                    </a>{' '}
                    y la{' '}
                    <a href="#" className="text-blue-600 hover:text-blue-800">
                      política de privacidad
                    </a>
                    . *
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-between">
                <Button href="/carrito" variant="secondary">
                  ← Volver al carrito
                </Button>
                <Button type="submit" disabled={isProcessing || !acceptedTerms} size="lg">
                  {isProcessing ? 'Procesando...' : 'Continuar al pago'}
                </Button>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-6 shadow-sm sticky top-24">
              <Text as="h2" variant="heading-4" className="mb-4">
                Resumen del Pedido
              </Text>

              {/* Items */}
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="h-12 w-12 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.brand}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {item.quantity} × €{item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">€{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Envío:</span>
                  <span className="font-medium text-green-600">Gratis</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">IVA (21%):</span>
                  <span className="font-medium">€{iva.toFixed(2)}</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-center space-x-2 text-sm text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Pago 100% seguro</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
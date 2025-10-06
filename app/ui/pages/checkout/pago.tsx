import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Text } from '../../components/text';
import { Button } from '../../components/button';
import { generateRedsysSignature } from '~/utils/redsys';

interface OrderData {
  items: Array<{
    id: string;
    name: string;
    brand: string;
    price: number;
    quantity: number;
  }>;
  customer: {
    email: string;
    nombre: string;
    apellidos: string;
    telefono: string;
    direccion: string;
    ciudad: string;
    codigoPostal: string;
    provincia: string;
  };
  subtotal: number;
  iva: number;
  total: number;
}

interface Merchant {
  code: string;
  terminal: string;
  currency: string;
  transactionType: string;
  url: string;
  secretKey: string;
}

interface PagoPageProps {
  merchant: Merchant;
  order: string;
  redsysEndpoint: string;
}

export default function PagoPage({ merchant, order, redsysEndpoint }: PagoPageProps) {
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  // Load order data from localStorage on the client side
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedOrder = localStorage.getItem('current-order');
      if (savedOrder) {
        try {
          const parsed = JSON.parse(savedOrder);
          setOrderData(parsed);
        } catch (error) {
          console.error('Error parsing order data:', error);
          navigate('/carrito');
        }
      } else {
        navigate('/carrito');
      }
    }
  }, [navigate]);

  const handleRedsysPayment = () => {
    if (!orderData) return;
    
    setIsRedirecting(true);
    
    const amount = Math.round(orderData.total * 100); // Amount in cents
    
    // Create merchant parameters
    const merchantParameters = btoa(JSON.stringify({
      DS_MERCHANT_AMOUNT: amount,
      DS_MERCHANT_ORDER: order,
      DS_MERCHANT_MERCHANTCODE: merchant.code,
      DS_MERCHANT_CURRENCY: merchant.currency,
      DS_MERCHANT_TRANSACTIONTYPE: merchant.transactionType,
      DS_MERCHANT_TERMINAL: merchant.terminal,
      DS_MERCHANT_MERCHANTURL: merchant.url,
      DS_MERCHANT_URLOK: merchant.url,
      DS_MERCHANT_URLKO: `${window.location.origin}/checkout`,
    }));

    // Generate proper Redsys signature
    const signature = generateRedsysSignature(merchantParameters, order, merchant.secretKey);

    // Create a form to submit to Redsys
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = redsysEndpoint;
    form.style.display = 'none';

    // Add Redsys parameters
    const params = {
      Ds_SignatureVersion: 'HMAC_SHA256_V1',
      Ds_MerchantParameters: merchantParameters,
      Ds_Signature: signature,
    };

    Object.entries(params).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };



  // Show loading state while order data loads
  if (!orderData) {
    return (
      <main className="pt-20 min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl py-8">
          <div className="text-center">
            <Text as="h1" variant="heading-2" className="mb-2">
              Cargando...
            </Text>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl py-8">
        <div className="text-center mb-8">
          <Text as="h1" variant="heading-2" className="mb-2">
            Pago Seguro
          </Text>
          <Text variant="body-md" colour="light">
            Completa tu pago de forma segura con Redsys
          </Text>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <Text as="h2" variant="heading-4" className="mb-4">
              Resumen del Pedido
            </Text>
            
            <div className="space-y-3 mb-6">
              {orderData.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.brand}</p>
                    <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">€{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>€{orderData.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>IVA (21%):</span>
                <span>€{orderData.iva.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>€{orderData.total.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <Text as="h3" variant="heading-5" className="mb-2">
                Dirección de Facturación
              </Text>
              <div className="text-sm text-gray-600">
                <p>{orderData.customer.nombre} {orderData.customer.apellidos}</p>
                <p>{orderData.customer.direccion}</p>
                <p>{orderData.customer.codigoPostal} {orderData.customer.ciudad}</p>
                <p>{orderData.customer.provincia}</p>
                <p>Email: {orderData.customer.email}</p>
                <p>Teléfono: {orderData.customer.telefono}</p>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <Text as="h2" variant="heading-4" className="mb-6">
              Método de Pago
            </Text>

            <div className="space-y-4">
              {/* Redsys Payment */}
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-blue-100 p-2 rounded">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <div>
                    <Text variant="body-md" className="font-medium">
                      Tarjeta de Crédito/Débito
                    </Text>
                    <Text variant="body-sm" colour="light">
                      Pago seguro con Redsys
                    </Text>
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-4">
                  <div className="h-8 w-12 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">VISA</div>
                  <div className="h-8 w-12 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">MC</div>
                  <div className="h-8 w-12 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">MAE</div>
                </div>

                <Button 
                  onClick={handleRedsysPayment} 
                  disabled={isRedirecting}
                  className="w-full"
                  size="lg"
                >
                  {isRedirecting ? 'Redirigiendo...' : `Pagar €${orderData.total.toFixed(2)}`}
                </Button>
              </div>
            </div>

            <div className="mt-6 text-center">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Conexión SSL segura - Tus datos están protegidos</span>
              </div>

              <Link to="/checkout" className="text-blue-600 hover:text-blue-800 text-sm">
                ← Volver a la información de envío
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
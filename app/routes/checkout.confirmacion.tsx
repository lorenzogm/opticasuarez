import type { MetaFunction } from 'react-router';
import { useSearchParams } from 'react-router';
import { Text } from '../ui/components/text';
import { Button } from '../ui/components/button';

export const meta: MetaFunction = () => {
  return [
    { title: 'Confirmación de Compra - Óptica Suárez' },
    { name: 'description', content: 'Tu pedido ha sido procesado exitosamente.' },
  ];
};

function ConfirmacionPage({ status, order }: { status: string | null; order: string | null }) {
  const isSuccess = status === 'success';

  return (
    <main className="pt-20 min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl py-16">
        <div className="text-center">
          {isSuccess ? (
            <>
              {/* Success State */}
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>

              <Text as="h1" variant="heading-2" className="mb-4 text-green-800">
                ¡Pedido Confirmado!
              </Text>

              <Text variant="body-lg" colour="light" className="mb-6 max-w-2xl mx-auto">
                Gracias por tu compra. Tu pedido ha sido procesado exitosamente y recibirás un email de confirmación en breve.
              </Text>

              {order && (
                <div className="bg-white rounded-lg p-6 shadow-sm max-w-md mx-auto mb-8">
                  <Text variant="body-md" className="font-medium mb-2">
                    Número de Pedido
                  </Text>
                  <Text variant="heading-4" className="text-blue-600 font-mono">
                    {order}
                  </Text>
                </div>
              )}

              <div className="bg-blue-50 rounded-lg p-6 max-w-2xl mx-auto mb-8">
                <Text as="h2" variant="heading-4" className="mb-4 text-blue-800">
                  ¿Qué ocurre ahora?
                </Text>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
                  <div>
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        1
                      </div>
                      <Text variant="body-md" className="font-medium">
                        Confirmación
                      </Text>
                    </div>
                    <Text variant="body-sm" colour="light">
                      Te enviaremos un email con los detalles de tu pedido
                    </Text>
                  </div>
                  <div>
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        2
                      </div>
                      <Text variant="body-md" className="font-medium">
                        Preparación
                      </Text>
                    </div>
                    <Text variant="body-sm" colour="light">
                      Preparamos tu pedido con el máximo cuidado
                    </Text>
                  </div>
                  <div>
                    <div className="flex items-center mb-2">
                      <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold mr-3">
                        3
                      </div>
                      <Text variant="body-md" className="font-medium">
                        Entrega
                      </Text>
                    </div>
                    <Text variant="body-sm" colour="light">
                      Recoge tu pedido en nuestras tiendas o te lo enviamos
                    </Text>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Button href="/productos" size="lg">
                  Seguir comprando
                </Button>
                <div>
                  <Button href="/contacto" variant="secondary">
                    Contactar soporte
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Error State */}
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>

              <Text as="h1" variant="heading-2" className="mb-4 text-red-800">
                Error en el Pago
              </Text>

              <Text variant="body-lg" colour="light" className="mb-8 max-w-2xl mx-auto">
                Lo sentimos, hubo un problema al procesar tu pago. No se ha realizado ningún cargo a tu tarjeta.
              </Text>

              <div className="space-y-4">
                <Button href="/checkout" size="lg">
                  Intentar de nuevo
                </Button>
                <div>
                  <Button href="/carrito" variant="secondary">
                    Volver al carrito
                  </Button>
                </div>
                <div>
                  <Button href="/contacto" variant="secondary">
                    Contactar soporte
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Additional Information */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <Text variant="body-md" className="font-medium mb-2">
              Soporte 24/7
            </Text>
            <Text variant="body-sm" colour="light">
              Estamos aquí para ayudarte con cualquier pregunta
            </Text>
          </div>
          
          <div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <Text variant="body-md" className="font-medium mb-2">
              Garantía de Calidad
            </Text>
            <Text variant="body-sm" colour="light">
              Todos nuestros productos vienen con garantía completa
            </Text>
          </div>
          
          <div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <Text variant="body-md" className="font-medium mb-2">
              Más de 80 Años
            </Text>
            <Text variant="body-sm" colour="light">
              Cuidando la salud visual de nuestros clientes desde 1940
            </Text>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function Confirmacion() {
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status');
  const order = searchParams.get('order');

  return <ConfirmacionPage status={status} order={order} />;
}
import Homepage from '../ui/pages/homepage/homepage';

export function meta() {
  return [
    { title: 'Óptica Suárez, desde 1940 al cuidado de tu visión.' },
    {
      name: 'description',
      content:
        'Óptica Suárez, tu Centro de Optometría y Terapia Visual en Jaén, con más de más de 80 años cuidando de la salud visual. Especializados en visión infantil, Terapia Visual Comportamental, Control de Miopía, Contactología y visión deportiva.',
    },
  ];
}

export default function Home() {
  return <Homepage />;
}

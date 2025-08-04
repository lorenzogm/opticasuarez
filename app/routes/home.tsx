import Homepage from '../UI/pages/homepage/Homepage';

export function meta() {
  return [
    { title: 'Óptica Suárez - Expertos en salud visual' },
    {
      name: 'description',
      content:
        'Óptica Suárez, expertos en salud visual desde 1985. Ofrecemos exámenes visuales, gafas graduadas, lentes de contacto y gafas de sol de las mejores marcas.',
    },
  ];
}

export default function Home() {
  return <Homepage />;
}

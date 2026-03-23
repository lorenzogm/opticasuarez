import LocationSelection from '../ui/pages/book/location-selection';

export function meta() {
  return [
    { title: 'Seleccionar Centro - Óptica Suárez' },
    {
      name: 'description',
      content: 'Selecciona el centro de Óptica Suárez para tu cita.',
    },
  ];
}

export default function CitaCentro() {
  return <LocationSelection />;
}

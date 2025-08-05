import VisionDeportiva from '../ui/pages/vision-deportiva/vision-deportiva';

export function meta() {
  return [
    { title: 'Visión Deportiva | Óptica Suárez - Especialistas en rendimiento visual' },
    {
      name: 'description',
      content:
        'Optimiza tu rendimiento deportivo con nuestros servicios de visión deportiva. Evaluaciones especializadas, entrenamiento visual y equipamiento para deportistas en Jaén.',
    },
  ];
}

export default function VisionDeportivaPage() {
  return <VisionDeportiva />;
}
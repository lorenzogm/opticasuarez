import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import ProgressIndicator from '../../components/progress-indicator';

const appointmentTypes = {
  'phone-consultation': 'Cita telefónica',
  'refraction-exam': 'Cita refracción',
  'visual-efficiency-eval': 'Cita Evaluación de eficacia visual',
  'child-exam': 'Cita Examen Infantil',
  'contact-lens': 'Cita Contactología',
  'sports-vision': 'Cita Visión Deportiva',
};

export default function ContactDetails() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const appointmentType = searchParams.get('type') || '';
  const location = searchParams.get('location') || '';
  const dateParam = searchParams.get('date');
  const period = searchParams.get('period') || '';

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [observations, setObservations] = useState('');
  const [nameError, setNameError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');

  const selectedDate = dateParam ? new Date(dateParam) : null;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const validateName = (value: string) => {
    if (!value.trim()) {
      setNameError('El nombre es requerido');
      return false;
    }
    if (value.trim().length < 2) {
      setNameError('El nombre debe tener al menos 2 caracteres');
      return false;
    }
    setNameError('');
    return true;
  };

  const validatePhone = (value: string) => {
    if (!value.trim()) {
      setPhoneError('El teléfono móvil es requerido');
      return false;
    }
    // Spanish mobile phone validation (9 digits starting with 6, 7, or 9)
    const phoneRegex = /^[679]\d{8}$/;
    const cleanPhone = value.replace(/\s/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      setPhoneError('Introduce un número de móvil válido (9 dígitos)');
      return false;
    }
    setPhoneError('');
    return true;
  };

  const validateAge = (value: string) => {
    if (!value.trim()) {
      setAgeError('La edad es requerida');
      return false;
    }
    const age = parseInt(value);
    if (isNaN(age) || age < 0 || age > 120) {
      setAgeError('Introduce una edad válida');
      return false;
    }
    setAgeError('');
    return true;
  };

  const validateEmail = (value: string) => {
    if (!value.trim()) {
      setEmailError('El email es requerido');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError('Introduce un email válido');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (nameError) {
      validateName(value);
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhone(value);
    if (phoneError) {
      validatePhone(value);
    }
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAge(value);
    if (ageError) {
      validateAge(value);
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (emailError) {
      validateEmail(value);
    }
  };

  const handleContinue = () => {
    const isNameValid = validateName(name);
    const isAgeValid = validateAge(age);
    const isPhoneValid = validatePhone(phone);
    const isEmailValid = validateEmail(email);

    if (isNameValid && isAgeValid && isPhoneValid && isEmailValid) {
      const params = new URLSearchParams();
      params.set('type', appointmentType);
      params.set('location', location);
      params.set('date', dateParam || '');
      params.set('period', period);
      params.set('name', name.trim());
      params.set('age', age.trim());
      params.set('phone', phone.replace(/\s/g, ''));
      params.set('email', email.trim());
      params.set('observations', observations.trim());
      navigate(`/cita/confirmacion?${params.toString()}`);
    }
  };

  const canContinue = 
    name.trim() && 
    age.trim() && 
    phone.trim() && 
    email.trim() &&
    !nameError && 
    !ageError && 
    !phoneError &&
    !emailError;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              to={`/cita/horario?type=${appointmentType}&location=${location}`}
              className="text-blue-600 hover:text-blue-800 flex items-center gap-2 transition-colors"
            >
              ← Volver
            </Link>
            <div className="text-right">
              <h1 className="text-xl font-semibold text-gray-900">
                Óptica Suárez
              </h1>
              <p className="text-sm text-gray-600">Reservar cita</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <ProgressIndicator currentStep={4} totalSteps={5} />
          <div className="text-center mt-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Datos de contacto
            </h2>
            <p className="text-gray-600 mt-2">
              Introduce tus datos para confirmar la cita
            </p>
          </div>
        </div>

        {/* Appointment Summary */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <h3 className="font-semibold text-blue-900 mb-2">
            Resumen de tu cita
          </h3>
          <div className="text-sm text-blue-800">
            <p>
              <span className="font-medium">Tipo:</span>{' '}
              {
                appointmentTypes[
                  appointmentType as keyof typeof appointmentTypes
                ]
              }
            </p>
            {selectedDate && (
              <p>
                <span className="font-medium">Fecha:</span>{' '}
                {formatDate(selectedDate)}
              </p>
            )}
            <p>
              <span className="font-medium">Hora:</span> {period === 'morning' ? 'Mañana (9:30-13:00)' : 'Tarde (17:00-20:00)'}
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-lg shadow-sm border p-6 max-w-2xl mx-auto">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleContinue();
            }}
          >
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                  onBlur={() => validateName(name)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    nameError ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Introduce tu nombre completo"
                />
                {nameError && (
                  <p className="mt-1 text-sm text-red-600">{nameError}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Teléfono móvil *
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                  onBlur={() => validatePhone(phone)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    phoneError ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Ej: 612345678"
                />
                {phoneError && (
                  <p className="mt-1 text-sm text-red-600">{phoneError}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  Introduce un número de móvil español (9 dígitos)
                </p>
              </div>

              {/* Age Field */}
              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Edad del paciente *
                </label>
                <input
                  type="number"
                  id="age"
                  value={age}
                  onChange={handleAgeChange}
                  onBlur={() => validateAge(age)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    ageError ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Edad"
                  min="0"
                  max="120"
                />
                {ageError && (
                  <p className="mt-1 text-sm text-red-600">{ageError}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={() => validateEmail(email)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                    emailError ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="tu@email.com"
                />
                {emailError && (
                  <p className="mt-1 text-sm text-red-600">{emailError}</p>
                )}
              </div>

              {/* Observations Field */}
              <div>
                <label
                  htmlFor="observations"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Observaciones (opcional)
                </label>
                <textarea
                  id="observations"
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="Cuéntanos cualquier información adicional que consideres relevante para tu cita..."
                />
              </div>
            </div>
          </form>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mt-8">
          <Link
            to={`/cita/horario?type=${appointmentType}&location=${location}`}
            className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Volver
          </Link>
          <button
            onClick={handleContinue}
            disabled={!canContinue}
            className={`px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
              canContinue
                ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Continuar
          </button>
        </div>
      </main>
    </div>
  );
}

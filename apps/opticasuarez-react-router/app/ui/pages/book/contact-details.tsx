import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import ProgressIndicator from "../../components/progress-indicator";

const appointmentTypes = {
  "phone-consultation": "Cita telefónica",
  "refraction-exam": "Cita refracción",
  "visual-efficiency-eval": "Cita Evaluación de eficacia visual",
  "child-exam": "Cita Examen Infantil",
  "contact-lens": "Cita Contactología",
  "sports-vision": "Cita Visión Deportiva",
};

export default function ContactDetails() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const appointmentType = searchParams.get("type") || "";
  const location = searchParams.get("location") || "";
  const dateParam = searchParams.get("date");
  const period = searchParams.get("period") || "";

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [observations, setObservations] = useState("");
  const [nameError, setNameError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");

  const selectedDate = dateParam ? new Date(dateParam) : null;

  const formatDate = (date: Date) =>
    date.toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const validateName = (value: string) => {
    if (!value.trim()) {
      setNameError("El nombre es requerido");
      return false;
    }
    if (value.trim().length < 2) {
      setNameError("El nombre debe tener al menos 2 caracteres");
      return false;
    }
    setNameError("");
    return true;
  };

  const validatePhone = (value: string) => {
    if (!value.trim()) {
      setPhoneError("El teléfono móvil es requerido");
      return false;
    }
    // Spanish mobile phone validation (9 digits starting with 6, 7, or 9)
    const phoneRegex = /^[679]\d{8}$/;
    const cleanPhone = value.replace(/\s/g, "");
    if (!phoneRegex.test(cleanPhone)) {
      setPhoneError("Introduce un número de móvil válido (9 dígitos)");
      return false;
    }
    setPhoneError("");
    return true;
  };

  const validateAge = (value: string) => {
    if (!value.trim()) {
      setAgeError("La edad es requerida");
      return false;
    }
    const age = Number.parseInt(value);
    if (isNaN(age) || age < 0 || age > 120) {
      setAgeError("Introduce una edad válida");
      return false;
    }
    setAgeError("");
    return true;
  };

  const validateEmail = (value: string) => {
    if (!value.trim()) {
      setEmailError("El email es requerido");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailError("Introduce un email válido");
      return false;
    }
    setEmailError("");
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
      params.set("type", appointmentType);
      params.set("location", location);
      params.set("date", dateParam || "");
      params.set("period", period);
      params.set("name", name.trim());
      params.set("age", age.trim());
      params.set("phone", phone.replace(/\s/g, ""));
      params.set("email", email.trim());
      params.set("observations", observations.trim());
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
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto max-w-4xl px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              className="flex items-center gap-2 text-blue-600 transition-colors hover:text-blue-800"
              to={`/cita/horario?type=${appointmentType}&location=${location}`}
            >
              ← Volver
            </Link>
            <div className="text-right">
              <h1 className="font-semibold text-gray-900 text-xl">
                Óptica Suárez
              </h1>
              <p className="text-gray-600 text-sm">Reservar cita</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-4xl px-4 py-8">
        {/* Progress Indicator */}
        <div className="mb-8">
          <ProgressIndicator currentStep={4} totalSteps={5} />
          <div className="mt-4 text-center">
            <h2 className="font-bold text-2xl text-gray-900">
              Datos de contacto
            </h2>
            <p className="mt-2 text-gray-600">
              Introduce tus datos para confirmar la cita
            </p>
          </div>
        </div>

        {/* Appointment Summary */}
        <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <h3 className="mb-2 font-semibold text-blue-900">
            Resumen de tu cita
          </h3>
          <div className="text-blue-800 text-sm">
            <p>
              <span className="font-medium">Tipo:</span>{" "}
              {
                appointmentTypes[
                  appointmentType as keyof typeof appointmentTypes
                ]
              }
            </p>
            {selectedDate && (
              <p>
                <span className="font-medium">Fecha:</span>{" "}
                {formatDate(selectedDate)}
              </p>
            )}
            <p>
              <span className="font-medium">Hora:</span>{" "}
              {period === "morning"
                ? "Mañana (9:30-13:00)"
                : "Tarde (17:00-20:00)"}
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mx-auto max-w-2xl rounded-lg border bg-white p-6 shadow-sm">
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
                  className="mb-2 block font-medium text-gray-700 text-sm"
                  htmlFor="name"
                >
                  Nombre completo *
                </label>
                <input
                  className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
                    nameError ? "border-red-500" : "border-gray-300"
                  }`}
                  id="name"
                  onBlur={() => validateName(name)}
                  onChange={handleNameChange}
                  placeholder="Introduce tu nombre completo"
                  type="text"
                  value={name}
                />
                {nameError && (
                  <p className="mt-1 text-red-600 text-sm">{nameError}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label
                  className="mb-2 block font-medium text-gray-700 text-sm"
                  htmlFor="phone"
                >
                  Teléfono móvil *
                </label>
                <input
                  className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
                    phoneError ? "border-red-500" : "border-gray-300"
                  }`}
                  id="phone"
                  onBlur={() => validatePhone(phone)}
                  onChange={handlePhoneChange}
                  placeholder="Ej: 612345678"
                  type="tel"
                  value={phone}
                />
                {phoneError && (
                  <p className="mt-1 text-red-600 text-sm">{phoneError}</p>
                )}
                <p className="mt-1 text-gray-500 text-sm">
                  Introduce un número de móvil español (9 dígitos)
                </p>
              </div>

              {/* Age Field */}
              <div>
                <label
                  className="mb-2 block font-medium text-gray-700 text-sm"
                  htmlFor="age"
                >
                  Edad del paciente *
                </label>
                <input
                  className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
                    ageError ? "border-red-500" : "border-gray-300"
                  }`}
                  id="age"
                  max="120"
                  min="0"
                  onBlur={() => validateAge(age)}
                  onChange={handleAgeChange}
                  placeholder="Edad"
                  type="number"
                  value={age}
                />
                {ageError && (
                  <p className="mt-1 text-red-600 text-sm">{ageError}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  className="mb-2 block font-medium text-gray-700 text-sm"
                  htmlFor="email"
                >
                  Email *
                </label>
                <input
                  className={`w-full rounded-lg border px-4 py-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
                    emailError ? "border-red-500" : "border-gray-300"
                  }`}
                  id="email"
                  onBlur={() => validateEmail(email)}
                  onChange={handleEmailChange}
                  placeholder="tu@email.com"
                  type="email"
                  value={email}
                />
                {emailError && (
                  <p className="mt-1 text-red-600 text-sm">{emailError}</p>
                )}
              </div>

              {/* Observations Field */}
              <div>
                <label
                  className="mb-2 block font-medium text-gray-700 text-sm"
                  htmlFor="observations"
                >
                  Observaciones (opcional)
                </label>
                <textarea
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  id="observations"
                  onChange={(e) => setObservations(e.target.value)}
                  placeholder="Cuéntanos cualquier información adicional que consideres relevante para tu cita..."
                  rows={3}
                  value={observations}
                />
              </div>
            </div>
          </form>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex items-center justify-between">
          <Link
            className="px-6 py-3 text-gray-600 transition-colors hover:text-gray-800"
            to={`/cita/horario?type=${appointmentType}&location=${location}`}
          >
            Volver
          </Link>
          <button
            className={`rounded-lg px-8 py-3 font-medium transition-all duration-200 ${
              canContinue
                ? "bg-blue-600 text-white shadow-md hover:bg-blue-700"
                : "cursor-not-allowed bg-gray-200 text-gray-400"
            }`}
            disabled={!canContinue}
            onClick={handleContinue}
          >
            Continuar
          </button>
        </div>
      </main>
    </div>
  );
}

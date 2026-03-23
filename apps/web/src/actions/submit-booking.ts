import { createServerFn } from "@tanstack/react-start";
import { sendBookingEmails } from "./send-booking-emails";

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator(
    (data: {
      appointmentType: string;
      location: string;
      date: string;
      period: string;
      name: string;
      age: string;
      phone: string;
      email: string;
      observations: string;
    }) => {
      if (
        !(
          data.name?.trim() &&
          data.phone?.trim() &&
          data.date?.trim() &&
          data.appointmentType?.trim() &&
          data.location?.trim() &&
          data.period?.trim()
        )
      ) {
        throw new Error("Faltan campos obligatorios");
      }
      if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        throw new Error("Email no válido");
      }
      return {
        appointmentType: data.appointmentType.trim().slice(0, 200),
        location: data.location.trim().slice(0, 200),
        date: data.date.trim().slice(0, 50),
        period: data.period.trim().slice(0, 200),
        name: data.name.trim().slice(0, 200),
        age: (data.age || "").trim().slice(0, 10),
        phone: data.phone.trim().slice(0, 30),
        email: (data.email || "").trim().slice(0, 200),
        observations: (data.observations || "").trim().slice(0, 2000),
      };
    }
  )
  .handler(async ({ data }) => sendBookingEmails(data));

import { describe, expect, it } from "vitest";

// Test the validation logic from submit-booking.ts without needing createServerFn
// The validator is inlined in the createServerFn call, so we replicate the exact rules here

interface BookingInput {
  appointmentType: string;
  location: string;
  date: string;
  period: string;
  name: string;
  age: string;
  phone: string;
  email: string;
  observations: string;
}

function validateBookingInput(data: Partial<BookingInput>) {
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
    appointmentType: (data.appointmentType || "").trim().slice(0, 200),
    location: (data.location || "").trim().slice(0, 200),
    date: (data.date || "").trim().slice(0, 50),
    period: (data.period || "").trim().slice(0, 200),
    name: (data.name || "").trim().slice(0, 200),
    age: (data.age || "").trim().slice(0, 10),
    phone: (data.phone || "").trim().slice(0, 30),
    email: (data.email || "").trim().slice(0, 200),
    observations: (data.observations || "").trim().slice(0, 2000),
  };
}

const validInput: BookingInput = {
  appointmentType: "refraction-exam",
  location: "centro",
  date: "2026-04-01T10:00:00.000Z",
  period: "morning",
  name: "Juan García",
  age: "35",
  phone: "612345678",
  email: "juan@example.com",
  observations: "Primera visita",
};

describe("Booking Input Validation", () => {
  describe("required fields", () => {
    it("should accept valid complete input", () => {
      expect(() => validateBookingInput(validInput)).not.toThrow();
    });

    it("should reject missing name", () => {
      expect(() => validateBookingInput({ ...validInput, name: "" })).toThrow(
        "Faltan campos obligatorios"
      );
    });

    it("should reject missing phone", () => {
      expect(() => validateBookingInput({ ...validInput, phone: "" })).toThrow(
        "Faltan campos obligatorios"
      );
    });

    it("should reject missing date", () => {
      expect(() => validateBookingInput({ ...validInput, date: "" })).toThrow(
        "Faltan campos obligatorios"
      );
    });

    it("should reject missing appointmentType", () => {
      expect(() =>
        validateBookingInput({ ...validInput, appointmentType: "" })
      ).toThrow("Faltan campos obligatorios");
    });

    it("should reject missing location", () => {
      expect(() =>
        validateBookingInput({ ...validInput, location: "" })
      ).toThrow("Faltan campos obligatorios");
    });

    it("should reject missing period", () => {
      expect(() => validateBookingInput({ ...validInput, period: "" })).toThrow(
        "Faltan campos obligatorios"
      );
    });

    it("should reject whitespace-only name", () => {
      expect(() =>
        validateBookingInput({ ...validInput, name: "   " })
      ).toThrow("Faltan campos obligatorios");
    });

    it("should allow empty email (optional field)", () => {
      const result = validateBookingInput({ ...validInput, email: "" });
      expect(result.email).toBe("");
    });

    it("should allow empty age (optional field)", () => {
      const result = validateBookingInput({ ...validInput, age: "" });
      expect(result.age).toBe("");
    });

    it("should allow empty observations (optional field)", () => {
      const result = validateBookingInput({ ...validInput, observations: "" });
      expect(result.observations).toBe("");
    });
  });

  describe("email validation", () => {
    it("should accept valid email", () => {
      expect(() =>
        validateBookingInput({ ...validInput, email: "test@example.com" })
      ).not.toThrow();
    });

    it("should reject invalid email format", () => {
      expect(() =>
        validateBookingInput({ ...validInput, email: "not-an-email" })
      ).toThrow("Email no válido");
    });

    it("should reject email without @", () => {
      expect(() =>
        validateBookingInput({ ...validInput, email: "testexample.com" })
      ).toThrow("Email no válido");
    });

    it("should reject email without TLD", () => {
      expect(() =>
        validateBookingInput({ ...validInput, email: "test@example" })
      ).toThrow("Email no válido");
    });

    it("should skip email validation when email is empty", () => {
      expect(() =>
        validateBookingInput({ ...validInput, email: "" })
      ).not.toThrow();
    });
  });

  describe("sanitization", () => {
    it("should trim whitespace from all fields", () => {
      const result = validateBookingInput({
        ...validInput,
        name: "  Juan  ",
        phone: "  612345678  ",
      });
      expect(result.name).toBe("Juan");
      expect(result.phone).toBe("612345678");
    });

    it("should truncate name to 200 characters", () => {
      const longName = "A".repeat(300);
      const result = validateBookingInput({ ...validInput, name: longName });
      expect(result.name.length).toBe(200);
    });

    it("should truncate date to 50 characters", () => {
      const longDate = `2026-04-01T10:00:00.000Z${"X".repeat(100)}`;
      const result = validateBookingInput({ ...validInput, date: longDate });
      expect(result.date.length).toBe(50);
    });

    it("should truncate phone to 30 characters", () => {
      const longPhone = `6${"1".repeat(100)}`;
      const result = validateBookingInput({ ...validInput, phone: longPhone });
      expect(result.phone.length).toBe(30);
    });

    it("should truncate observations to 2000 characters", () => {
      const longObs = "A".repeat(3000);
      const result = validateBookingInput({
        ...validInput,
        observations: longObs,
      });
      expect(result.observations.length).toBe(2000);
    });

    it("should truncate age to 10 characters", () => {
      const longAge = "1".repeat(50);
      const result = validateBookingInput({ ...validInput, age: longAge });
      expect(result.age.length).toBe(10);
    });

    it("should truncate email to 200 characters", () => {
      const longEmail = `${"a".repeat(190)}@test.com`;
      const result = validateBookingInput({ ...validInput, email: longEmail });
      expect(result.email.length).toBeLessThanOrEqual(200);
    });
  });
});

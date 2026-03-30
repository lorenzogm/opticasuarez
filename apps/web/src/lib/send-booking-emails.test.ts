import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock Resend module — use a class so `new Resend(...)` works
vi.mock("resend", () => {
  const mockSend = vi.fn().mockResolvedValue({ data: { id: "mock-id" } });
  class MockResend {
    emails = { send: mockSend };
  }
  return { Resend: MockResend };
});

describe("sendBookingEmails", () => {
  const validBooking = {
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

  describe("without RESEND_API_KEY", () => {
    beforeEach(() => {
      vi.resetModules();
      process.env.RESEND_API_KEY = "";
    });

    it("should succeed gracefully without API key", async () => {
      const { sendBookingEmails } = await import(
        "../actions/send-booking-emails"
      );
      const result = await sendBookingEmails(validBooking);
      expect(result.success).toBe(true);
    });

    it("should not throw when API key is missing", async () => {
      const { sendBookingEmails } = await import(
        "../actions/send-booking-emails"
      );
      await expect(sendBookingEmails(validBooking)).resolves.not.toThrow();
    });
  });

  describe("with RESEND_API_KEY", () => {
    beforeEach(() => {
      vi.resetModules();
      process.env.RESEND_API_KEY = "re_test_123";
    });

    it("should send two emails on success", async () => {
      const { sendBookingEmails } = await import(
        "../actions/send-booking-emails"
      );

      const result = await sendBookingEmails(validBooking);
      expect(result.success).toBe(true);
    });

    it("should return error object on API failure", async () => {
      vi.doMock("resend", () => {
        class FailingResend {
          emails = {
            send: vi.fn().mockRejectedValue(new Error("API error")),
          };
        }
        return { Resend: FailingResend };
      });

      const { sendBookingEmails } = await import(
        "../actions/send-booking-emails"
      );
      const result = await sendBookingEmails(validBooking);
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe("appointment type mapping", () => {
    beforeEach(() => {
      vi.resetModules();
      process.env.RESEND_API_KEY = "";
    });

    it("should handle all appointment types without error", async () => {
      const { sendBookingEmails } = await import(
        "../actions/send-booking-emails"
      );
      const types = [
        "phone-consultation",
        "refraction-exam",
        "visual-efficiency-eval",
        "child-exam",
        "contact-lens",
        "sports-vision",
      ];

      for (const type of types) {
        const result = await sendBookingEmails({
          ...validBooking,
          appointmentType: type,
        });
        expect(result.success).toBe(true);
      }
    });

    it("should handle both location options", async () => {
      const { sendBookingEmails } = await import(
        "../actions/send-booking-emails"
      );

      for (const location of ["centro", "bulevar"]) {
        const result = await sendBookingEmails({
          ...validBooking,
          location,
        });
        expect(result.success).toBe(true);
      }
    });

    it("should handle both period options", async () => {
      const { sendBookingEmails } = await import(
        "../actions/send-booking-emails"
      );

      for (const period of ["morning", "afternoon"]) {
        const result = await sendBookingEmails({
          ...validBooking,
          period,
        });
        expect(result.success).toBe(true);
      }
    });
  });

  describe("edge cases", () => {
    beforeEach(() => {
      vi.resetModules();
      process.env.RESEND_API_KEY = "";
    });

    it("should handle empty observations", async () => {
      const { sendBookingEmails } = await import(
        "../actions/send-booking-emails"
      );
      const result = await sendBookingEmails({
        ...validBooking,
        observations: "",
      });
      expect(result.success).toBe(true);
    });

    it("should handle unknown location gracefully", async () => {
      const { sendBookingEmails } = await import(
        "../actions/send-booking-emails"
      );
      const result = await sendBookingEmails({
        ...validBooking,
        location: "unknown-location",
      });
      expect(result.success).toBe(true);
    });
  });
});

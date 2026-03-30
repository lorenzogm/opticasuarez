import { describe, expect, it } from "vitest";

// Test the validation logic from submit-product-inquiry.ts
// The validator is inlined in createServerFn, so we replicate the exact rules

interface InquiryInput {
  productName: string;
  productSlug: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

function validateInquiryInput(data: Partial<InquiryInput>) {
  if (!(data.name?.trim() && data.phone?.trim())) {
    throw new Error("Nombre y teléfono son obligatorios");
  }
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    throw new Error("Email no válido");
  }
  return {
    productName: (data.productName || "").trim().slice(0, 300),
    productSlug: (data.productSlug || "").trim().slice(0, 300),
    name: (data.name || "").trim().slice(0, 200),
    email: (data.email || "").trim().slice(0, 200),
    phone: (data.phone || "").trim().slice(0, 30),
    message: (data.message || "").trim().slice(0, 2000),
  };
}

const validInput: InquiryInput = {
  productName: "Gafas Ray-Ban Aviator",
  productSlug: "ray-ban-aviator",
  name: "María López",
  email: "maria@example.com",
  phone: "612345678",
  message: "Quiero saber el precio",
};

describe("Product Inquiry Input Validation", () => {
  describe("required fields", () => {
    it("should accept valid complete input", () => {
      expect(() => validateInquiryInput(validInput)).not.toThrow();
    });

    it("should reject missing name", () => {
      expect(() => validateInquiryInput({ ...validInput, name: "" })).toThrow(
        "Nombre y teléfono son obligatorios"
      );
    });

    it("should reject missing phone", () => {
      expect(() => validateInquiryInput({ ...validInput, phone: "" })).toThrow(
        "Nombre y teléfono son obligatorios"
      );
    });

    it("should reject whitespace-only name", () => {
      expect(() =>
        validateInquiryInput({ ...validInput, name: "   " })
      ).toThrow("Nombre y teléfono son obligatorios");
    });

    it("should allow empty email (optional)", () => {
      const result = validateInquiryInput({ ...validInput, email: "" });
      expect(result.email).toBe("");
    });

    it("should allow empty message (optional)", () => {
      const result = validateInquiryInput({ ...validInput, message: "" });
      expect(result.message).toBe("");
    });
  });

  describe("email validation", () => {
    it("should accept valid email", () => {
      expect(() =>
        validateInquiryInput({ ...validInput, email: "test@example.com" })
      ).not.toThrow();
    });

    it("should reject invalid email", () => {
      expect(() =>
        validateInquiryInput({ ...validInput, email: "not-email" })
      ).toThrow("Email no válido");
    });

    it("should skip validation for empty email", () => {
      expect(() =>
        validateInquiryInput({ ...validInput, email: "" })
      ).not.toThrow();
    });
  });

  describe("sanitization", () => {
    it("should trim whitespace from fields", () => {
      const result = validateInquiryInput({
        ...validInput,
        name: "  María  ",
        phone: "  612345678  ",
      });
      expect(result.name).toBe("María");
      expect(result.phone).toBe("612345678");
    });

    it("should truncate productName to 300 characters", () => {
      const longName = "A".repeat(400);
      const result = validateInquiryInput({
        ...validInput,
        productName: longName,
      });
      expect(result.productName.length).toBe(300);
    });

    it("should truncate name to 200 characters", () => {
      const longName = "A".repeat(300);
      const result = validateInquiryInput({
        ...validInput,
        name: longName,
      });
      expect(result.name.length).toBe(200);
    });

    it("should truncate phone to 30 characters", () => {
      const longPhone = `6${"1".repeat(100)}`;
      const result = validateInquiryInput({
        ...validInput,
        phone: longPhone,
      });
      expect(result.phone.length).toBe(30);
    });

    it("should truncate message to 2000 characters", () => {
      const longMsg = "A".repeat(3000);
      const result = validateInquiryInput({
        ...validInput,
        message: longMsg,
      });
      expect(result.message.length).toBe(2000);
    });
  });
});

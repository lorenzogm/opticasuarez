import { describe, expect, it } from "vitest";
import {
  decodeMerchantParameters,
  encodeMerchantParameters,
  encrypt3DES,
  getRedsysFormData,
  signRequest,
  toCents,
  verifySignature,
} from "./redsys";

// Test key (Base64-encoded 24-byte key for testing)
const TEST_SECRET_KEY = "sq7HjrUOBfKmC576ILgskD5srU870gJ7";

describe("redsys", () => {
  describe("toCents", () => {
    it("converts euros to cents string", () => {
      expect(toCents(12.5)).toBe("1250");
    });

    it("handles whole euros", () => {
      expect(toCents(100)).toBe("10000");
    });

    it("handles small amounts", () => {
      expect(toCents(0.01)).toBe("1");
    });

    it("rounds to nearest cent", () => {
      expect(toCents(12.999)).toBe("1300");
    });
  });

  describe("encodeMerchantParameters", () => {
    it("encodes to Base64url", () => {
      const data = { Ds_Merchant_Amount: "1250", Ds_Merchant_Order: "OS-20250101-0001" };
      const encoded = encodeMerchantParameters(data);
      // Must be valid base64url (no +, /, =)
      expect(encoded).not.toMatch(/[+/=]/);
      // Must be decodable back
      const decoded = JSON.parse(Buffer.from(encoded, "base64url").toString("utf-8"));
      expect(decoded.Ds_Merchant_Amount).toBe("1250");
      expect(decoded.Ds_Merchant_Order).toBe("OS-20250101-0001");
    });

    it("round-trips through encode/decode", () => {
      const data = {
        Ds_Merchant_Amount: "5550",
        Ds_Merchant_Order: "OS-20250615-1234",
        Ds_Merchant_MerchantCode: "123456789",
      };
      const encoded = encodeMerchantParameters(data);
      const decoded = decodeMerchantParameters(encoded);
      expect(decoded).toEqual(data);
    });
  });

  describe("decodeMerchantParameters", () => {
    it("decodes Base64url to object", () => {
      const original = { Ds_Response: "0000", Ds_Order: "OS-20250101-0001" };
      const encoded = Buffer.from(JSON.stringify(original)).toString("base64url");
      const decoded = decodeMerchantParameters(encoded);
      expect(decoded).toEqual(original);
    });
  });

  describe("encrypt3DES", () => {
    it("returns a Buffer (non-empty)", () => {
      const result = encrypt3DES(TEST_SECRET_KEY, "OS-20250101-0001");
      expect(result).toBeInstanceOf(Buffer);
      expect(result.length).toBeGreaterThan(0);
    });

    it("produces different keys for different orders", () => {
      const key1 = encrypt3DES(TEST_SECRET_KEY, "OS-20250101-0001");
      const key2 = encrypt3DES(TEST_SECRET_KEY, "OS-20250101-0002");
      expect(key1.equals(key2)).toBe(false);
    });
  });

  describe("signRequest", () => {
    it("returns a non-empty Base64url string", () => {
      const merchantParams = encodeMerchantParameters({
        Ds_Merchant_Amount: "1250",
        Ds_Merchant_Order: "OS-20250101-0001",
      });
      const orderKey = encrypt3DES(TEST_SECRET_KEY, "OS-20250101-0001");
      const signature = signRequest(merchantParams, orderKey);
      expect(signature).toBeTruthy();
      expect(typeof signature).toBe("string");
    });

    it("produces deterministic signatures", () => {
      const merchantParams = encodeMerchantParameters({
        Ds_Merchant_Amount: "1250",
        Ds_Merchant_Order: "OS-20250101-0001",
      });
      const orderKey = encrypt3DES(TEST_SECRET_KEY, "OS-20250101-0001");
      const sig1 = signRequest(merchantParams, orderKey);
      const sig2 = signRequest(merchantParams, orderKey);
      expect(sig1).toBe(sig2);
    });
  });

  describe("verifySignature", () => {
    it("returns true for valid signature", () => {
      const orderNumber = "OS-20250101-0001";
      const params = { Ds_Order: orderNumber, Ds_Response: "0000", Ds_Amount: "1250" };
      const encoded = encodeMerchantParameters(params);
      const orderKey = encrypt3DES(TEST_SECRET_KEY, orderNumber);
      const signature = signRequest(encoded, orderKey);

      expect(verifySignature(encoded, signature, TEST_SECRET_KEY, orderNumber)).toBe(true);
    });

    it("returns false for tampered data", () => {
      const orderNumber = "OS-20250101-0001";
      const params = { Ds_Order: orderNumber, Ds_Response: "0000", Ds_Amount: "1250" };
      const encoded = encodeMerchantParameters(params);
      const orderKey = encrypt3DES(TEST_SECRET_KEY, orderNumber);
      const signature = signRequest(encoded, orderKey);

      // Tamper the encoded params
      const tamperedParams = encodeMerchantParameters({
        ...params,
        Ds_Amount: "100",
      });
      expect(verifySignature(tamperedParams, signature, TEST_SECRET_KEY, orderNumber)).toBe(false);
    });

    it("returns false for wrong order number", () => {
      const orderNumber = "OS-20250101-0001";
      const params = { Ds_Order: orderNumber, Ds_Response: "0000" };
      const encoded = encodeMerchantParameters(params);
      const orderKey = encrypt3DES(TEST_SECRET_KEY, orderNumber);
      const signature = signRequest(encoded, orderKey);

      expect(verifySignature(encoded, signature, TEST_SECRET_KEY, "WRONG-ORDER")).toBe(false);
    });
  });

  describe("getRedsysFormData", () => {
    it("returns url and required fields", () => {
      const result = getRedsysFormData({
        orderNumber: "OS-20250101-0001",
        amount: 12.5,
        merchantCode: "999008881",
        terminal: "1",
        secretKey: TEST_SECRET_KEY,
        redsysUrl: "https://sis-t.redsys.es:25443/sis/realizarPago",
        merchantUrl: "https://example.com/api/redsys-notification",
        okUrl: "https://example.com/checkout/confirmacion?pedido=OS-20250101-0001",
        koUrl: "https://example.com/checkout/error?pedido=OS-20250101-0001",
      });

      expect(result.url).toBe("https://sis-t.redsys.es:25443/sis/realizarPago");
      expect(result.fields.Ds_SignatureVersion).toBe("HMAC_SHA256_V1");
      expect(result.fields.Ds_MerchantParameters).toBeTruthy();
      expect(result.fields.Ds_Signature).toBeTruthy();

      // Verify merchant parameters contain expected values
      const merchantData = decodeMerchantParameters(result.fields.Ds_MerchantParameters);
      expect(merchantData.Ds_Merchant_Amount).toBe("1250");
      expect(merchantData.Ds_Merchant_Order).toBe("OS-20250101-0001");
      expect(merchantData.Ds_Merchant_MerchantCode).toBe("999008881");
      expect(merchantData.Ds_Merchant_Terminal).toBe("1");
      expect(merchantData.Ds_Merchant_TransactionType).toBe("0");
      expect(merchantData.Ds_Merchant_Currency).toBe("978");
    });

    it("encodes amount in cents", () => {
      const result = getRedsysFormData({
        orderNumber: "OS-20250101-0001",
        amount: 55.5,
        merchantCode: "999008881",
        terminal: "1",
        secretKey: TEST_SECRET_KEY,
        redsysUrl: "https://sis-t.redsys.es:25443/sis/realizarPago",
        merchantUrl: "https://example.com/api/redsys-notification",
        okUrl: "https://example.com/checkout/confirmacion",
        koUrl: "https://example.com/checkout/error",
      });

      const merchantData = decodeMerchantParameters(result.fields.Ds_MerchantParameters);
      expect(merchantData.Ds_Merchant_Amount).toBe("5550");
    });

    it("signature is verifiable", () => {
      const orderNumber = "OS-20250101-0001";
      const result = getRedsysFormData({
        orderNumber,
        amount: 12.5,
        merchantCode: "999008881",
        terminal: "1",
        secretKey: TEST_SECRET_KEY,
        redsysUrl: "https://sis-t.redsys.es:25443/sis/realizarPago",
        merchantUrl: "https://example.com/api/redsys-notification",
        okUrl: "https://example.com/checkout/confirmacion",
        koUrl: "https://example.com/checkout/error",
      });

      const isValid = verifySignature(
        result.fields.Ds_MerchantParameters,
        result.fields.Ds_Signature,
        TEST_SECRET_KEY,
        orderNumber
      );
      expect(isValid).toBe(true);
    });
  });
});

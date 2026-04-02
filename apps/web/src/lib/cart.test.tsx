import { beforeEach, describe, expect, it } from "vitest";
import type { CartItem } from "./cart";
import {
  addItemToCart,
  calcItemCount,
  calcSubtotal,
  loadCartFromStorage,
  removeItemFromCart,
  saveCartToStorage,
  updateItemQuantity,
} from "./cart";

const STORAGE_KEY = "opticasuarez_cart";

const sampleItem: CartItem = {
  productId: "prod-1",
  slug: "ray-ban-aviator",
  name: "Ray-Ban Aviator",
  image: "https://cdn.sanity.io/images/123/prod/image.jpg",
  price: 150,
  quantity: 1,
  brand: "Ray-Ban",
};

const sampleItemWithColor: CartItem = {
  ...sampleItem,
  productId: "prod-2",
  slug: "oakley-holbrook",
  name: "Oakley Holbrook",
  price: 120,
  brand: "Oakley",
  color: { name: "Negro", hex: "#000000" },
};

beforeEach(() => {
  localStorage.clear();
});

describe("Cart Logic", () => {
  describe("addItemToCart", () => {
    it("adds a product to an empty cart", () => {
      const result = addItemToCart([], sampleItem);
      expect(result).toHaveLength(1);
      expect(result[0]).toEqual(sampleItem);
    });

    it("adds multiple different products", () => {
      let cart = addItemToCart([], sampleItem);
      cart = addItemToCart(cart, sampleItemWithColor);
      expect(cart).toHaveLength(2);
    });

    it("increments quantity if same product already in cart", () => {
      let cart = addItemToCart([], sampleItem);
      cart = addItemToCart(cart, sampleItem);
      expect(cart).toHaveLength(1);
      expect(cart[0].quantity).toBe(2);
    });

    it("treats same product with different color as separate items", () => {
      const blueVariant: CartItem = {
        ...sampleItem,
        color: { name: "Azul", hex: "#0000FF" },
      };
      let cart = addItemToCart([], sampleItem);
      cart = addItemToCart(cart, blueVariant);
      expect(cart).toHaveLength(2);
    });

    it("respects max quantity of 10", () => {
      let cart = addItemToCart([], { ...sampleItem, quantity: 9 });
      cart = addItemToCart(cart, { ...sampleItem, quantity: 5 });
      expect(cart[0].quantity).toBe(10);
    });
  });

  describe("removeItemFromCart", () => {
    it("removes a product from cart", () => {
      const cart = addItemToCart([], sampleItem);
      const result = removeItemFromCart(cart, sampleItem.productId);
      expect(result).toHaveLength(0);
    });

    it("removes only the matching product", () => {
      let cart = addItemToCart([], sampleItem);
      cart = addItemToCart(cart, sampleItemWithColor);
      const result = removeItemFromCart(cart, sampleItem.productId);
      expect(result).toHaveLength(1);
      expect(result[0].productId).toBe("prod-2");
    });

    it("removes specific color variant by color name", () => {
      const blueVariant: CartItem = {
        ...sampleItem,
        color: { name: "Azul", hex: "#0000FF" },
      };
      let cart = addItemToCart([], sampleItem);
      cart = addItemToCart(cart, blueVariant);
      const result = removeItemFromCart(
        cart,
        sampleItem.productId,
        sampleItem.color?.name
      );
      expect(result).toHaveLength(1);
      expect(result[0].color?.name).toBe("Azul");
    });

    it("does nothing if product not in cart", () => {
      const cart = addItemToCart([], sampleItem);
      const result = removeItemFromCart(cart, "nonexistent");
      expect(result).toHaveLength(1);
    });
  });

  describe("updateItemQuantity", () => {
    it("changes item quantity", () => {
      const cart = addItemToCart([], sampleItem);
      const result = updateItemQuantity(cart, sampleItem.productId, 5);
      expect(result[0].quantity).toBe(5);
    });

    it("removes item if quantity set to 0", () => {
      const cart = addItemToCart([], sampleItem);
      const result = updateItemQuantity(cart, sampleItem.productId, 0);
      expect(result).toHaveLength(0);
    });

    it("caps quantity at 10", () => {
      const cart = addItemToCart([], sampleItem);
      const result = updateItemQuantity(cart, sampleItem.productId, 99);
      expect(result[0].quantity).toBe(10);
    });

    it("removes item on negative quantity", () => {
      const cart = addItemToCart([], sampleItem);
      const result = updateItemQuantity(cart, sampleItem.productId, -1);
      expect(result).toHaveLength(0);
    });
  });

  describe("computed values", () => {
    it("calcSubtotal returns correct sum", () => {
      let cart = addItemToCart([], { ...sampleItem, quantity: 2 });
      cart = addItemToCart(cart, sampleItemWithColor);
      // 150 * 2 + 120 * 1 = 420
      expect(calcSubtotal(cart)).toBe(420);
    });

    it("calcSubtotal returns 0 for empty cart", () => {
      expect(calcSubtotal([])).toBe(0);
    });

    it("calcItemCount returns total number of items", () => {
      let cart = addItemToCart([], { ...sampleItem, quantity: 3 });
      cart = addItemToCart(cart, sampleItemWithColor);
      expect(calcItemCount(cart)).toBe(4);
    });

    it("calcItemCount returns 0 for empty cart", () => {
      expect(calcItemCount([])).toBe(0);
    });
  });

  describe("localStorage persistence", () => {
    it("saves cart to localStorage", () => {
      const cart = addItemToCart([], sampleItem);
      saveCartToStorage(cart);
      const stored = JSON.parse(
        localStorage.getItem(STORAGE_KEY) || "[]"
      ) as CartItem[];
      expect(stored).toHaveLength(1);
      expect(stored[0].productId).toBe(sampleItem.productId);
    });

    it("loads cart from localStorage", () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([sampleItem]));
      const result = loadCartFromStorage();
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe(sampleItem.name);
    });

    it("handles corrupted localStorage gracefully", () => {
      localStorage.setItem(STORAGE_KEY, "not-valid-json{{{");
      const result = loadCartFromStorage();
      expect(result).toHaveLength(0);
    });

    it("handles non-array localStorage gracefully", () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ invalid: true }));
      const result = loadCartFromStorage();
      expect(result).toHaveLength(0);
    });

    it("removes key when saving empty cart", () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([sampleItem]));
      saveCartToStorage([]);
      expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
    });
  });
});

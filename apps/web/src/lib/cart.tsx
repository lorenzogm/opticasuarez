"use client";

import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

const STORAGE_KEY = "opticasuarez_cart";
const MAX_QUANTITY = 10;

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  color?: { name: string; hex: string };
  brand?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, colorName?: string) => void;
  updateQuantity: (
    productId: string,
    quantity: number,
    colorName?: string
  ) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | null>(null);

// ─── Pure functions (exported for testing) ───────────────────

function matchesItem(
  item: CartItem,
  productId: string,
  colorName?: string
): boolean {
  if (item.productId !== productId) return false;
  if (colorName !== undefined) return item.color?.name === colorName;
  return !item.color;
}

export function addItemToCart(cart: CartItem[], newItem: CartItem): CartItem[] {
  const existingIndex = cart.findIndex((item) =>
    matchesItem(item, newItem.productId, newItem.color?.name)
  );
  if (existingIndex >= 0) {
    return cart.map((item, i) =>
      i === existingIndex
        ? {
            ...item,
            quantity: Math.min(item.quantity + newItem.quantity, MAX_QUANTITY),
          }
        : item
    );
  }
  return [
    ...cart,
    { ...newItem, quantity: Math.min(newItem.quantity, MAX_QUANTITY) },
  ];
}

export function removeItemFromCart(
  cart: CartItem[],
  productId: string,
  colorName?: string
): CartItem[] {
  return cart.filter((item) => !matchesItem(item, productId, colorName));
}

export function updateItemQuantity(
  cart: CartItem[],
  productId: string,
  quantity: number,
  colorName?: string
): CartItem[] {
  if (quantity <= 0) {
    return cart.filter((item) => !matchesItem(item, productId, colorName));
  }
  const capped = Math.min(quantity, MAX_QUANTITY);
  return cart.map((item) =>
    matchesItem(item, productId, colorName)
      ? { ...item, quantity: capped }
      : item
  );
}

export function calcSubtotal(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

export function calcItemCount(cart: CartItem[]): number {
  return cart.reduce((sum, item) => sum + item.quantity, 0);
}

export function loadCartFromStorage(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as CartItem[];
  } catch {
    return [];
  }
}

export function saveCartToStorage(items: CartItem[]): void {
  if (items.length === 0) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }
}

// ─── React Context ───────────────────────────────────────────

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => loadCartFromStorage());
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    saveCartToStorage(items);
  }, [items]);

  const addItem = useCallback((newItem: CartItem) => {
    setItems((prev) => addItemToCart(prev, newItem));
  }, []);

  const removeItem = useCallback((productId: string, colorName?: string) => {
    setItems((prev) => removeItemFromCart(prev, productId, colorName));
  }, []);

  const updateQuantity = useCallback(
    (productId: string, quantity: number, colorName?: string) => {
      setItems((prev) =>
        updateItemQuantity(prev, productId, quantity, colorName)
      );
    },
    []
  );

  const clearCart = useCallback(() => {
    setItems([]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const itemCount = useMemo(() => calcItemCount(items), [items]);

  const subtotal = useMemo(() => calcSubtotal(items), [items]);

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      itemCount,
      subtotal,
    }),
    [items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

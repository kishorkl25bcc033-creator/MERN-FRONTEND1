import { createContext, useContext, useEffect, useMemo, useState } from "react";

const StoreContext = createContext(null);

function readStoredValue(key, fallback) {
  try {
    const stored = window.localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch (error) {
    console.error(`Could not read ${key} from local storage:`, error);
    return fallback;
  }
}

export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => readStoredValue("petal-cart", []));
  const [wishlist, setWishlist] = useState(() => readStoredValue("petal-wishlist", []));
  const [notice, setNotice] = useState("");

  useEffect(() => {
    window.localStorage.setItem("petal-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    window.localStorage.setItem("petal-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (!notice) return undefined;
    const timeout = window.setTimeout(() => setNotice(""), 2600);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  const value = useMemo(() => ({
    cart,
    wishlist,
    notice,
    setNotice,
    addToCart: (productId) => {
      setCart((current) => {
        const existing = current.find((item) => item.productId === productId);
        return existing
          ? current.map((item) => item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item)
          : [...current, { productId, quantity: 1 }];
      });
      setNotice("Added to your bag");
    },
    updateQuantity: (productId, quantity) => {
      setCart((current) => quantity <= 0
        ? current.filter((item) => item.productId !== productId)
        : current.map((item) => item.productId === productId ? { ...item, quantity } : item));
    },
    removeFromCart: (productId) => setCart((current) => current.filter((item) => item.productId !== productId)),
    clearCart: () => setCart([]),
    toggleWishlist: (productId) => {
      setWishlist((current) => current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId]);
    },
  }), [cart, wishlist, notice]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used within StoreProvider");
  return context;
}

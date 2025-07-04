import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, authLoading } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [hasFetched, setHasFetched] = useState(false); // Prevent refetch loops

  // Fetch cart when auth is ready and cart hasn't been fetched yet
  useEffect(() => {
    if (!authLoading && user && !hasFetched) {
      axios
        .get(`http://localhost:5005/api/cart/${user._id}`)
        .then((res) => {
          setCartItems(res.data.cart || []);
          setHasFetched(true);
        })
        .catch((err) => {
          console.error("Failed to load cart:", err);
          setCartItems([]);
        });
    }
  }, [authLoading, user, hasFetched]);

  // Save cart to backend when it changes
  useEffect(() => {
    if (!authLoading && user && hasFetched) {
      axios
        .post(`http://localhost:5005/api/cart/${user._id}`, {
          cart: cartItems,
        })
        .catch((err) => console.error("Failed to save cart:", err));
    }
  }, [cartItems, user, authLoading, hasFetched]);

  const addToCart = (foodItem) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item._id === foodItem._id);
      if (exists) {
        return prev.map((item) =>
          item._id === foodItem._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...foodItem, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: Number(quantity) } : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);





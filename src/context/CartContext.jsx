import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext"; // Make sure this provides `user`
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth(); // assumes user._id is available

  // Load cart from database when user logs in or refreshes
  useEffect(() => {
    const loadCart = async () => {
      if (user?._id) {
        try {
          const res = await axios.get(`/api/cart/${user._id}`);
          setCartItems(res.data.cart);
        } catch (error) {
          console.error("Failed to load cart:", error);
        }
      } else {
        setCartItems([]); // no user = empty cart
      }
    };

    loadCart();
  }, [user]);

  // Save cart to backend whenever it changes
  useEffect(() => {
    const saveCart = async () => {
      if (user?._id) {
        try {
          await axios.post(`/api/cart/${user._id}`, { cart: cartItems });
        } catch (error) {
          console.error("Failed to save cart:", error);
        }
      }
    };

    if (user?._id) {
      saveCart();
    }
  }, [cartItems, user]);

  const addToCart = (foodItem) => {
    setCartItems((prev) => {
      const exists = prev.find((item) => item._id === foodItem._id);
      if (exists) {
        toast.info(`${foodItem.name} quantity updated`);
        return prev.map((item) =>
          item._id === foodItem._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        toast.success(`${foodItem.name} added to cart`);
        return [...prev, { ...foodItem, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    toast.info("Item removed from cart");
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: Number(quantity) } : item
      )
    );
  };

  const clearCart = () => {
    toast.warn("Cart cleared");
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";
// import { useAuth } from "./AuthContext"; // Adjust path

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const { user } = useAuth();

//   // Load cart from DB on user login or refresh
//   useEffect(() => {
//     if (user) {
//       axios
//         .get(`http://localhost:5005/api/cart/${user._id}`)
//         .then((res) => setCartItems(res.data.cart || []))
//         .catch((err) => {
//           console.error("Failed to load cart:", err);
//           setCartItems([]);
//         });
//     } else {
//       setCartItems([]);
//     }
//   }, [user]);

//   // Save cart to DB on changes
//   useEffect(() => {
//     if (user) {
//       axios
//         .post(`http://localhost:5005/api/cart/${user._id}`, {
//           cart: cartItems,
//         })
//         .catch((err) => console.error("Failed to save cart:", err));
//     }
//   }, [cartItems, user]);

//   const addToCart = (foodItem) => {
//     setCartItems((prev) => {
//       const exists = prev.find((item) => item._id === foodItem._id);
//       if (exists) {
//         return prev.map((item) =>
//           item._id === foodItem._id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prev, { ...foodItem, quantity: 1 }];
//       }
//     });
//   };

//   const removeFromCart = (id) => {
//     setCartItems((prev) => prev.filter((item) => item._id !== id));
//   };

//   const updateQuantity = (id, quantity) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item._id === id ? { ...item, quantity: Number(quantity) } : item
//       )
//     );
//   };

//   const clearCart = () => setCartItems([]);

//   return (
//     <CartContext.Provider
//       value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);


// import { createContext, useContext, useState, useEffect } from "react";
// import { useAuth } from "./AuthContext"; // Adjust path if needed
// import axios from "axios";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const { user } = useAuth();

//   // Load cart from backend if logged in, else from localStorage
//   useEffect(() => {
//     if (user) {
//       axios
//         .get(`http://localhost:5005/api/cart/${user._id}`, {
//           withCredentials: true,
//         })
//         .then((res) => {
//           setCartItems(res.data.cart || []);
//         })
//         .catch(() => {
//           setCartItems([]);
//         });
//     } else {
//       const savedCart = localStorage.getItem("cartItems");
//       if (savedCart) {
//         setCartItems(JSON.parse(savedCart));
//       }
//     }
//   }, [user]);

//   // Save cart to backend if logged in, else localStorage
//   useEffect(() => {
//     if (user) {
//       axios.post(
//         `http://localhost:5005/api/cart/${user._id}`,
//         { cart: cartItems },
//         { withCredentials: true }
//       );
//     } else {
//       localStorage.setItem("cartItems", JSON.stringify(cartItems));
//     }
//   }, [cartItems, user]);

//   const addToCart = (foodItem) => {
//     setCartItems((prev) => {
//       const exists = prev.find((item) => item._id === foodItem._id);
//       if (exists) {
//         return prev.map((item) =>
//           item._id === foodItem._id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prev, { ...foodItem, quantity: 1 }];
//       }
//     });
//   };

//   const removeFromCart = (id) => {
//     setCartItems((prev) => prev.filter((item) => item._id !== id));
//   };

//   const updateQuantity = (id, quantity) => {
//     setCartItems((prev) =>
//       prev.map((item) =>
//         item._id === id ? { ...item, quantity: Number(quantity) } : item
//       )
//     );
//   };

//   const clearCart = () => setCartItems([]);

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         clearCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);



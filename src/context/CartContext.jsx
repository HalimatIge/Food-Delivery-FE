import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext"; // Adjust path

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();

  // Load cart from DB on user login or refresh
  useEffect(() => {
    if (user) {
      axios
        .get(`http://localhost:5005/api/cart/${user._id}`)
        .then((res) => setCartItems(res.data.cart || []))
        .catch((err) => {
          console.error("Failed to load cart:", err);
          setCartItems([]);
        });
    } else {
      setCartItems([]);
    }
  }, [user]);

  // Save cart to DB on changes
  useEffect(() => {
    if (user) {
      axios
        .post(`http://localhost:5005/api/cart/${user._id}`, {
          cart: cartItems,
        })
        .catch((err) => console.error("Failed to save cart:", err));
    }
  }, [cartItems, user]);

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



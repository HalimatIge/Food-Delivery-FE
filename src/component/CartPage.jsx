import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="p-6 max-w-4xl mx-auto ">
      <h1 className="text-3xl font-bold mb-6 text-[#FF4C29]">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-6">
            {cartItems.map((item) => (
              <li
                key={item._id}
                className="flex flex-col sm:flex-row gap-4 items-start sm:items-center border border-gray-200 p-4 rounded-lg shadow"
              >
                <img
                  src={item.images?.[0]?.url || "/placeholder.jpg"}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />

                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-[#FF4C29]">
                    {item.name}
                  </h2>
                  <p className="text-sm text-gray-600">${item.price}</p>

                  <input
                    type="number"
                    value={item.quantity}
                    min={1}
                    onChange={(e) =>
                      updateQuantity(item._id, Math.max(1, e.target.value))
                    }
                    className="border mt-2 px-3 py-1 w-24 rounded"
                  />
                </div>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-600 text-sm hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <button
              onClick={clearCart}
              className="text-sm underline text-gray-600 hover:text-gray-800"
            >
              Clear Cart
            </button>

            <p className="font-bold text-xl text-[#FFD93D]">
              Total: ${total.toFixed(2)}
            </p>
          </div>

          <div className="mt-6 text-right">
            <Link
              to="/checkout"
              className="bg-[#FF4C29] text-white px-6 py-2 rounded hover:bg-[#e13b1b]"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;



// import { useCart } from "../context/CartContext";

// const CartPage = () => {
//   const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

//   const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   return (
//     <div className="p-6 max-w-3xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <>
//           <ul className="space-y-4">
//             {cartItems.map((item) => (
//               <li key={item._id} className="flex justify-between items-center border p-4 rounded">
//                 <div>
//                   <h2 className="font-semibold">{item.name}</h2>
//                   <p>${item.price}</p>
//                   <input
//                     type="number"
//                     value={item.quantity}
//                     min={1}
//                     onChange={(e) => updateQuantity(item._id, e.target.value)}
//                     className="border px-2 py-1 mt-1 w-20"
//                   />
//                 </div>
//                 <button
//                   onClick={() => removeFromCart(item._id)}
//                   className="text-red-600 hover:underline"
//                 >
//                   Remove
//                 </button>
//               </li>
//             ))}
//           </ul>
//           <div className="mt-6 flex justify-between items-center">
//             <button onClick={clearCart} className="text-sm underline text-gray-600">
//               Clear Cart
//             </button>
//             <p className="font-bold text-lg">Total: ${total.toFixed(2)}</p>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default CartPage;

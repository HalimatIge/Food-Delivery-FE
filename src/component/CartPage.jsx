import { useCart } from "../context/CartContext";

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li key={item._id} className="flex justify-between items-center border p-4 rounded">
                <div>
                  <h2 className="font-semibold">{item.name}</h2>
                  <p>${item.price}</p>
                  <input
                    type="number"
                    value={item.quantity}
                    min={1}
                    onChange={(e) => updateQuantity(item._id, e.target.value)}
                    className="border px-2 py-1 mt-1 w-20"
                  />
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex justify-between items-center">
            <button onClick={clearCart} className="text-sm underline text-gray-600">
              Clear Cart
            </button>
            <p className="font-bold text-lg">Total: ${total.toFixed(2)}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;

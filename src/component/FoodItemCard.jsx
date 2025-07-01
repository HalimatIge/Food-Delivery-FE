import React from "react";
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify";

const FoodItemCard = ({ item }) => {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const isInCart = cartItems.some((f) => f._id === item._id);

  const handleToggleCart = () => {
    if (isInCart) {
      removeFromCart(item._id);
      toast.info(`${item.name} removed from cart`);
    } else {
      addToCart(item);
      toast.success(`${item.name} added to cart`);
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <img
        src={item.images?.[0]?.url || "/placeholder.jpg"}
        alt={item.name}
        className="w-full h-48 object-cover mb-3"
      />
      <h3 className="text-lg font-bold text-[#FF4C29]">{item.name}</h3>
      <p className="text-gray-600">{item.description}</p>
      <p className="text-[#FFD93D] font-semibold mt-2">${item.price}</p>
      <button
        className={`px-4 py-2 mt-2 rounded transition text-white w-full ${
          isInCart ? "bg-gray-500 hover:bg-gray-600" : "bg-[#FF4C29] hover:bg-[#e04427]"
        }`}
        onClick={handleToggleCart}
      >
        {isInCart ? "Remove from Cart" : "Add to Cart"}
      </button>
    </div>
  );
};

export default FoodItemCard;

import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth(); // ✅ Fix: Get user from AuthContext
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    address: "",
    paymentMethod: "Pay on Delivery",
  });

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5005/api/orders", {
        ...form,
        userId: user._id, // ✅ Make sure user is defined
        items: cartItems,
        totalAmount,
      });

      toast.success("Order placed successfully!");
      clearCart();
      navigate("/orders");
    } catch (err) {
      console.error("Order failed:", err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      {/* Order Summary */}
      <div className="mb-6">
        <h2 className="font-semibold text-lg mb-2">Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item._id} className="flex justify-between border-b py-2">
            <span>
              {item.name} × {item.quantity}
            </span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="text-right font-bold mt-2">
          Total: ${totalAmount.toFixed(2)}
        </div>
      </div>

      {/* Delivery Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          required
          value={form.fullName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          required
          value={form.phone}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <textarea
          name="address"
          placeholder="Delivery Address"
          required
          value={form.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <select
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="Pay on Delivery">Pay on Delivery</option>
          <option value="Card">Card</option>
        </select>

        <button
          type="submit"
          className="bg-[#FF4C29] text-white px-6 py-2 rounded hover:bg-[#e04427]"
        >
          Place Order
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;

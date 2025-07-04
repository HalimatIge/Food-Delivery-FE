import { useEffect, useState } from "react";
import axios from "axios";

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5005/api/orders")
      .then(res => setOrders(res.data.data))
      .catch(err => console.error("Failed to load admin orders", err));
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      await axios.patch(`http://localhost:5005/api/orders/${orderId}/status`, {
        status: newStatus,
      });
      setOrders(prev =>
        prev.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>
      {orders.map(order => (
        <div key={order._id} className="border p-4 mb-4 rounded shadow">
          <div className="flex justify-between">
            <div>
              <p><strong>Order ID:</strong> {order._id}</p>
              <p><strong>User ID:</strong> {order.userId}</p>
              <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
              <p><strong>Total:</strong> ₦{order.totalAmount.toFixed(2)}</p>
              <p><strong>Payment:</strong> {order.paymentMethod}</p>
              <p><strong>Address:</strong> {order.address}</p>
            </div>
            <div>
              <select
                value={order.status || "Pending"}
                onChange={(e) => updateStatus(order._id, e.target.value)}
                className="border rounded p-1"
              >
                <option>Pending</option>
                <option>Processing</option>
                <option>Confirmed</option>
                <option>On the way</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>
          </div>
          <ul className="pl-4 list-disc text-sm mt-3">
            {order.items.map(item => (
              <li key={item._id}>
                {item.name} × {item.quantity} — ₦{(item.price * item.quantity).toFixed(2)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AdminOrdersPage;

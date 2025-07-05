import { useEffect, useState } from "react";
import axios from "axios";

const statusOptions = [
  "Pending",
  "Processing",
  "Confirmed",
  "On the way",
  "Delivered",
  "Cancelled",
];

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState("All");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

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

  const filteredOrders = orders.filter(order => {
    const matchStatus = filteredStatus === "All" || order.status === filteredStatus;
    const matchSearch = order._id.toLowerCase().includes(search.toLowerCase()) ||
      order.userId.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-[#FF4C29]">All Orders</h1>

      <div className="flex flex-wrap gap-4 mb-4">
        <select
          value={filteredStatus}
          onChange={(e) => setFilteredStatus(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="All">All</option>
          {statusOptions.map(status => (
            <option key={status}>{status}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search by Order ID or User ID"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-64"
        />
      </div>

      {currentOrders.map(order => (
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
                {statusOptions.map(status => (
                  <option key={status}>{status}</option>
                ))}
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

      <div className="flex justify-center mt-6 gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded border ${page === currentPage ? "bg-[#FF4C29] text-white" : "bg-white text-black"}`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdminOrdersPage;


// import { useEffect, useState } from "react";
// import axios from "axios";

// const AdminOrdersPage = () => {
//   const [orders, setOrders] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:5005/api/orders")
//       .then(res => setOrders(res.data.data))
//       .catch(err => console.error("Failed to load admin orders", err));
//   }, []);

//   const updateStatus = async (orderId, newStatus) => {
//     try {
//       await axios.patch(`http://localhost:5005/api/orders/${orderId}/status`, {
//         status: newStatus,
//       });
//       setOrders(prev =>
//         prev.map(order =>
//           order._id === orderId ? { ...order, status: newStatus } : order
//         )
//       );
//     } catch (err) {
//       console.error("Status update failed:", err);
//     }
//   };

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">All Orders</h1>
//       {orders.map(order => (
//         <div key={order._id} className="border p-4 mb-4 rounded shadow">
//           <div className="flex justify-between">
//             <div>
//               <p><strong>Order ID:</strong> {order._id}</p>
//               <p><strong>User ID:</strong> {order.userId}</p>
//               <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
//               <p><strong>Total:</strong> ₦{order.totalAmount.toFixed(2)}</p>
//               <p><strong>Payment:</strong> {order.paymentMethod}</p>
//               <p><strong>Address:</strong> {order.address}</p>
//             </div>
//             <div>
//               <select
//                 value={order.status || "Pending"}
//                 onChange={(e) => updateStatus(order._id, e.target.value)}
//                 className="border rounded p-1"
//               >
//                 <option>Pending</option>
//                 <option>Processing</option>
//                 <option>Confirmed</option>
//                 <option>On the way</option>
//                 <option>Delivered</option>
//                 <option>Cancelled</option>
//               </select>
//             </div>
//           </div>
//           <ul className="pl-4 list-disc text-sm mt-3">
//             {order.items.map(item => (
//               <li key={item._id}>
//                 {item.name} × {item.quantity} — ₦{(item.price * item.quantity).toFixed(2)}
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AdminOrdersPage;

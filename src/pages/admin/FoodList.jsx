import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const FoodList = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingDeleteId, setPendingDeleteId] = useState(null);

  const fetchFoods = async () => {
    try {
      const res = await axios.get('http://localhost:5005/api/foodItems', {
        withCredentials: true,
      });
      setFoods(res.data.foodItems);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load food items ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleDelete = (id) => {
    setPendingDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5005/api/foodItems/${pendingDeleteId}`, {
        withCredentials: true,
      });
      toast.success("Item deleted successfully ✅");
      setShowConfirm(false);
      fetchFoods();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete item ❌");
    }
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setPendingDeleteId(null);
  };


  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Food Items</h1>
        <Link to="/admin/foods/new" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add New Food
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {foods.map((food) => (
          <div key={food._id} className="border rounded-lg p-4 shadow">
            <img
              src={food.images?.[0]?.url || '/placeholder.jpg'}
              alt={food.name}
              className="w-full h-48 object-cover mb-3"
            />
            <h3 className="font-bold">{food.name}</h3>
            <p className="text-gray-600 text-sm">{food.description}</p>
            <div className="mt-4 flex justify-between">
             <Link to={`/admin/foods/edit/${food._id}`} className="text-blue-500 hover:underline">
  Edit
</Link>
              <button
                onClick={() => handleDelete(food._id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p>Are you sure you want to delete this item?</p>
            <div className="flex justify-end mt-4">
              <button onClick={cancelDelete} className="mr-4 text-gray-600">Cancel</button>
              <button onClick={confirmDelete} className="bg-red-500 text-white px-4 py-2 rounded">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodList;

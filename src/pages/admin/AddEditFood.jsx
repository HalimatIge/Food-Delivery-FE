import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AddEditFood = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ 
    name: '', 
    price: '', 
    category: '', 
    description: '',
    available: true,
    images: [] // Changed to array to support multiple images
  });
  const [imageFiles, setImageFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const { user, authLoading } = useAuth();

  const categories = ['main', 'appetizer', 'dessert', 'beverage', 'special'];

  useEffect(() => {
    if (id) {
      fetchFoodItem();
    }
  }, [id]);

  // const fetchFoodItem = async () => {
  //   try {
  //     setIsLoading(true);
  //     const res = await axios.get(`http://localhost:5005/api/foodItems/${id}`);
  //     setForm({
  //       name: res.data.name,
  //       price: res.data.price,
  //       category: res.data.category,
  //       description: res.data.description,
  //       available: res.data.available,
  //       images: res.data.images || [] // Handle existing images
  //     });
  //   } catch (err) {
  //     console.error('Error fetching food item:', err);
  //     setError('Failed to load food item');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };



//   const fetchFoodItem = async () => {
//   try {
//     setIsLoading(true);
//     const res = await axios.get(`http://localhost:5005/api/foodItems/${id}`, {
//       withCredentials: true
//     });

//     console.log("Fetched food item:", res.data); // Check this

//     if (res.data) {
//       setForm({
//         name: res.data.name || '',
//         price: res.data.price || '',
//         category: res.data.category || '',
//         description: res.data.description || '',
//         available: res.data.available ?? true,
//         images: res.data.images || [],
//         imagePreviews: [],
//       });
//     } else {
//       setError('No food data found');
//     }
//   } catch (err) {
//     console.error('Error fetching food item:', err);
//     setError('Failed to load food item');
//   } finally {
//     setIsLoading(false);
//   }
// };



  const fetchFoodItem = async () => {
  try {
    setIsLoading(true);
    const res = await axios.get(`http://localhost:5005/api/foodItems/${id}`, {
      withCredentials: true,
    });

    const food = res.data.foodItem; // ✅ Access foodItem

    setForm({
      name: food.name || '',
      price: food.price || '',
      category: food.category || '',
      description: food.description || '',
      available: food.available ?? true,
      images: food.images || [],
      imagePreviews: [],
    });
  } catch (err) {
    console.error("Error fetching food item:", err);
    setError("Failed to load food item");
  } finally {
    setIsLoading(false);
  }
};


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      setImageFiles(files);
      
      // Create previews for all selected images
      const readers = files.map(file => {
        const reader = new FileReader();
        return new Promise((resolve) => {
          reader.onload = (event) => resolve(event.target.result);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readers).then(previews => {
        setForm(prev => ({ 
          ...prev, 
          imagePreviews: previews 
        }));
      });
    }
  };

  const removeImage = (index) => {
    const newFiles = [...imageFiles];
    const newPreviews = [...form.imagePreviews];
    
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setImageFiles(newFiles);
    setForm(prev => ({ ...prev, imagePreviews: newPreviews }));
  };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);
    
//     try {
//       const formData = new FormData();
      
//       // Append text fields
// //      Object.keys(form).forEach(key => {
// //   if (key !== 'imagePreviews' && key !== 'images') {
// //     const value = form[key];
// //     formData.append(key, typeof value === 'object' ? JSON.stringify(value) : String(value));
// //   }
// // });



// formData.append('name', form.name);
// formData.append('price', String(form.price));
// formData.append('category', form.category);
// formData.append('description', form.description);
// formData.append('available', String(form.available));


      
//       // Append image files if they exist
//       if (imageFiles.length === 0 && form.images.length > 0) {
//   formData.append('existingImages', JSON.stringify(form.images));
// }


//       const config = {
//   headers: {
//     'Content-Type': 'multipart/form-data',
//   },
//   withCredentials: true,
// };


//       if (id) {
//         // For update, include existing images if no new ones are added
//         if (imageFiles.length === 0 && form.images) {
//           formData.append('existingImages', JSON.stringify(form.images));
//         }
//         await axios.put(`http://localhost:5005/api/foodItems/${id}`, formData, config);
//       } else {
//         await axios.post('http://localhost:5005/api/foodItems/add', formData, config);
//       }

//       navigate('/admin/foods');
//     } catch (err) {
//       console.error('Error submitting form:', err);
//       setError(err.response?.data?.message || 'An error occurred');
//     } finally {
//       setIsLoading(false);
//     }
//   };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setError(null);

  try {
    const formData = new FormData();

    // ✅ Append all fields as string
    formData.append('name', form.name);
    formData.append('price', String(form.price));
    formData.append('category', form.category);
    formData.append('description', form.description);
    formData.append('available', String(form.available));

    // ✅ Add new images (if any)
    if (imageFiles.length > 0) {
      imageFiles.forEach((file) => {
        formData.append('images', file);
      });
    }

    // ✅ Append existing images if no new images are added
    if (imageFiles.length === 0 && form.images?.length > 0) {
      formData.append('existingImages', JSON.stringify(form.images));
    }

    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true,
    };

    // ✅ Submit to the correct endpoint
    if (id) {
      await axios.put(`http://localhost:5005/api/foodItems/${id}`, formData, config);
    } else {
      await axios.post('http://localhost:5005/api/foodItems/add', formData, config);
    }

    navigate('/admin/foods');
  } catch (err) {
    console.error('Error submitting form:', err);
    setError(err.response?.data?.message || 'An error occurred');
  } finally {
    setIsLoading(false);
  }
};


  if (authLoading) return <p>Loading...</p>;
  if (!user || user.role !== 'admin') return <Navigate to="/login" replace />;

  if (id && isLoading) return <div className="text-center py-8">Loading food item...</div>;
  if (id && error) return <div className="text-center py-8 text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#FF4C29]">
          {id ? 'Edit Food Item' : 'Add New Food Item'}
        </h1>
        <button 
          onClick={() => navigate('/admin/foods')}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded transition"
        >
          Back to List
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
        
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Food Name</label>
            <input 
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              className="w-full border p-2 rounded" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              Food Images {!id && '(At least one required)'}
            </label>
            <input 
              type="file" 
              name="images"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="w-full border p-2 rounded"
              multiple
              required={!id && imageFiles.length === 0}
            />
            <p className="text-xs text-gray-500 mt-1">
              You can upload multiple images (JPEG, PNG)
            </p>
            
            {/* Image previews */}
            <div className="mt-4 grid grid-cols-3 gap-2">
              {/* Existing images */}
              {form.images?.map((img, index) => (
                <div key={`existing-${index}`} className="relative">
                  <img 
                    src={img.url} 
                    alt={`Preview ${index}`} 
                    className="h-24 w-full object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const updatedImages = [...form.images];
                      updatedImages.splice(index, 1);
                      setForm(prev => ({ ...prev, images: updatedImages }));
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
              
              {/* New image previews */}
              {form.imagePreviews?.map((preview, index) => (
                <div key={`new-${index}`} className="relative">
                  <img 
                    src={preview} 
                    alt={`Preview ${index}`} 
                    className="h-24 w-full object-cover rounded border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Price ($)</label>
            <input 
              name="price" 
              type="number" 
              value={form.price} 
              onChange={handleChange} 
              className="w-full border p-2 rounded" 
              min="0"
              step="0.01"
              required 
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select 
              name="category" 
              value={form.category} 
              onChange={handleChange} 
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center">
            <input 
              type="checkbox" 
              id="available"
              name="available"
              checked={form.available}
              onChange={(e) => setForm({...form, available: e.target.checked})}
              className="mr-2"
            />
            <label htmlFor="available">Available</label>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea 
              name="description" 
              value={form.description} 
              onChange={handleChange} 
              className="w-full border p-2 rounded" 
              rows="3"
              required 
            />
          </div>
          
          <button 
            type="submit" 
            className="bg-[#FF4C29] text-white rounded-lg p-3 hover:bg-[#e04427] transition mt-4"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : id ? 'Update Food' : 'Add Food'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEditFood;


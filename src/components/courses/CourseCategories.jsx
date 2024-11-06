import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const CourseCategories = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editCategory, setEditCategory] = useState(null); // To handle the category being edited
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch categories from the API with credentials
    axios
      .get("http://localhost:8080/api/categories", { withCredentials: true }) // Add withCredentials
      .then((response) => {
        setFilteredCategories(response.data); // assuming the API returns an array of categories
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setError("Failed to load categories");
        setLoading(false);
      });
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = filteredCategories.filter(
      (category) =>
        category.Category_Name.toLowerCase().includes(term) ||
        category.short_Description.toLowerCase().includes(term)
    );
    setFilteredCategories(filtered);
  };

  const handleDelete = (id) => {
    // Confirm deletion
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    // Send delete request to API with credentials
    axios
      .delete(`http://localhost:8080/api/categories/${id}`, { withCredentials: true }) // Add withCredentials
      .then(() => {
        // On success, update the UI
        const updatedCategories = filteredCategories.filter((category) => category._id !== id); // Use _id or whichever key represents the category's ID in your database
        setFilteredCategories(updatedCategories);
      })
      .catch((error) => {
        console.error("Error deleting category:", error.response ? error.response.data : error.message);
        setError("Failed to delete category");
      });
  };

  const handleEdit = (id) => {
  navigate(`/editcoursecat/${id}`) // Set the category to be edited
  };

  // const handleUpdate = (updatedData) => {
  //   const { _id } = updatedData;
  //   axios
  //     .put(`http://localhost:8080/api/categories/${_id}`, updatedData, { withCredentials: true }) // Add withCredentials
  //     .then(() => {
  //       // Update the local state with the updated category
  //       const updatedCategories = filteredCategories.map((category) =>
  //         category._id === _id ? { ...category, ...updatedData } : category
  //       );
  //       setFilteredCategories(updatedCategories);
  //       setEditCategory(null); // Clear the edit form
  //     })
  //     .catch((error) => {
  //       console.error("Error updating category:", error.response ? error.response.data : error.message);
  //       setError("Failed to update category");
  //     });
  // };

  const isAddCategoryPage = location.pathname.includes("addcategory");

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {!isAddCategoryPage && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-100 cursor-pointer">Course Categories</h2>
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search categories..."
                  className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
              <Link to="addcategory">
                <button className="bg-blue-600 hover:bg-blue-500 hidden md:block text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
                  Add Category
                </button>
              </Link>
            </div>
          </div>

          {loading ? (
            <p className="text-gray-100">Loading categories...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {filteredCategories.map((category) => (
                    <motion.tr
                      key={category._id} // Ensure to use _id or appropriate key here
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-100">{category.Category_Name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{category.short_Description.slice(0,50)}...</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            category.status ? "bg-green-800 text-green-100" : "bg-red-800 text-red-100"
                          }`}
                        >
                          {category.status ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        <button
                          className="text-indigo-400 hover:text-indigo-300 mr-2"
                          onClick={() => handleEdit(category._id)} // Open the edit form
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-400 hover:text-red-300"
                          onClick={() => handleDelete(category._id)} // Ensure to use _id or appropriate key here
                        >
                          Delete
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {editCategory && (
        <div className="mt-4">
          <h3 className="text-xl text-gray-100">Edit Category</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(editCategory); // Pass updated data to the update handler
            }}
            className="bg-gray-700 p-4 rounded-lg"
          >
            <div className="mb-4">
              <label className="block text-gray-400">Category Name</label>
              <input
                type="text"
                value={editCategory.Category_Name}
                onChange={(e) => setEditCategory({ ...editCategory, Category_Name: e.target.value })}
                className="bg-gray-600 text-white placeholder-gray-400 rounded-lg pl-2 pr-4 py-2 w-full"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400">Short Description</label>
              <textarea
                value={editCategory.short_Description}
                onChange={(e) => setEditCategory({ ...editCategory, short_Description: e.target.value })}
                className="bg-gray-600 text-white placeholder-gray-400 rounded-lg pl-2 pr-4 py-2 w-full"
                rows="3"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-400">Status</label>
              <select
                value={editCategory.status ? "active" : "inactive"}
                onChange={(e) => setEditCategory({ ...editCategory, status: e.target.value === "active" })}
                className="bg-gray-600 text-white placeholder-gray-400 rounded-lg pl-2 pr-4 py-2 w-full"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
            >
              Update Category
            </button>
            <button
              type="button"
              onClick={() => setEditCategory(null)} // Clear the edit form
              className="bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 ml-4"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <Outlet />
    </motion.div>
  );
};

export default CourseCategories;

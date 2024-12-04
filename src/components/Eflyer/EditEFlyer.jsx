import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../common/Header";

const EditEFlyer = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // State for eFlyer details
  const [eFlyer, setEFlyer] = useState({
    category: "", // ObjectId of the selected category
    course: "",   // ObjectId of the selected course
    flyerFile: "",
    status: "Active", // Default status
  });

  // State for available categories and courses
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);

  // Fetch eFlyer, categories, and courses on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch eFlyer details
        const eflyerResponse = await axios.get(`http://localhost:8080/api/eflyer/${id}`);
        const eflyerData = eflyerResponse.data;
        
        setEFlyer({
          category: eflyerData.category._id, // Use ObjectId
          course: eflyerData.course._id,     // Use ObjectId
          flyerFile: eflyerData.flyerFile,
          status: eflyerData.status ? "Active" : "Inactive",
        });

        // Fetch all categories and courses
        const [categoriesResponse, coursesResponse] = await Promise.all([
          axios.get("http://localhost:8080/api/categories"),
          axios.get("http://localhost:8080/api/courses"),
        ]);

        setCategories(categoriesResponse.data);
        setCourses(coursesResponse.data);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedEFlyer = {
        category: eFlyer.category, // Send ObjectId
        course: eFlyer.course,     // Send ObjectId
        flyerFile: eFlyer.flyerFile,
        status: eFlyer.status === "Active", // Convert status to boolean
      };

      const response = await axios.put(`http://localhost:8080/api/eflyer/${id}`, updatedEFlyer, { withCredentials: true });
      console.log("Updated eFlyer Response:", response);
      alert("eFlyer updated successfully!");
      navigate("/eflayer"); // Redirect after successful update
    } catch (error) {
      console.error("Error updating eFlyer:", error);
      alert("Failed to update eFlyer");
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEFlyer((prevEFlyer) => ({
      ...prevEFlyer,
      [name]: value,
    }));
  };

  return (
    <div className="w-full">
      <Header />
      <div className="flex justify-center items-center my-5 bg-gray-900 overflow-auto">
        <div className="bg-gray-800 bg-opacity-80 backdrop-blur-md shadow-lg rounded-xl p-8 border border-gray-700 w-full max-w-lg">
          <h2 className="text-2xl font-semibold text-gray-100 mb-6">Edit eFlyer</h2>
          <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto max-h-[500px]">
            {/* Category Dropdown */}
            <div className="mb-4">
              <label className="block text-gray-300">Category</label>
              <select
                name="category"
                value={eFlyer.category}
                onChange={handleChange}
                required
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-blue-500 focus:outline-none"
              >
                <option value="" disabled>Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.Category_Name}
                  </option>
                ))}
              </select>
            </div>

            {/* Course Dropdown */}
            <div className="mb-4">
              <label className="block text-gray-300">Course</label>
              <select
                name="course"
                value={eFlyer.course}
                onChange={handleChange}
                required
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-blue-500 focus:outline-none"
              >
                <option value="" disabled>Select Course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.course_Name}
                  </option>
                ))}
              </select>
            </div>

            {/* Flyer File */}
            <div className="mb-4">
              <label className="block text-gray-300">Flyer File URL</label>
              <input
                type="text"
                name="flyerFile"
                value={eFlyer.flyerFile}
                onChange={handleChange}
                required
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-blue-500 focus:outline-none"
              />
            </div>

            {/* Status */}
            <div className="mb-4">
              <label className="block text-gray-300">Status</label>
              <select
                name="status"
                value={eFlyer.status}
                onChange={handleChange}
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-blue-500 focus:outline-none"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 rounded-lg transition duration-200"
            >
              Update eFlyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditEFlyer;

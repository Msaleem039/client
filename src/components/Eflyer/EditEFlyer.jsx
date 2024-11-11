import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../common/Header";

const EditEFlyer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State to hold eFlyer details
  const [eFlyer, setEFlyer] = useState({
    category: "", // Hold category name (or relevant field)
    course: "",   // Hold course name (or relevant field)
    flyerFile: "",
    status: "Active", // Default status
  });

  // Fetch eFlyer data when the component mounts
  useEffect(() => {
    const fetchEFlyer = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/eflyer/${id}`);
        console.log("Fetched eFlyer:", response.data); // Check if the data is being fetched correctly
        setEFlyer({
          category: response.data.category.Category_Name,
          course: response.data.course.course_Name,
          flyerFile: response.data.flyerFile,
          status: response.data.status ? "Active" : "Inactive",
        });
      } catch (error) {
        console.error("Error fetching eFlyer:", error);
      }
    };
    fetchEFlyer();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedEFlyer = {
        category: eFlyer.category,
        course: eFlyer.course,
        flyerFile: eFlyer.flyerFile,
        status: eFlyer.status === "Active" ? true : false,
      };
      
      const response = await axios.put(`http://localhost:8080/api/eflyer/${id}`, updatedEFlyer, { withCredentials: true });
      console.log("Updated eFlyer Response:", response);
      alert("eFlyer updated successfully!");
      navigate("/eflyers"); // Redirect to eFlyer list after successful update
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
          <form onSubmit={handleSubmit} className="space-y-4 overflow-y-auto max-h-[500px]"> {/* Added scrollable area */}
            <div className="mb-4">
              <label className="block text-gray-300">Category</label>
              <input
                type="text"
                name="category"
                value={eFlyer.category}
                onChange={handleChange}
                required
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-300">Course</label>
              <input
                type="text"
                name="course"
                value={eFlyer.course}
                onChange={handleChange}
                required
                className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600 focus:ring focus:ring-blue-500 focus:outline-none"
              />
            </div>
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

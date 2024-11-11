import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditFaq = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  
  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/faqcat/${id}`)
      .then((response) => {
        setCategoryName(response.data.categoryName);
      })
      .catch((error) => console.error("Error fetching category:", error));
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8080/api/faqcat/${id}`, {
        categoryName,
      });
      navigate("/faqs"); // Redirect after update
    } catch (error) {
      console.error("Error updating FAQ category:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl w-full">
      <h2 className="text-2xl font-semibold text-gray-100 mb-5">Edit FAQ Category</h2>
      <div className="mb-4">
        <label className="block text-gray-300 mb-2">Category Name</label>
        <input
          type="text"
          className="w-full p-2 bg-gray-700 text-white rounded-lg focus:outline-none"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
      </div>
      <button
        onClick={handleUpdate}
        className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditFaq;

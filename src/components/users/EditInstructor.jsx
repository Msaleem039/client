import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditInstructor = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [instructor, setInstructor] = useState(null);

  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/instructors/${userId}`);
        console.log("Fetched Instructor Data:", response.data);
        
        // Check if response.data contains instructor data directly or within a nested object
        setInstructor(response.data.data); // Set instructor directly to response.data
      } catch (error) {
        console.error('Error fetching instructor:', error.response ? error.response.data : error.message);
      }
    };
    fetchInstructor();
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/api/instructors/${userId}`, instructor, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true
      });
      alert('Instructor updated successfully!');
      navigate('/users');
    } catch (error) {
      console.error('Error updating instructor:', error.response ? error.response.data : error.message);
      alert('Failed to update instructor. Reason: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInstructor((prevInstructor) => ({
      ...prevInstructor,
      [name]: value,
    }));
  };

  if (!instructor) {
    return <p>Loading...</p>;
  }

  return (
    <div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 w-full'>
      <h2 className='text-2xl font-semibold text-gray-100 mb-5'>Edit Instructor</h2>
      <form onSubmit={handleSubmit}>

        <div className='mb-4'>
          <label className='block text-gray-300'>Instructor Name</label>
          <input
            type='text'
            name='name'
            value={instructor.name || ''}            
            onChange={handleChange}
            required
            className='w-full p-2 rounded bg-gray-700 text-white'
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-300'>Upload Image</label>
          <input
            type='text'
            name='photo'
            value={instructor.photo || ''}
            onChange={handleChange}
            required
            className='w-full p-2 rounded bg-gray-700 text-white'
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-300'>Instructor Profile</label>
          <textarea
            name='other_info'
            value={instructor.other_info || ''}
            onChange={handleChange}
            className='w-full p-2 rounded bg-gray-700 text-white'
            placeholder="Write profile description"
            required
          />
        </div>

        <div className='mb-4'>
          <label className='block text-gray-300'>Is View on Web?</label>
          <select
            name='in_View'
            value={instructor.in_View || 'No'}
            onChange={handleChange}
            className='w-full p-2 rounded bg-gray-700 text-white'
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>

        <button type='submit' className='bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg'>
          Update Instructor
        </button>
      </form>
    </div>
  );
};

export default EditInstructor;

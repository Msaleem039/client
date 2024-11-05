import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditCourse = () => {
  // const { id } = useParams(); // Get the course ID from the URL
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [course, setCourse] = useState({
    course_Name: '',
    Short_Description: '',
    course_Image: '',
    status: 'Active', // Default value
  });

  // Fetch the course data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/courses/${courseId}`);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    };
    fetchCourse();
  }, [courseId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/api/courses/${courseId}`, course, { withCredentials: true });
      alert('Course updated successfully!');
      navigate('/courses'); // Redirect to the courses list after updating
    } catch (error) {
      console.error('Error updating course:', error);
      alert('Failed to update course');
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  return (
    <div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 w-full'>
      <h2 className='text-2xl font-semibold text-gray-100 mb-5'>Edit Course</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-gray-300'>Course Name</label>
          <input
            type='text'
            name='course_Name'
            value={course.course_Name}
            onChange={handleChange}
            required
            className='w-full p-2 rounded bg-gray-700 text-white'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-300'>Short Description</label>
          <input
            type='text'
            name='Short_Description'
            value={course.Short_Description}
            onChange={handleChange}
            required
            className='w-full p-2 rounded bg-gray-700 text-white'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-300'>Course Image URL</label>
          <input
            type='text'
            name='course_Image'
            value={course.course_Image}
            onChange={handleChange}
            required
            className='w-full p-2 rounded bg-gray-700 text-white'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-300'>Status</label>
          <select
            name='status'
            value={course.status}
            onChange={handleChange}
            className='w-full p-2 rounded bg-gray-700 text-white'
          >
            <option value='Active'>Active</option>
            <option value='Inactive'>Inactive</option>
          </select>
        </div>
        <button type='submit' className='bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg'>
          Update Course
        </button>
      </form>
    </div>
  );
};

export default EditCourse;

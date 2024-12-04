import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../common/Header";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditCourse = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [course, setCourse] = useState({
    course_Name: "",
    Short_Description: "",
    course_Image: "",
    status: "Active",
    Admission_Fee: "",
    Brochure: "",
    Course_Description: "",
    Custom_Canonical_Url: "",
    Duration_Day: "",
    Duration_Months: "",
    In_Sitemap: false,
    Instructor: "",
    Meta_Description: "",
    Meta_Title: "",
    Monthly_Fee: "",
    Page_Index: false,
    Skill_Level: "",
    View_On_Web: false,
    url_Slug: "",
    video_Id: "",
    course_Category: "",
  });
console.log(course)
  const [categories, setCategories] = useState([]);
  const [brochureFile, setBrochureFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courseResponse, categoriesResponse] = await Promise.all([
          axios.get(`http://localhost:8080/api/courses/${courseId}`),
          axios.get(`http://localhost:8080/api/categories`),
        ]);
        setCourse(courseResponse.data);
        setCategories(categoriesResponse.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    if (courseId) fetchData();
  }, [courseId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    for (const key in course) {
      if (key === "course_Category") {
        formData.append(key, course.course_Category._id || course.course_Category);
      } else {
        formData.append(key, course[key]);
      }
    }
    if (brochureFile) formData.append("Brochure", brochureFile);
    try {
      await axios.put(`http://localhost:8080/api/courses/${courseId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Course updated successfully!");
      navigate("/courses");
    } catch (error) {
      console.error("Error updating course:", error);
      alert("Failed to update course");
    }
  };
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  // const handleCategoryChange = (e) => {
  //   const selectedCategory = categories.find((cat) => cat._id === e.target.value);
  //   setCourse((prevCourse) => ({
  //     ...prevCourse,
  //     course_Category: selectedCategory || e.target.value,
  //   }));
  // };
  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="w-full overflow-y-auto">
      <Header />
      <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border my-10 border-gray-700 max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold text-gray-100 mb-5">Edit Course</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/** Render All Fields **/}
          <div className="mb-4">
            <label className="block text-gray-300">Course Name</label>
            <input
              type="text"
              name="course_Name"
              value={course.course_Name}
              onChange={handleChange}
              required
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Short Description</label>
            <textarea
              name="Short_Description"
              value={course.Short_Description}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Course Image URL</label>
            <input
              type="text"
              name="course_Image"
              value={course.course_Image}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Video ID</label>
            <input
              type="text"
              name="video_Id"
              value={course.video_Id}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Skill Level</label>
            <input
              type="text"
              name="Skill_Level"
              value={course.Skill_Level}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Instructor</label>
            <input
              type="text"
              name="Instructor"
              value={course.Instructor}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Admission Fee</label>
            <input
              type="number"
              name="Admission_Fee"
              value={course.Admission_Fee}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Duration (Months)</label>
            <input
              type="number"
              name="Duration_Months"
              value={course.Duration_Months}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Duration (Days)</label>
            <input
              type="number"
              name="Duration_Day"
              value={course.Duration_Day}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Meta Title</label>
            <input
              type="text"
              name="Meta_Title"
              value={course.Meta_Title}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Meta Description</label>
            <textarea
              name="Meta_Description"
              value={course.Meta_Description}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Custom Canonical URL</label>
            <input
              type="text"
              name="Custom_Canonical_Url"
              value={course.Custom_Canonical_Url}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Brochure</label>
            <input
              type="file"
              name="Brochure"
              onChange={(e) => setBrochureFile(e.target.files[0])}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300">Course Description</label>
            <ReactQuill
              value={course.Course_Description}
              onChange={(content) =>
                setCourse((prev) => ({ ...prev, Course_Description: content }))
              }
              theme="snow"
              className="text-gray-700 bg-white rounded-md"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg"
          >
            Update Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditCourse;

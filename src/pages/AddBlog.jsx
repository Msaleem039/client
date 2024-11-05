import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/common/Header";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const AddBlog = () => {
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm();
  const [categories, setCategories] = useState([]); // State to hold categories
  const navigate = useNavigate();

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/blogcate');
        console.log('Fetched Categories:', response.data); // Log fetched categories
        setCategories(response.data); // Assuming response.data is an array of categories
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array means this runs once when the component mounts

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      const requestData = {
        postTitle: data.postTitle,
        urlSlug: data.urlSlug,
        postCategory: data.postCategory,
        postThumbImage: data.postThumbImage,
        shortDescription: data.shortDescription,
        postDescription: data.postDescription,
        isPublish: data.isPublish || false, // Default to false if not provided
        featured: data.featured || false, // Default to false if not provided
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        inSitemap: data.inSitemap || false, // Default to false if not provided
        pageIndex: data.pageIndex || false, // Default to false if not provided
        customCanonicalUrl: data.customCanonicalUrl,
      };
      console.log(requestData);
      const res = await axios.post('http://localhost:8080/api/blogpost', requestData);
      if (res.status === 200) {
        console.log('Blog added successfully', res.data);
        navigate("/blogs"); // Navigate back to blogs after successful submission
      } else {
        console.error('Error adding blog', res.data);
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="w-full overflow-y-auto">
      <Header />
      <div className='p-6 bg-gray-800 rounded-lg shadow-md max-w-lg mx-auto mt-10'>
        <h2 className='text-3xl font-semibold text-gray-100 mb-6 text-center'>Add Blog</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Post Title */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Post Title*</label>
            <input
              type='text'
              {...register("postTitle", { required: true })}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter post title"
            />
            {errors.postTitle && <span className="text-red-500">Post Title is required</span>}
          </div>

          {/* URL Slug */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>URL Slug*</label>
            <input
              type='text'
              {...register("urlSlug", { required: true })}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter URL slug"
            />
            {errors.urlSlug && <span className="text-red-500">URL Slug is required</span>}
          </div>

          {/* Post Category */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Post Category*</label>
            <select
              {...register("postCategory", { required: true })}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value="">Select category</option>
              {categories.map(category => (
                <option key={category._id} value={category._id}>{category.categoryName}</option>
              ))}
            </select>
            {errors.postCategory && <span className="text-red-500">Post Category is required</span>}
          </div>

          {/* Post Thumbnail Image */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Post Thumbnail Image*</label>
            <input
              type='file'
              {...register("postThumbImage", { required: true })}
              accept="image/*"
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            {errors.postThumbImage && <span className="text-red-500">Post Thumbnail Image is required</span>}
          </div>

          {/* Short Description */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Short Description*</label>
            <textarea
              {...register("shortDescription", { required: true })}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter short description"
            />
            {errors.shortDescription && <span className="text-red-500">Short Description is required</span>}
          </div>

          {/* Post Description */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Post Description*</label>
            <CKEditor
              editor={ClassicEditor}
              data={watch('postDescription') || ''} // Setting the initial value
              onReady={(editor) => {
                console.log('Editor is ready to use!', editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setValue('postDescription', data); // Update form state
              }}
            />
            {errors.postDescription && <span className="text-red-500">Post Description is required</span>}
          </div>

          {/* Publish Status */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Publish</label>
            <input
              type="checkbox"
              {...register("isPublish")}
              className='mr-2'
            />
          </div>

          {/* Featured Status */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Featured</label>
            <input
              type="checkbox"
              {...register("featured")}
              className='mr-2'
            />
          </div>

          {/* Meta Title */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Meta Title</label>
            <input
              type='text'
              {...register("metaTitle")}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter meta title"
            />
          </div>

          {/* Meta Description */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Meta Description</label>
            <textarea
              {...register("metaDescription")}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter meta description"
            />
          </div>

          {/* In Sitemap */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>In Sitemap</label>
            <input
              type="checkbox"
              {...register("inSitemap")}
              className='mr-2'
            />
          </div>

          {/* Page Index */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Page Index</label>
            <input
              type="checkbox"
              {...register("pageIndex")}
              className='mr-2'
            />
          </div>

          {/* Custom Canonical URL */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Custom Canonical URL</label>
            <input
              type='text'
              {...register("customCanonicalUrl")}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter custom canonical URL"
            />
          </div>

          <button
            type='submit'
            className='w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 focus:outline-none'
          >
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBlog;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null); // event state initialized to null

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/events/${id}`)
      .then((response) => setEvent(response.data))
      .catch((error) => console.error("Error fetching event:", error));
  }, [id]);

  if (!event) {
    return <div>Loading...</div>; // Add loading state until event data is fetched
  }

  return (
    <div className="container mx-auto p-6 bg-gray-800 rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-4">Event Details</h2>
      
      <table className="min-w-full table-auto text-left text-gray-300">
        <thead>
          <tr className="bg-gray-700">
            <th className="px-4 py-2">Field</th>
            <th className="px-4 py-2">Details</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 font-semibold">Title</td>
            <td className="px-4 py-2">{event.title}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold">Category</td>
            <td className="px-4 py-2">{event.category.name}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold">Description</td>
            <td className="px-4 py-2">{event.description}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold">Image</td>
            <td className="px-4 py-2">
              <img
                src={`http://localhost:8080/${event.image.replace(/\\/g, '/')}`}
                alt={event.title}
                className="w-32 h-32 object-cover mt-2"
              />
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold">Meta Title</td>
            <td className="px-4 py-2">{event.metaTitle}</td>
          </tr>
          <tr>
            <td className="px-4 py-2 font-semibold">Meta Description</td>
            <td className="px-4 py-2">{event.metaDescription}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EventDetail;

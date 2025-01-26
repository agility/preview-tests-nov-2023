"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import DashboardHeader from "../../../components/sections/admin/DashboardHeader";

// Define types for destinations
interface Destination {
  id: number;
  name: string;
  description: string;
  location: string;
  imageUrl: string;
}

const AdminDestinations = (props) => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    location: "",
    imageUrl: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get("/api/destinations");
        setDestinations(response.data);
      } catch (error) {
        console.error("Error fetching destinations", error);
      }
    };

    fetchDestinations();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { name, description, location, imageUrl } = formData;

    try {
      if (editingId) {
        await axios.put(`/api/destinations/${editingId}`, {
          name,
          description,
          location,
          imageUrl,
        });
        alert("Destination Updated Successfully!");
      } else {
        await axios.post("/api/destinations", {
          name,
          description,
          location,
          imageUrl,
        });
        alert("Destination Created Successfully!");
      }

      setFormData({
        name: "",
        description: "",
        location: "",
        imageUrl: "",
      });
      setEditingId(null);
      const response = await axios.get("/api/destinations");
      setDestinations(response.data);
    } catch (error) {
      console.error("Error submitting destination", error);
    }
  };

  const handleEdit = (destination: Destination) => {
    setFormData({
      name: destination.name,
      description: destination.description,
      location: destination.location || "",
      imageUrl: destination.imageUrl,
    });
    setEditingId(destination.id);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/destinations/${id}`);
      setDestinations(
        destinations.filter((destination) => destination.id !== id)
      );
      alert("Destination deleted successfully!");
    } catch (error) {
      console.error("Error deleting destination", error);
      alert("Failed to delete the destination. Please try again.");
    }
  };

  return (
    <>
      <DashboardHeader />
      <div className="pt-20 p-8 bg-blue-300 min-h-screen">
        <div className="text-3xl font-bold text-center mb-8">
          Admin Dashboard - Destinations
        </div>

        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-semibold">Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Description:</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Location:</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-6">
              <label className="block font-semibold">Image URL:</label>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
            >
              {editingId ? "Update" : "Create"} Destination
            </button>
          </form>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Existing Destinations</h2>
          <ul className="space-y-6">
            {destinations.map((destination) => (
              <li
                key={destination.id}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <div>
                  <h3 className="text-2xl font-semibold">{destination.name}</h3>
                  <p>{destination.description}</p>
                  <p className="italic text-gray-600">{destination.location}</p>
                  <img
                    src={`/images/${destination.imageUrl}`}
                    alt={destination.name}
                    className="mt-4 w-32 h-32 object-cover rounded-md"
                  />
                </div>
                <div className="mt-4 flex space-x-4">
                  <button
                    onClick={() => handleEdit(destination)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(destination.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default AdminDestinations;

"use client";

import DashboardHeader from "../../../components/sections/admin/DashboardHeader";
import { useState, useEffect } from "react";
import axios from "axios";

// Define types for users
interface User {
  username: string;
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
}

const AdminUsers = (props: any) => {
  // State to manage users and form fields
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  // Fetch all users when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("/api/users");
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users", error);
      }
    };

    fetchUsers();
  }, []);

  // Handle form field change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit for creating or updating users
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { username, name, email, password, role } = formData;

    try {
      await axios.post("/api/users", {
        username,
        name,
        email,
        password,
        role,
      });
      alert("User created successfully!");
    } catch (error) {
      console.error(error);
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };
  // Handle edit button click
  const handleEdit = (user: User) => {
    setFormData({
      username: user.username,
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    });
    setEditingId(user.id);
  };

  // Handle delete button click
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user", error);
      alert("Failed to delete the user. Please try again.");
    }
  };

  return (
    <>
      <DashboardHeader />
      <div className="pt-20 p-5 bg-blue-300 min-h-screen">
        <div className="text-3xl font-bold text-center mb-8">
          Admin Dashboard - Users
        </div>

        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block font-semibold">Username:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
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
              <label className="block font-semibold">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block font-semibold">Role:</label>
              <select
                name="role"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full p-3 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Role</option>
                <option value="admin">Admin</option>
                <option value="client">Client</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-300"
            >
              {editingId ? "Update" : "Create"} User
            </button>
          </form>
        </div>

        {/* List of users */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Existing Users</h2>
          <ul className="space-y-4">
            {users.map((user) => (
              <li
                key={user.id}
                className="bg-white p-4 rounded-md shadow-md flex justify-between items-center"
              >
                <div>
                  <p className="font-bold">{user.username}</p>
                  <p>{user.email}</p>
                  <p className="text-sm text-gray-600">{user.role}</p>
                </div>
                <div className="space-x-2">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md"
                    onClick={() => handleDelete(user.id)}
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

export default AdminUsers;

import React, { useState } from "react";
import axios from "axios";

const ListCar = () => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    price: "",
    transmission: "Automatic",
    seats: 5,
    fuelType: "Gasoline",
    image: '../assets/images/carplaceholder.jpg',
    category: "Standard",
    description: "",
    location: "",
    phone: "+20 123-456-781-9",
    licensePlate: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("You must be logged in to list a car.");
        return;
      }

      // const response = await axios.post(
      //   "http://localhost:5112/api/car",
      //   formData,
      //   { headers: { Authorization: `Bearer ${token}` } }
      // );

      setMessage("Car listed successfully!");
      setFormData({
        brand: "",
        model: "",
        year: "",
        price: "",
        transmission: "Automatic",
        seats: 5,
        fuelType: "Gasoline",
        image: "",
        category: "Standard",
        description: "",
        location: "Helwan",
        phone: "",
        licensePlate: "",
      });
    } catch (error) {
      console.error("Error listing car:", error.response?.data);
      setMessage(error.response?.data?.error || "Failed to list the car.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">List Your Car for Rent</h2>
      {message && <p className="text-center text-green-500">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Brand</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Model</label>
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Year</label>
          <input
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price (per day)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          >
            <option value="Thrissur">Thrissur</option>
            <option value="Irinjalakuda">Irinjalakuda</option>
            <option value="Chalakudy">Chalakudy</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone number</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">license</label>
          <input
            type="text"
            name="licensePlate"
            value={formData.licensePlate}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows="3"
          ></textarea>
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          List Car
        </button>
      </form>
    </div>
  );
};

export default ListCar;
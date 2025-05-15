import React, { useState } from "react";
import axios from "axios";

const ListCar = () => {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    year: "",
    pricePerDay: "",
    transmission: "Automatic",
    seats: 5,
    fuelType: "Gasoline",
    imageUrl: "", // Changed from relative path to string field
    category: "Standard",
    description: "",
    location: "Thrissur",
    phone: "+20 123-456-781-9",
    licensePlate: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("You must be logged in to list a car.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5112/api/car",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage("✅ Car listed successfully!");
      setFormData({
        brand: "",
        model: "",
        year: "",
        pricePerDay: "",
        transmission: "Automatic",
        seats: 5,
        fuelType: "Gasoline",
        imageUrl: "",
        category: "Standard",
        description: "",
        location: "Thrissur",
        phone: "+20 123-456-781-9",
        licensePlate: "",
      });
    } catch (error) {
      console.error("Error listing car:", error.response?.data);
      setMessage(error.response?.data?.error || " Failed to list the car.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">List Your Car for Rent</h2>
      {message && (
        <p
          className={`text-center mb-4 ${message.startsWith("✅") ? "text-green-600" : "text-red-500"
            }`}
        >
          {message}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        {[
          { label: "Brand", name: "brand", type: "text" },
          { label: "Model", name: "model", type: "text" },
          { label: "Year", name: "year", type: "number" },
          { label: "Price (per day)", name: "pricePerDay", type: "number" },
          { label: "Phone number", name: "phone", type: "text" },
          { label: "License Plate", name: "licensePlate", type: "text" },
          { label: "Image URL", name: "imageUrl", type: "text" },
        ].map(({ label, name, type }) => (
          <div className="mb-4" key={name}>
            <label className="block text-gray-700">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        ))}

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
          <label className="block text-gray-700">Transmission</label>
          <select
            name="transmission"
            value={formData.transmission}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Fuel Type</label>
          <select
            name="fuelType"
            value={formData.fuelType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Gasoline">Gasoline</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Standard">Standard</option>
            <option value="SUV">SUV</option>
            <option value="Luxury">Luxury</option>
            <option value="Mini">Mini</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Seats</label>
          <input
            type="number"
            name="seats"
            value={formData.seats}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            min={1}
            max={9}
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
          />
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded w-full font-semibold"
        >
          List Car
        </button>
      </form>
    </div>
  );
};

export default ListCar;

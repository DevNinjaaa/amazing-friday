import React from "react";
import { Star, Users, Gauge, Snowflake, DoorOpen, Calendar } from "lucide-react";
import carImage from "../assets/images/car-placeholder.jpg";
import axios from "axios";

function CarCard({ car }) {
  const handleBookCar = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to book a car.");
      return;
    }

    try {
      const renterId = localStorage.getItem("userId");
      if (!renterId) {
        alert("User ID not found.");
        return;
      }

      const proposalData = {
        renterId: parseInt(renterId),
        carId: parseInt(car.carId),
        licenseDocumentPath: null,
        proposalDocumentPath: null,
        status: "Pending",
        submittedAt: new Date().toISOString(),
      };

      await axios.post("http://localhost:5112/api/proposal", proposalData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Proposal submitted successfully!");
    } catch (error) {
      const res = error.response;
      if (res?.data?.errors) {
        const messages = Object.entries(res.data.errors)
          .map(([field, msgs]) => `${field}: ${msgs.join(", ")}`)
          .join("\n");
        alert(`Validation failed:\n${messages}`);
      } else {
        alert("Unexpected error: " + (res?.data?.title || error.message));
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md max-w-xs hover:shadow-xl transition">
      {/* Car Image */}
      <img
        src={car.imageUrl || carImage}
        alt={`${car.brand} ${car.model}`}
        className="w-full h-48 object-cover rounded-t-lg"
      />

      {/* Car Details */}
      <div className="px-4 pb-4">
        {/* Title and Description */}
        <div className="mb-2">
          <h2 className="text-lg font-bold">
            {car.brand} {car.model} ({car.year || "N/A"})
          </h2>
          <p className="text-sm text-gray-600">{car.description}</p>
        </div>

        {/* Features */}
        <div className="flex flex-wrap text-gray-500 text-sm mb-4">
          <div className="flex items-center mr-4 mb-2">
            <Users className="w-4 h-4 mr-1" />
            <span>{car.seats || 4} Passengers</span>
          </div>
          <div className="flex items-center mr-4 mb-2">
            <Gauge className="w-4 h-4 mr-1" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center mr-4 mb-2">
            <Snowflake className="w-4 h-4 mr-1" />
            <span>Air Conditioning</span>
          </div>
          <div className="flex items-center mb-2">
            <DoorOpen className="w-4 h-4 mr-1" />
            <span>{car.doors || 4} Doors</span>
          </div>
        </div>

        {/* Availability and Price */}
        <div className="mb-4 text-sm text-gray-700">
          <div className="flex items-center mb-1">
            <Calendar className="w-4 h-4 mr-1" />
            <span>
              Available from:{" "}
              {new Date(car.availableAt).toLocaleDateString()}
            </span>
          </div>
          <div>
            <span className="font-medium">Rental Status:</span>{" "}
            <span className="text-green-600 font-semibold">Available</span>
          </div>
        </div>

        {/* Price */}
        <div>
          <p className="text-sm font-medium mb-1">Rental Price</p>
          <p className="text-lg font-bold mb-3">EGP {car.pricePerDay} / day</p>
          <button
            className="w-full bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            onClick={handleBookCar}
          >
            Book Car
          </button>
        </div>
      </div>
    </div>
  );
}

export default CarCard;

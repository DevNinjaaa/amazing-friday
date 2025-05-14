import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pickupDate, setPickupDate] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [location, setLocation] = useState("Cairo");
  const [bookingMessage, setBookingMessage] = useState("");

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5112/api/car/${id}`);
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setCar(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found!");
        setBookingMessage("You must be logged in to book a car.");
        return;
      }

      console.log("Token being sent:", token); // Debugging

      const response = await axios.post(
        "http://localhost:5112/api/bookings",
        { carId: id, pickupDate, dropoffDate, location },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Booking response:", response.data);
      setBookingMessage("Booking successful!");
    } catch (error) {
      console.error("Booking error:", error.response?.data);
      setBookingMessage(
        error.response?.data?.error || "Failed to book the car."
      );
    }
  };

  if (loading) return <p className="text-center">Loading car details...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-0xl mx-auto p-6 bg-slate-950">
      <button className="border-white-[2vw]">
        <span>
          <Link to="/cars" className="text-white mb-4 inline-block">
            ← Back to Listings
          </Link>
        </span>
      </button>
      <div className="m-25 bg-white p-4 rounded-lg shadow-lg">
        <img
          src={car.image}
          alt={car.model}
          className="w-150 mx-auto h-75 object-cover rounded-lg mb-4"
        />

        <h1 className="text-3xl font-bold">
          {car.brand} {car.model} ({car.year})
        </h1>
        <p className="text-gray-600">
          {car.category} - <span className="font-bold">Rs {car.price}/day</span>
        </p>

        {/* Displaying new attributes */}
        <div className="mt-4">
          <p><strong>Transmission:</strong> {car.transmission}</p>
          <p><strong>Seats:</strong> {car.seats}</p>
          <p><strong>Fuel Type:</strong> {car.fuelType}</p>
          <p><strong>Description:</strong> {car.description}</p>
          <p><strong>License Plate:</strong> {car.licensePlate || "N/A"}</p>
        </div>

        <form onSubmit={handleBooking} className="mt-6">
          <h3 className="text-xl font-semibold mb-4">Book this car</h3>

          {/* Location Dropdown */}
          <div className="mb-4">
            <label className="block text-gray-700">Location</label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2 border rounded"
              required
            >
              <option value="Thrissur">Thrissur</option>
              <option value="Irinjalakuda">Irinjalakuda</option>
              <option value="Chalakudy">Chalakudy</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Pickup Date</label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Dropoff Date</label>
            <input
              type="date"
              value={dropoffDate}
              onChange={(e) => setDropoffDate(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Book Now
          </button>
        </form>
        {bookingMessage && (
          <p className="mt-4 text-center text-green-500">{bookingMessage}</p>
        )}
      </div>
    </div>
  );
}

export default CarDetails;

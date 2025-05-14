import React, { useState, useEffect } from "react";
import CarCard from "../components/CarCard";

function CarListing() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");

  const colors = {
    primaryBlue: "#3361AC",
    lightBg: "#E7E6DD",
    primaryYellow: "#E8C766",
    accentYellow: "#E8AF30",
    darkBlue: "#162F65",
    navyBlue: "#0F2043",
  };

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:5112/api/Car"); // Fetch all cars

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCars(data); // Set all cars (including user-listed cars)
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  // Filter and sort cars
  const filteredCars = cars.filter((car) =>
    `${car.brand} ${car.model}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let sortedCars = [...filteredCars];
  if (sortOption === "price-low") {
    sortedCars.sort((a, b) => a.price - b.price);
  } else if (sortOption === "price-high") {
    sortedCars.sort((a, b) => b.price - a.price);
  } else if (sortOption === "year-new") {
    sortedCars.sort((a, b) => b.year - a.year);
  }

  if (loading) {
    return (
      <div
        className="flex justify-center items-center h-64"
        style={{ backgroundColor: "black" }}
      >
        <div
          className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"
          style={{ borderColor: colors.accentYellow }}
        ></div>
      </div>
    );
  }

  return (
    <div className="py-12 p-20 bg-slate-950">
      <h1 className="text-3xl font-extrabold text-white mb-8">
        Available Vehicles
      </h1>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
          <p className="text-red-700">Error loading cars: {error}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search cars..."
          className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="">Sort by</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="year-new">Year: Newest First</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {sortedCars.map((car) => (
          <CarCard key={car._id} car={car} />
        ))}
      </div>

      {sortedCars.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white text-lg">
            No cars match your search criteria.
          </p>
        </div>
      )}
    </div>
  );
}

export default CarListing;

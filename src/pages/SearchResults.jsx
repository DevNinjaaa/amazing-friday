import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import CarCard from "../components/CarCard";

function SearchResults() {
  const location = useLocation();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOption, setSortOption] = useState("");

  // Extract search parameters from URL
  const queryParams = new URLSearchParams(location.search);
  const searchLocation = queryParams.get("location");
  const pickupDate = queryParams.get("pickupDate"); // Fixed query parameter case
  const returnDate = queryParams.get("returnDate");

  useEffect(() => {

    token = localStorage.getItem("token")
    userId = localStorage.getItem("userId")
    userName = localStorage.getItem("userName")
    role = localStorage.getItem("role")
    carOwner = localStorage.getItem("carOwner")
    renting = localStorage.getItem("renting")
    const fetchCars = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5112/api/car`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCars(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [searchLocation, pickupDate, returnDate]);

  // Sort cars when sortOption changes
  useEffect(() => {
    if (cars.length > 0) {
      let sortedCars = [...cars];
      if (sortOption === "price-low") {
        sortedCars.sort((a, b) => a.price - b.price);
      } else if (sortOption === "price-high") {
        sortedCars.sort((a, b) => b.price - a.price);
      } else if (sortOption === "year-new") {
        sortedCars.sort((a, b) => b.year - a.year);
      }
      setCars(sortedCars);
    }
  }, [sortOption]);

  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-white">
        <p className="text-lg bg-red-500 p-4 rounded-md">
          Error loading cars: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="py-12 p-20 bg-slate-950">
      <h1 className="text-3xl font-extrabold text-white mb-4">
        Available Cars in {searchLocation || "All Locations"}
      </h1>

      <div className="mb-8 text-white">
        <p className="text-lg">Pickup Date: {formatDate(pickupDate)}</p>
        <p className="text-lg">Return Date: {formatDate(returnDate)}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-end">
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
        {cars.length > 0 ? (
          cars.map((car) => <CarCard key={car._id} car={car} />)
        ) : (
          <div className="text-center py-12">
            <p className="text-white text-lg">
              No cars available for the selected dates and location.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;

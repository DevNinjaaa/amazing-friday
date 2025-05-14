"use client";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, MapPin, ArrowRight, Zap } from "lucide-react";

const CarRentalSearch = () => {
  const navigate = useNavigate();

  // State
  const [location, setLocation] = React.useState("Cairo");
  const [locations, setLocations] = React.useState([]);
  const [pickupDate, setPickupDate] = React.useState(new Date());
  const [returnDate, setReturnDate] = React.useState(new Date());

  // Handle search
  const handleSearch = () => {
    navigate(
      `/search?location=${location}&pickupDate=${pickupDate.toISOString().split("T")[0]
      }&returnDate=${returnDate.toISOString().split("T")[0]}`
    );
  };
  const fetchLocations = async () => {
    try {
      const response = await axios.get("http://localhost:5112/api/Car/locations");
      setLocations(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="relative px-40 py-16 bg-slate-950 max-md:p-10">
      <div className="flex justify-between items-center max-md:flex-col max-md:text-center">
        <div className="max-w-[460px]">
          <div className="inline-block mb-3 px-3 py-1 bg-yellow-400/10 border border-yellow-400/20 rounded-full">
            <span className="text-yellow-400 font-medium text-sm flex items-center">
              <Zap size={14} className="mr-1" />
              PREMIUM CAR RENTAL SERVICE
            </span>
          </div>
          <h1 className="relative mb-10 text-6xl font-bold text-white max-sm:text-4xl leading-tight">
            <span className="relative">Find, book and rent a car </span>
            <span className="text-yellow-400 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-1 after:bg-yellow-400/30">
              Easily
            </span>
            <div className="absolute -left-6 -top-6 w-12 h-12 rounded-full bg-yellow-400/10 blur-xl"></div>
          </h1>
          <p className="text-lg text-gray-400">
            Get a car wherever and whenever you need it with your iOS and
            Android device.
          </p>
        </div>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/39e9c099010f442ae1e82970097a60d8807f551c"
          className="h-[432px] w-[765px] max-md:mt-10 max-md:w-full max-md:h-auto"
          alt="Car"
        />
      </div>

      {/* Search Form */}
      <div className="mt-12 rounded-xl backdrop-blur-sm bg-gray-900/70 p-6 shadow-xl border border-gray-800">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Location Dropdown */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <MapPin size={16} className="text-yellow-400" />
              PICK-UP LOCATION
            </label>
            <div className="relative">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 text-white bg-gray-800 rounded-lg border border-gray-700 shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200 appearance-none"
              >
                <option value="">Select a location</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-t-gray-400 border-l-transparent border-r-transparent"></div>
              </div>
            </div>
          </div>

          {/* Pickup Date Picker */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Calendar size={16} className="text-yellow-400" />
              PICK-UP DATE
            </label>
            <div className="relative">
              <DatePicker
                selected={pickupDate}
                onChange={(date) => setPickupDate(date)}
                minDate={new Date()}
                dateFormat="dd/MM/yyyy"
                className="w-full px-4 py-3 text-white bg-gray-800 rounded-lg border border-gray-700 shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                <Calendar size={18} />
              </div>
            </div>
          </div>

          {/* Return Date Picker */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <Calendar size={16} className="text-yellow-400" />
              RETURN DATE
            </label>
            <div className="relative">
              <DatePicker
                selected={returnDate}
                onChange={(date) => setReturnDate(date)}
                minDate={pickupDate}
                dateFormat="dd/MM/yyyy"
                className="w-full px-4 py-3 text-white bg-gray-800 rounded-lg border border-gray-700 shadow-inner focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-200"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                <Calendar size={18} />
              </div>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button
              onClick={handleSearch}
              className="w-full py-3 px-6 text-base font-medium text-gray-900 rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              Find Cars
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarRentalSearch;

"use client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const RentalDeals = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch("http://localhost:5112/api/car");
        const data = await response.json();
        setCars(data.slice(0, 4)); // Get first 4 cars
        setLoading(false);
      } catch (error) {
        console.error("Error fetching cars:", error);
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) {
    return <p className="text-white text-center">Loading...</p>;
  }

  const IconText = ({ icon, text }) => (
    <div className="flex gap-1 items-center text-xs text-neutral-400">
      <i className={`ti ti-${icon}`} />
      <span>{text}</span>
    </div>
  );

  const CarCard = ({
    _id,
    make,
    model,
    year,
    price,
    transmission,
    seats,
    fuelType,
    category,
    location,
    image,
  }) => (
    <article className="overflow-hidden w-64 bg-white rounded-2xl transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer">
      <img
        src={image}
        className="object-cover w-full h-auto"
        alt={`${make} ${model}`}
      />
      <div className="p-6">
        <div className="mb-4">
          <h3 className="mb-3 text-base text-neutral-800 font-semibold font-inter">
            {year} {make} {model}
          </h3>
          <p className="text-xs text-zinc-500 font-medium">
            {category} - {fuelType}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          <IconText icon="users" text={`${seats} Seats`} />
          <IconText icon="steering-wheel" text={transmission} />
          <IconText icon="map-pin" text={location} />
        </div>
        <div className="flex justify-between items-center px-0 py-6 border-t border-solid border-t-neutral-200">
          <span className="font-medium text-neutral-600">Price</span>
          <span className="text-base font-bold text-zinc-800 font-inter">
            Rs {price} /day
          </span>
        </div>
        <Link to={`/cars/${_id}`}>
          <button className="flex gap-2 justify-center items-center p-2 w-full text-sm font-semibold text-white rounded-lg cursor-pointer bg-blue-950 border-[none] transition-all hover:bg-blue-900">
            <span>Rent Now</span>
            <i className="ti ti-arrow-right" />
          </button>
        </Link>
      </div>
    </article>
  );

  return (
    <section id="rental-deals" className="px-40 py-20 bg-slate-950 max-md:p-10">
      <header className="mb-20 text-center">
        <p className="px-8 py-4 mb-8 text-sm bg-yellow-400 rounded-lg text-blue-950 font-semibold tracking-wider antialiased">
          POPULAR RENTAL DEALS
        </p>
        <h2 className="text-4xl font-semibold text-stone-200 max-sm:text-3xl tracking-tight font-inter antialiased leading-tight">
          Most popular cars rental deals
        </h2>
      </header>

      <div className="flex gap-8 justify-center mt-16 ml-0 max-md:flex-col max-md:items-center">
        {cars.map((car, index) => (
          <CarCard key={index} {...car} />
        ))}
      </div>

      <button className="flex gap-2 justify-center items-center px-4 py-3 mx-auto mt-16 mb-0 text-base font-semibold text-yellow-400 rounded-lg border border-white border-solid cursor-pointer transition-all hover:bg-yellow-400 hover:text-blue-950">
        <span>
          <Link to="/cars">Show all vehicles</Link>
        </span>
        <i className="ti ti-arrow-right" />
      </button>
    </section>
  );
};

export default RentalDeals;

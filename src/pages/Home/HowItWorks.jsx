"use client";
import React from "react";
import { FaMapMarkerAlt, FaCalendarCheck, FaCarSide } from "react-icons/fa";

function HowItWorks() {
  const steps = [
    {
      Icon: FaMapMarkerAlt,
      title: "Choose Location",
      description: "Choose your location and find the best car.",
    },
    {
      Icon: FaCalendarCheck,
      title: "Pick-Up Date",
      description: "Select your pick-up date and time to book your car.",
    },
    {
      Icon: FaCarSide,
      title: "Book Your Car",
      description: "Book your car, and we will deliver it directly to you.",
    },
  ];

  return (
    <div id="become-a-renter" className="px-40 py-20 bg-slate-950 max-md:p-10">
      <div className="mb-20 text-center">
        <div className="px-8 py-4 mb-8 text-sm bg-yellow-400 rounded-lg text-blue-950 font-bold">
          HOW IT WORKS?
        </div>
        <h2 className="text-4xl font-medium text-stone-200 max-sm:text-3xl">
          Rent with these 3 simple steps
        </h2>
      </div>

      {/* Steps Section */}
      <div className="flex gap-20 justify-center max-md:flex-col max-md:gap-10">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col gap-6 items-center">
            <div className="flex justify-center items-center w-28 h-28 bg-gray-800 rounded-2xl shadow-lg">
              <step.Icon className="text-yellow-400 text-5xl" />
            </div>
            <div className="text-center">
              <h3 className="mb-3 text-xl text-yellow-400 font-semibold">
                {step.title}
              </h3>
              <p className="text-sm text-white">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HowItWorks;

"use client";
import React from "react";
import { FaDollarSign, FaUserTie, FaClock } from "react-icons/fa";

const Features = () => {
  const features = [
    {
      Icon: FaDollarSign,
      title: "Best Price Guaranteed",
      description:
        "Find a lower price? We'll refund you 100% of the difference.",
    },
    {
      Icon: FaUserTie,
      title: "Professional Drivers",
      description:
        "Don't have a driver? Don't worry, we have many experienced drivers for you.",
    },
    {
      Icon: FaClock,
      title: "24-Hour Car Delivery",
      description:
        "Book your car anytime, and we will deliver it directly to you.",
    },
  ];

  return (
    <section
      id="why-choose-us"
      className="flex items-center justify-between px-40 py-20 bg-slate-950 max-lg:flex-col max-lg:px-10"
    >
      {/* LEFT CONTENT */}
      <div className="max-w-xl max-md:max-w-full">
        <div className="px-8 py-4 mb-8 text-sm font-bold bg-yellow-400 rounded-lg text-blue-950 shadow-md">
          WHY CHOOSE US
        </div>
        <h2 className="text-4xl font-bold text-white mb-12 max-sm:text-3xl">
          We offer the <span className="text-yellow-400">best experience</span>{" "}
          with our rental deals
        </h2>
        <div className="flex flex-col gap-10">
          {features.map((feature, index) => (
            <article
              key={index}
              className="flex gap-6 items-center group transition-all duration-300 hover:translate-x-1"
            >
              <div className="flex justify-center items-center w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg group-hover:shadow-yellow-500/10">
                <div className="bg-blue-50 p-3 rounded-xl">
                  <feature.Icon className="text-blue-900 text-3xl" />
                </div>
              </div>
              <div>
                <h3 className="mb-3 text-xl font-bold text-yellow-400">
                  {feature.title}
                </h3>
                <p className="text-base text-gray-300">{feature.description}</p>
              </div>
            </article>
          ))}
        </div>

        <button className="mt-12 px-8 py-4 bg-yellow-400 text-blue-900 font-bold rounded-lg shadow-lg hover:bg-yellow-500 transition-all duration-300">
          Learn More
        </button>
      </div>

      {/* CAR IMAGE */}
      <div className="relative w-[700px] h-[450px] max-lg:w-full max-lg:h-[400px] mt-10 lg:mt-0 flex justify-end">
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/3527b1acb8ac596c3b0e32fe77700806b9ce9339"
          alt="Toyota"
          className="w-full h-full object-cover rounded-xl shadow-xl"
        />
      </div>
    </section>
  );
};

export default Features;

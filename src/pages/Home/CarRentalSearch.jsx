"use client";

import "react-datepicker/dist/react-datepicker.css";
import { Calendar, MapPin, ArrowRight, Zap } from "lucide-react";

const CarRentalSearch = () => {

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

    </section>
  );
};

export default CarRentalSearch;

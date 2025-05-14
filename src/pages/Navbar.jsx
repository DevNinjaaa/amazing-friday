"use client";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import AuthModal from "../components/AuthModal.jsx";
import logo from "../assets/images/image.png";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import "primereact/resources/themes/lara-light-indigo/theme.css"; // or your theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import axios from "axios";

const NavBar = () => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("token");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setDropdownOpen(false);
    navigate("/");
  };

  // Handle "Post your Car" click with confirmation popup
  const handlePostCarClick = (event) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Are you sure you want to become a car owner on the platform?",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        try {
          const token = localStorage.getItem("token");
          const carOwner = localStorage.getItem("carOwner")

          if (!token) {
            console.error("No token found");
            return;
          }
          if (carOwner == true) {
            navigate('./carPost');
            return;
          }
          const currentDate = new Date().toISOString();

          const requestBody = {
            requestType: "PlatformPoster",
            requestedAt: new Date().toISOString(),
            carPostId: null,
          };

          const response = await axios.post(
            "http://localhost:5112/api/UserRequest",
            requestBody,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log("Request submitted successfully", response.data);
        } catch (error) {
          console.error("Error sending request:", error.response?.data || error.message);
        }
      },
      reject: () => console.log("Post canceled"),
    });
  };

  const navItems = [
    { label: "Become a renter", id: "become-a-renter" },
    { label: "Rental deals", id: "rental-deals" },
    { label: "Why choose us", id: "why-choose-us" },
    { label: "Testimonials", id: "testimonials" },
  ];

  return (
    <header className="flex justify-between items-center px-60 py-5 bg-slate-950 max-md:p-10 max-sm:p-5">
      <ConfirmPopup /> {/* 👈 Required for the popup to render */}

      {/* Logo */}
      <a href="/" aria-label="Go to homepage">
        <img
          src={logo}
          alt="Logo"
          className="rounded-md border border-black border-solid h-[42px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] w-[155px] hover:opacity-80 transition-opacity duration-200 transform translate-x-[-80px]"
        />
      </a>

      {/* Navigation Menu */}
      <nav className="flex gap-10 max-sm:hidden">
        {user && (
          <a
            key="post-request"
            onClick={handlePostCarClick}
            className="text-base text-white cursor-pointer hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-opacity duration-200"
            aria-label="Post your Car"
          >
            Post your Car
          </a>
        )}

        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="text-base text-white cursor-pointer hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-opacity duration-200"
            aria-label={item.label}
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* User Actions */}
      <div className="relative flex items-center">
        {user ? console.log("user is in") : console.log("user is out")}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-white text-3xl cursor-pointer hover:opacity-80 transition-opacity duration-200"
              aria-label="User Dashboard"
            >
              <FaUserCircle />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-lg z-50 border border-gray-300 overflow-hidden">
                <button
                  onClick={() => {
                    navigate("/dashboard");
                    setDropdownOpen(false);
                  }}
                  className="block px-5 py-3 text-gray-800 hover:bg-gray-100 hover:text-slate-900 transition-all duration-200 w-full text-left font-medium"
                >
                  Dashboard
                </button>
                <button
                  onClick={handleLogout}
                  className="block px-5 py-3 text-red-600 hover:bg-red-100 hover:text-red-700 transition-all duration-200 w-full text-left font-medium"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-8 py-4 text-base text-white rounded-lg cursor-pointer bg-zinc-500 hover:bg-zinc-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition-colors duration-200"
            aria-label="Sign in"
          >
            Sign in
          </button>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        setUser={setUser}
      />
    </header>
  );
};

export default NavBar;

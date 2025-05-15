import React, { useEffect, useState } from "react";
import ListCar from "../components/ListCar";
import {
  FaUser,
  FaCarAlt,
  FaPhone,
  FaHome,
  FaEdit,
  FaSave,
  FaTimes,
  FaCalendarAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { getUesrInfo } from "./helper/helper";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [loading, setLoading] = useState(true);

  // Modern color scheme
  const colors = {
    primary: "#4F46E5", // Indigo
    secondary: "#10B981", // Emerald
    background: "#F9FAFB", // Light gray
    panel: "#FFFFFF", // White
    accent: "#7C3AED", // Purple
    warning: "#F59E0B", // Amber
    text: "#1F2937", // Dark gray
    lightText: "#6B7280", // Medium gray
  };

  useEffect(() => {
    // Get user data from localStorage

    const token = localStorage.getItem("token")

    let storedUser = "";
    if (token)
      storedUser = JSON.parse(getUesrInfo(token));

    if (storedUser) {
      setUser(storedUser);
      setEditedUser(storedUser);
    }

    // Fetch user's bookings
    fetch("http://localhost:5112/api/bookings", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing
      setEditedUser(user);
    }
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleSaveProfile = async () => {
    try {
      // Fixed the API endpoint path
      const response = await fetch("http://localhost:5000/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          name: editedUser.name,
          phone: editedUser.phone,
          address: editedUser.address,
        }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setIsEditing(false);
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="p-8 rounded-lg shadow-lg bg-white">
          <div className="flex flex-col items-center">
            <div
              className="w-16 h-16 border-4 border-t-primary border-b-primary border-l-gray-200 border-r-gray-200 rounded-full animate-spin"
              style={{
                borderTopColor: colors.primary,
                borderBottomColor: colors.primary,
              }}
            ></div>
            <p
              className="mt-4 text-lg font-medium"
              style={{ color: colors.text }}
            >
              Loading your dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: colors.background }}
    >
      {/* Header */}
      <div
        className="w-full py-4 shadow-md"
        style={{ backgroundColor: colors.primary }}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">RentaRide</h1>
          {user && (
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                {user.name ? user.name[0].toUpperCase() : "U"}
              </div>
              <span className="ml-3 text-white">{user.name}</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold" style={{ color: colors.text }}>
            Welcome back{user ? `, ${user.name.split(" ")[0]}` : ""}!
          </h2>
          <p className="text-lg" style={{ color: colors.lightText }}>
            Manage your profile and bookings
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="flex border-b">
            <button
              className={`flex items-center px-6 py-4 text-lg font-medium transition-colors duration-200 ${activeTab === "profile"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-gray-700"
                }`}
              style={{
                color:
                  activeTab === "profile" ? colors.primary : colors.lightText,
                borderBottomColor:
                  activeTab === "profile" ? colors.primary : "transparent",
              }}
              onClick={() => setActiveTab("profile")}
            >
              <FaUser className="mr-2" />
              Profile
            </button>
            <button
              className={`flex items-center px-6 py-4 text-lg font-medium transition-colors duration-200 ${activeTab === "bookings"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-gray-700"
                }`}
              style={{
                color:
                  activeTab === "bookings" ? colors.primary : colors.lightText,
                borderBottomColor:
                  activeTab === "bookings" ? colors.primary : "transparent",
              }}
              onClick={() => setActiveTab("bookings")}
            >
              <FaCarAlt className="mr-2" />
              Bookings
            </button>
            <button
              className={`flex items-center px-6 py-4 text-lg font-medium transition-colors duration-200 ${activeTab === "listings"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-gray-700"
                }`}
              style={{
                color: activeTab === "listings" ? colors.primary : colors.lightText,
                borderBottomColor:
                  activeTab === "listings" ? colors.primary : "transparent",
              }}
              onClick={() => setActiveTab("listings")}
            >
              <FaCarAlt className="mr-2" />
              My Listings
            </button>
          </div>

          {/* Profile Tab */}
          {activeTab === "profile" && user && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3
                  className="text-xl font-semibold"
                  style={{ color: colors.text }}
                >
                  Personal Information
                </h3>
                <button
                  className="flex items-center px-4 py-2 rounded-lg text-white transition-colors duration-200"
                  style={{
                    backgroundColor: isEditing
                      ? colors.warning
                      : colors.primary,
                  }}
                  onClick={handleEditToggle}
                >
                  {isEditing ? (
                    <>
                      <FaTimes className="mr-2" /> Cancel
                    </>
                  ) : (
                    <>
                      <FaEdit className="mr-2" /> Edit Profile
                    </>
                  )}
                </button>
              </div>

              {isEditing ? (
                <div className="space-y-4 max-w-2xl">
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: colors.text }}
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={editedUser.name || ""}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      style={{
                        borderColor: colors.lightText,
                        outlineColor: colors.primary,
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: colors.text }}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={editedUser.email || ""}
                      disabled
                      className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100"
                    />
                    <p
                      className="text-sm mt-1"
                      style={{ color: colors.lightText }}
                    >
                      Email cannot be changed
                    </p>
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: colors.text }}
                    >
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={editedUser.phone || ""}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      style={{
                        borderColor: colors.lightText,
                        outlineColor: colors.primary,
                      }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium mb-2"
                      style={{ color: colors.text }}
                    >
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={editedUser.address || ""}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      style={{
                        borderColor: colors.lightText,
                        outlineColor: colors.primary,
                      }}
                      rows="3"
                    ></textarea>
                  </div>
                  <div className="pt-4">
                    <button
                      className="flex items-center px-6 py-3 rounded-lg text-white font-medium transition-colors duration-200"
                      style={{ backgroundColor: colors.secondary }}
                      onClick={handleSaveProfile}
                    >
                      <FaSave className="mr-2" /> Save Changes
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: colors.primary + "20" }}
                      >
                        <FaUser style={{ color: colors.primary }} />
                      </div>
                      <div className="ml-3">
                        <h4
                          className="font-medium"
                          style={{ color: colors.text }}
                        >
                          Name
                        </h4>
                        <p className="text-lg">{user.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: colors.primary + "20" }}
                      >
                        <FaPhone style={{ color: colors.primary }} />
                      </div>
                      <div className="ml-3">
                        <h4
                          className="font-medium"
                          style={{ color: colors.text }}
                        >
                          Phone
                        </h4>
                        <p className="text-lg">
                          {user.phone || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: colors.primary + "20" }}
                      >
                        <FaCalendarAlt style={{ color: colors.primary }} />
                      </div>
                      <div className="ml-3">
                        <h4
                          className="font-medium"
                          style={{ color: colors.text }}
                        >
                          Email
                        </h4>
                        <p className="text-lg">{user.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: colors.primary + "20" }}
                      >
                        <FaMapMarkerAlt style={{ color: colors.primary }} />
                      </div>
                      <div className="ml-3">
                        <h4
                          className="font-medium"
                          style={{ color: colors.text }}
                        >
                          Address
                        </h4>
                        <p className="text-lg">
                          {user.address || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Bookings Tab */}
          {activeTab === "bookings" && (
            <div className="p-6">
              <h3
                className="text-xl font-semibold mb-6"
                style={{ color: colors.text }}
              >
                Your Bookings
              </h3>

              {bookings.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-gray-50">
                        <th
                          className="py-3 px-4 font-medium"
                          style={{ color: colors.text }}
                        >
                          Car
                        </th>
                        <th
                          className="py-3 px-4 font-medium"
                          style={{ color: colors.text }}
                        >
                          Pickup Date
                        </th>
                        <th
                          className="py-3 px-4 font-medium"
                          style={{ color: colors.text }}
                        >
                          Dropoff Date
                        </th>
                        <th
                          className="py-3 px-4 font-medium"
                          style={{ color: colors.text }}
                        >
                          Contact
                        </th>
                        <th
                          className="py-3 px-4 font-medium"
                          style={{ color: colors.text }}
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking, index) => (
                        <tr
                          key={index}
                          className="border-t hover:bg-gray-50 transition-colors"
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <img
                                src={booking.carId.image}
                                alt={booking.carId.model}
                                className="w-12 h-12 rounded mr-3"
                              />
                              {booking.carId.make} {booking.carId.model}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            {new Date(booking.pickupDate).toDateString()}
                          </td>
                          <td className="py-4 px-4">
                            {new Date(booking.dropoffDate).toDateString()}
                          </td>
                          <td className="py-4 px-4">
                            {booking.carId.phone}
                          </td>
                          <td className="py-4 px-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${booking.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                                }`}
                            >
                              {booking.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center bg-gray-50 rounded-lg">
                  <div
                    className="inline-flex justify-center items-center w-16 h-16 rounded-full mb-4"
                    style={{ backgroundColor: colors.primary + "20" }}
                  >
                    <FaCarAlt
                      className="text-2xl"
                      style={{ color: colors.primary }}
                    />
                  </div>
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: colors.text }}
                  >
                    No bookings found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    You haven't made any car bookings yet.
                  </p>
                  <button
                    className="px-6 py-3 rounded-lg text-white font-medium transition-colors duration-200"
                    style={{ backgroundColor: colors.secondary }}
                  >
                    Rent a Car Now
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Listings Tab */}
          {activeTab === "listings" && (
            <div className="p-6">
              <ListCar />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root"); // Required for accessibility

const AuthModal = ({ isOpen, onClose, setUser }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: ""
  });
  const [error, setError] = useState(""); // State to store error messages

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error before making a request

    const url = isRegister
      ? "http://localhost:5112/api/Auth/register"
      : "http://localhost:5112/api/Auth/login";

    try {
      console.log("Sending to backend:", formData); // Debug log
      const res = await axios.post(url, formData);
      console.log(res)

      // Automatically log in user after successful registration
      if (isRegister) {

        const loginRes = await axios.post("http://localhost:5112/api/Auth/login", {
          email: formData.email,
          password: formData.password,
        });
        console.log(loginRes)
        localStorage.setItem("token", loginRes.data.response.token);
        localStorage.setItem("userId", loginRes.data.response.userId);
        localStorage.setItem("userName", loginRes.data.response.userName);
        localStorage.setItem("role", loginRes.data.response.role);
        localStorage.setItem("carOwner", loginRes.data.response.carOwner);
        localStorage.setItem("renting", loginRes.data.response.renting);
        setUser(loginRes.data.response.token);
      } else {
        localStorage.setItem("token", res.data.response.token);
        localStorage.setItem("userId", res.data.response.userId);
        localStorage.setItem("userName", res.data.response.userName);
        localStorage.setItem("role", res.data.response.role);
        localStorage.setItem("carOwner", res.data.response.carOwner);
        localStorage.setItem("renting", res.data.response.renting);
        setUser(res.data.response.token);
      }

      onClose();
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Authentication failed. Please try again."
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="relative bg-gray-900 p-8 rounded-lg shadow-lg text-white w-96">
        {/* Close Button (X) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold focus:outline-none"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">
          {isRegister ? "Create an Account" : "Welcome Back!"}
        </h2>

        {/* Error Message */}
        {error && <p className="text-red-400 text-center mb-3">{error}</p>}

        <form onSubmit={handleSubmit}>
          {isRegister && (
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full p-2 mb-2 rounded bg-gray-800 text-white"
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded bg-gray-800 text-white"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 mb-2 rounded bg-gray-800 text-white"
            required
          />
          {isRegister && (
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 mb-2 rounded bg-gray-800 text-white"
              required
            />
          )}

          <button
            type="submit"
            className="w-full py-2 bg-yellow-500 rounded mt-3"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <p className="text-center mt-3">
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="text-yellow-400 ml-1"
          >
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </Modal>
  );
};

export default AuthModal;

import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

Modal.setAppElement("#root");

const AuthModal = ({ isOpen, onClose, setUser }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const url = isRegister
      ? "http://localhost:5112/api/Auth/register"
      : "http://localhost:5112/api/Auth/login";

    try {
      const res = await axios.post(url, formData);

      if (isRegister) {
        const loginRes = await axios.post("http://localhost:5112/api/Auth/login", {
          email: formData.email,
          password: formData.password
        });
        saveUser(loginRes.data.response);
      } else {
        saveUser(res.data.response);
      }

      onClose();
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Authentication failed. Please try again."
      );
    }
  };

  const saveUser = (response) => {
    localStorage.setItem("token", response.token);
    localStorage.setItem("userId", response.userId);
    localStorage.setItem("userName", response.userName);
    localStorage.setItem("role", response.role);
    localStorage.setItem("carOwner", response.carOwner);
    localStorage.setItem("renting", response.renting);
    setUser(response.token);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="relative bg-gray-900 p-8 rounded-lg shadow-lg text-white w-96">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold focus:outline-none"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">
          {isRegister ? "Create an Account" : "Welcome Back!"}
        </h2>

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
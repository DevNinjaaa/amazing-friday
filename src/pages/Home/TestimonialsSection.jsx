"use client";
import React from "react";

const TestimonialsSection = () => {
  const StarIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
    </svg>
  );

  const QuoteIcon = () => (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className="opacity-20"
    >
      <path d="M10 7L8 11H11V17H5V11L7 7H10ZM18 7L16 11H19V17H13V11L15 7H18Z" />
    </svg>
  );

  // Avatar component that uses initials when no image is available
  const Avatar = ({ name, image }) => {
    if (image && image !== "/api/placeholder/64/64") {
      return (
        <img
          src={image}
          alt={name}
          className="w-12 h-12 rounded-full border-2 border-yellow-400 mr-4"
        />
      );
    }

    // Create initials from name (e.g., "John Doe" -> "JD")
    const initials = name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);

    // Generate a unique but consistent color based on the name
    const colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-red-500",
    ];
    const colorIndex =
      name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
      colors.length;

    return (
      <div
        className={`w-12 h-12 rounded-full border-2 border-yellow-400 mr-4 flex items-center justify-center ${colors[colorIndex]} text-white font-medium`}
      >
        {initials}
      </div>
    );
  };

  const testimonials = [
    {
      rating: 5.0,
      text: "I have been using your services for 3 years. Your service is great, I will continue to use your service.",
      author: "Jenny Wilson",
      location: "From New York, US",
      avatar: null, // No image available
    },
    {
      rating: 5.0,
      text: "I feel very secure when using RentaRide's services. Your customer care team is very enthusiastic and the driver is always on time.",
      author: "Charlie Johnson",
      location: "From New York, US",
      avatar: null, // No image available
    },
    {
      rating: 5.0,
      text: "I feel very secure when using RentaRide's services. Your customer care team is very enthusiastic and the driver is always on time.",
      author: "Charlie Johnson",
      location: "From New York, US",
      avatar: null, // No image available
    },
  ];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className={
            i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
          }
        >
          <StarIcon />
        </span>
      );
    }
    return stars;
  };

  return (
    <section
      id="testimonials"
      className="px-6 py-24 bg-gradient-to-b from-slate-950 to-slate-900"
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 text-center">
          <div className="px-8 py-4 mb-8 text-sm bg-yellow-400 rounded-lg text-blue-950 inline-block font-bold shadow-lg shadow-yellow-400/20 transform hover:scale-105 transition-transform duration-300">
            TESTIMONIALS
          </div>
          <h2 className="text-5xl font-bold text-white max-sm:text-3xl">
            What <span className="text-yellow-400">people say</span> about us?
          </h2>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {testimonials.map((testimonial, index) => (
            <article
              key={index}
              className="p-8 bg-slate-800 rounded-3xl border border-slate-700 shadow-xl hover:shadow-yellow-400/5 hover:border-slate-600 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400/10 to-yellow-400/0 rounded-bl-3xl"></div>

              <div className="absolute -right-3 -top-3 text-yellow-400/10 transform rotate-12 group-hover:rotate-6 transition-transform duration-300">
                <QuoteIcon />
              </div>

              <div className="flex mb-5 space-x-1">
                {renderStars(testimonial.rating)}
              </div>

              <blockquote className="mb-8 text-lg text-gray-300 leading-relaxed relative z-10">
                "{testimonial.text}"
              </blockquote>

              <footer className="flex items-center mt-6">
                <Avatar name={testimonial.author} image={testimonial.avatar} />
                <div>
                  <cite className="not-italic font-medium text-white text-lg block">
                    {testimonial.author}
                  </cite>
                  <p className="text-sm text-gray-400">
                    {testimonial.location}
                  </p>
                </div>
              </footer>
            </article>
          ))}
        </div>

        <div className="flex justify-center mt-16">
          <div className="flex space-x-2">
            <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
            <span className="w-3 h-3 bg-slate-700 rounded-full"></span>
            <span className="w-3 h-3 bg-slate-700 rounded-full"></span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
